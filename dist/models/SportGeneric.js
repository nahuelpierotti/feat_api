"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportGeneric = void 0;
const typeorm_1 = require("typeorm");
const Level_1 = require("./Level");
const Player_1 = require("./Player");
const Position_1 = require("./Position");
const Sport_1 = require("./Sport");
let SportGeneric = class SportGeneric extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SportGeneric.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SportGeneric.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sport_1.Sport, (sport) => sport.sportGeneric),
    __metadata("design:type", Number)
], SportGeneric.prototype, "sports", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Level_1.Level, (level) => level.sport),
    __metadata("design:type", Array)
], SportGeneric.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Position_1.Position, (position) => position.sport),
    __metadata("design:type", Array)
], SportGeneric.prototype, "positions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Player_1.Player, (player) => player.sport),
    __metadata("design:type", Number)
], SportGeneric.prototype, "player", void 0);
SportGeneric = __decorate([
    (0, typeorm_1.Entity)()
], SportGeneric);
exports.SportGeneric = SportGeneric;
