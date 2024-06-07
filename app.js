import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Mongoo db is connected"))
  .catch((err) => console.log("error ", err));

const port = 3000;

app.use(json());

app.listen(port, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running and App is listening on port " + port
    );
  } else {
    console.log("Error occured, server can't start", error);
  }
});

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: message,
  });
});
