import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import dbConnect from "@/lib/db/dbConnect";
import UserModel from "@/model/User";
import { SignInSchema } from "@/schemas";

export const authOptions = {
  providers: [
    // Credentials provider for email and password login
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials) {
        const email = credentials.identifier;
        const password = credentials.password;

        // Validate the credentials against the schema
        const validatedFields = SignInSchema.safeParse({
          email,
          password,
        });

        if (!validatedFields.success) {
          throw new Error("Invalid credentials filed");
        }

        await dbConnect();

        try {
          const dbUser = await UserModel.findOne({ email }).exec();
          if (!dbUser) {
            throw new Error("User not found");
          }

          if (!dbUser.isVerified) {
            throw new Error("Please verify your email address");
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            dbUser.password
          );
          if (!isPasswordMatched) {
            throw new Error("Password incorrect");
          }

          // Return user data
          return { ...dbUser.toObject() };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),

    // Google provider for OAuth authentication
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    // Github provider for OAuth authentication
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),

    // Twitter provider for OAuth authentication
    TwitterProvider({
      clientId: process.env.AUTH_TWITTER_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),

    // Facebook provider for OAuth authentication
    FacebookProvider({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
  ],

  callbacks: {
    // Handle the sign-in process, create new user if not found
    async signIn({ user, account, profile }) {
      await dbConnect();

      try {
        const dbUser = await UserModel.findOne({ email: user.email }).exec();

        if (!dbUser) {
          // Generate hashed password and create new user
          const generateNewHashedPassword = await bcrypt.hash(user.email, 12);
          const isVerified =
            account.provider === "google" && profile.email_verified;

          const newUser = new UserModel({
            email: user.email,
            username: user.name,
            password: generateNewHashedPassword,
            picture: user.picture,
            isVerified,
          });

          await newUser.save();

          // Set user details in session
          user._id = newUser._id.toString();
          user.role = newUser.role;

          return true;
        }

        // Handle existing user verification check
        if (!dbUser.isVerified) {
          throw new Error("Please verify your email address");
        }

        // Set user details in session for existing users
        user._id = dbUser._id.toString();
        user.role = dbUser.role;

        return true;
      } catch (error) {
        console.error("Error in signIn() callback:", error);
        throw new Error(error.message || "Login failed");
      }
    },

    // Handle JWT token creation and update
    async jwt({ token, user }) {
      if (user) {
        // Remove unnecessary properties from the token
        delete token.name;
        delete token.sub;

        // Add user details to the token
        token._id = user._id.toString();
        token.role = user.role;
      }

      return token;
    },

    // Populate session with JWT token details
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
      }

      return session;
    },
  },

  // Use JWT for session strategy
  session: {
    strategy: "jwt",
  },

  // Security key for encrypting JWT tokens
  secret: process.env.NEXTAUTH_SECRET,
};
