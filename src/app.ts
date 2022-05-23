import express from "express";
import cors from "cors";
import Router from "./routes";

export const instanceApp = () => {
  const app = express();

  //middleware
  app.use(express.json());
  app.use(cors());

  // Routes
  app.use("/users", Router.UserRoute);
  app.use("/sports", Router.SportRoute);
  app.use("/events", Router.EventRoute);
  return app;
};
