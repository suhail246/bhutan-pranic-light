<div align = "center">

# COMMON ADMIN PANEL

<p><em>A versatile and customizable admin panel designed to streamline project management across various domains, including e-commerce, education, healthcare, and SaaS platforms. This admin panel offers a wide range of features to manage users, content, analytics, notifications, and settings.</em></p>
</div>

---

## 🚀 Features

### 1. **User Management**

- Add, edit, and delete users.
- Assign roles and permissions (e.g., admin, editor, viewer).
- Advanced search and filtering for user profiles.

### 2. **Content Management**

- Manage posts, pages, or product listings with CRUD operations.
- Use a rich text editor for content creation.
- Workflow and approval system for publishing.

### 3. **Settings & Configuration**

- Customize application preferences and themes.
- Manage integrations with third-party services.
- Localization and multi-language support.

---

## 💻 Tech Stack

<details>
<summary>🎨 Frontend</summary>

![Next JS](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)
![OAuth](https://img.shields.io/badge/OAuth-3C78A9?style=flat&logo=oauth&logoColor=white)
![NextAuth](https://img.shields.io/badge/NextAuth.js-6C63FF?style=flat&logo=nextdotjs&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat&logo=reacthookform&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E3?style=flat&logo=axios&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
![Shadcn](https://img.shields.io/badge/Shadcn-000000?style=flat&logo=shadcn&logoColor=white)
![Uppy](https://img.shields.io/badge/Uppy-FF5656?style=flat&logo=uppy&logoColor=white)

</details>

<details>
<summary>⚙️ Backend</summary>

![Node.js](https://img.shields.io/badge/Node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)

</details>

<details>
<summary>🛠 Tools</summary>

![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=flat&logo=gitlab&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?style=flat&logo=github&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=postman&logoColor=white)
![MongoDB Compass](https://img.shields.io/badge/MongoDB_Compass-47A248?style=flat&logo=mongodb&logoColor=white)

</details>

---

## Project Setup

## ⚙️ Detailed Setup Guide

<details>
<summary>1️⃣ Installation</summary>

1. Clone the repository:

```bash
git clone git@gitlab.com:risians/mern-base-module.git -b subham
```

2. Install dependencies:

```bash
cd mern-base-module
npm install
```

</details>

<details>
<summary>2️⃣ Environment Configuration</summary>
1. Environment variables: (.env in root directory)
```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.7g7x.mongodb.net/<dbname>?retryWrites=true&w=majority

# Authentication

## NextAuth secret string (atleast 32 characters long)

🎥 **Tutorial**: [Watch Social Auth Setup Guide](https://youtu.be/O8Ae6MC5bf4?si=WvThsP4mbMX69Atc)

NEXTAUTH_SECRET = your_random_32_or_more_character_long_string_here

NEXTAUTH_URL = your_domain_url_here

AUTH_GITHUB_ID =

AUTH_GITHUB_SECRET =

AUTH_GOOGLE_ID =

AUTH_GOOGLE_SECRET =

AUTH_FACEBOOK_ID =

AUTH_FACEBOOK_SECRET =

AUTH_TWITTER_ID =

AUTH_TWITTER_SECRET =

# JWT

TOKEN_SECRET = your_256bit_or_bigger_secret_key_here

TOKEN_EXPIRATION_REMEMBERED = 10

TOKEN_EXPIRATION_NOT_REMEMBERED = 1

# NODEMAILER

🎥 **Tutorial**: [Watch SMTP PASSWORD Setup Guide](https://youtu.be/dq3chv2PZVk?si=aj72pELtxiKc8b-g)

SMTP_HOST=smtp.gmail.com

SMTP_PORT=587

SMTP_MAIL=your_email_here

SMTP_PASSWORD=your_email_password_here

# AWS

🎥 **Tutorial**: [Watch AWS IAM User & S3 Setup Guide](https://youtu.be/d8A8JmAImc4?si=Ln15K3CbFLeRAyjt)

NEXT_PUBLIC_AWS_ACCESS_KEY_ID = AKIAIOSFODNN7EXAMPLE

NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY = wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

NEXT_PUBLIC_AWS_REGION = "ap-south-1"

NEXT_PUBLIC_AWS_API_VERSION = "2010-12-01"

NEXT_PUBLIC_AWS_BUCKET_NAME = common-velzon-dashboard

S3 Bucket Policy

```bash
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::common-velzon-dashboard/*"
    },
    {
      "Sid": "AllowPutPostDeleteByAdmin",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::USER_ID:user/USER_NAME"
      },
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::common-velzon-dashboard/*"
    }
  ]
}
```

S3 CORS Policy :

```bash
[
  {
    "AllowedHeaders": [
      "Authorization",
      "x-amz-date",
      "x-amz-content-sha256",
      "content-type"
    ],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["DOMAIN_URL"],
    "ExposeHeaders": ["ETag", "Location"],
    "MaxAgeSeconds": 3000
  },
  {
    "AllowedHeaders": [],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

# UPPY FILES

NEXT_PUBLIC_UPPY_MAX_IMAGE_FILE_SIZE_MB = 10

NEXT_PUBLIC_UPPY_MAX_VIDEO_FILE_SIZE_MB = 50

NEXT_PUBLIC_UPPY_MAX_PDF_FILE_SIZE_MB = 20

NEXT_PUBLIC_UPPY_MAX_OTHER_FILE_SIZE_MB = 100

NEXT_PUBLIC_UPPY_RESTRICTED_FILES_COUNT = 10

NEXT_PUBLIC_UPPY_RESTRICTED_FILES_SIZE = 100

NEXT_PUBLIC_UPPY_PRESIGNED_URL_EXPIRES_IN_SECONDS = 600

NEXT_PUBLIC_DEBOUNCE_DELAY = 300

# SEEDER ADMIN USER INFO

ADMIN_EMAIL = admin_email_here

ADMIN_USERNAME = admin_username_here

ADMIN_PASSWORD = admin_password_here

# APP NAME IN META TITLE

NEXT_PUBLIC_META_APP_NAME = "| Velzon - NEXT.js Admin & Dashboard Template"

NEXT_PUBLIC_DEFAULT_META_APP_NAME = "Velzon - NEXT.js Admin & Dashboard Template"

# Website URL

NEXT_PUBLIC_DOMAIN_URL = "http://localhost:3000"

</details>

<details>
<summary>3️⃣ Running the Application</summary>
# From root directory

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

</details>

<details>
<summary>4️⃣ Push to Git Lab</summary>

```bash
git status
git add .
git commit -m "commit message"
git pull origin tester
git push subham
```

</details>

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<div align = "center">

# Project is still in progress.

For additional help or issues, please contact me through email (subhamrakshit667@gmail.com) or whatsApp (+91 7980483206).

</div>
