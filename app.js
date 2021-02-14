import express from "express";
import morgan from "morgan";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController";
import tourRouter from "./routes/tourRoutes";
import userRouter from "./routes/userRoutes";

const app = express();

// 1) MIDDLEWARES
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json()); //MIDDLEWARE => ACCESSING THE REQUEST BODY
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  // console.log("Hello from the middleware");
  next();
});

// MANIPULATING THE REQUEST OBJECT
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2)ROUTE HANDLERS

// 3)ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.statusCode(404).json({
  //   status: "pass",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  //14/2/21 => NOTE:when the error occurs here it will break the middle of the middleware and directly goes globalErrorHandler
});

//ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

// 4)START SERVER

export default app;
