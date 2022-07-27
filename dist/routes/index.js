"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_routes_1 = __importDefault(require("./users.routes"));
const sports_routes_1 = __importDefault(require("./sports.routes"));
const events_routes_1 = __importDefault(require("./events.routes"));
const players_routes_1 = __importDefault(require("./players.routes"));
const levels_routes_1 = __importDefault(require("./levels.routes"));
const positions_routes_1 = __importDefault(require("./positions.routes"));
const availabilities_routes_1 = __importDefault(require("./availabilities.routes"));
const periodicity_routes_1 = __importDefault(require("./periodicity.routes"));
const sportsGeneric_routes_1 = __importDefault(require("./sportsGeneric.routes"));
const persons_routes_1 = __importDefault(require("./persons.routes"));
const addresses_routes_1 = __importDefault(require("./addresses.routes"));
const valuations_routes_1 = __importDefault(require("./valuations.routes"));
const eventApplies_routes_1 = __importDefault(require("./eventApplies.routes"));
const califications_routes_1 = __importDefault(require("./califications.routes"));
exports.default = { UserRoute: users_routes_1.default, SportRoute: sports_routes_1.default, EventRoute: events_routes_1.default, PlayerRoute: players_routes_1.default, LevelRoute: levels_routes_1.default, PositionRoute: positions_routes_1.default,
    AvailabilityRoute: availabilities_routes_1.default, SportGenericRoute: sportsGeneric_routes_1.default, PeridocityRoute: periodicity_routes_1.default, PersonRoute: persons_routes_1.default, AddressRoute: addresses_routes_1.default,
    ValuationRoute: valuations_routes_1.default, EventAppliesRoute: eventApplies_routes_1.default, CalificationsRoute: califications_routes_1.default };
