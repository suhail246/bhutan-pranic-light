// NOTE Database connection is depended on user's request. Many times what happens is, u just did a request and again to did a request at a few seconds of time gap. If database connection is already established then again database connection regenerated according on the request. May be your App gets chocked for this reason. ** We have to check database connection is already established or not. If yes then we use that connection, it not then we create a new connection. [What ever request you creates (eg. SignUp, SignIn etc.)] database connection is needed. We have to add checks in the database connection method only. ** Database connection must be in -> **lib** <- name folder for adding sdcn library.

import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  // NOTE: Check for already existing connection
  if (connection.isConnected) {
    console.log("Already connected to database");
    return mongoose.connection;
  }

  // NOTE: For new connection
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("Database connection established successfully");
    return db;
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    process.exit(1);
  }
}

export default dbConnect;
