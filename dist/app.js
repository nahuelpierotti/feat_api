"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const instanceApp = () => {
    const app = (0, express_1.default)();
    //middleware
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    // Routes
    app.use("/users", routes_1.default.UserRoute);
    app.use("/sports", routes_1.default.SportRoute);
    app.use("/events", routes_1.default.EventRoute);
    app.use("/players", routes_1.default.PlayerRoute);
    app.use("/levels", routes_1.default.LevelRoute);
    app.use("/positions", routes_1.default.PositionRoute);
    app.use("/availabilities", routes_1.default.AvailabilityRoute);
    app.use("/periodicities", routes_1.default.PeridocityRoute);
    app.use("/sportsGeneric", routes_1.default.SportGenericRoute);
    app.use("/persons", routes_1.default.PersonRoute);
    app.use("/addresses", routes_1.default.AddressRoute);
    app.use("/valuations", routes_1.default.ValuationRoute);
    app.use("/eventApplies", routes_1.default.EventAppliesRoute);
    app.use("/califications", routes_1.default.CalificationsRoute);
    return app;
};
exports.instanceApp = instanceApp;
