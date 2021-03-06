import express from "express";
import cors from "cors";
import Router from "./routes";
import bodyParser from "body-parser";

export const instanceApp = () => {
  const app = express();

  //middleware
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json())
  // Routes
  app.use("/users", Router.UserRoute);
  app.use("/sports", Router.SportRoute);
  app.use("/events", Router.EventRoute);
  app.use("/players", Router.PlayerRoute);
  app.use("/levels", Router.LevelRoute);
  app.use("/positions", Router.PositionRoute);
  app.use("/availabilities", Router.AvailabilityRoute);
  app.use("/periodicities", Router.PeridocityRoute);
  app.use("/sportsGeneric", Router.SportGenericRoute)
  app.use("/persons", Router.PersonRoute);
  app.use("/addresses", Router.AddressRoute);
  app.use("/valuations", Router.ValuationRoute);
  app.use("/eventApplies", Router.EventAppliesRoute);
  app.use("/califications", Router.CalificationsRoute);
  
  return app;
};
