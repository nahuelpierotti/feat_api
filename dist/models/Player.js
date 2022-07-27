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
exports.Player = void 0;
const typeorm_1 = require("typeorm");
const EventApply_1 = require("./EventApply");
const Level_1 = require("./Level");
const Person_1 = require("./Person");
const PlayerList_1 = require("./PlayerList");
const Position_1 = require("./Position");
const SportGeneric_1 = require("./SportGeneric");
const Valuation_1 = require("./Valuation");
let Player = class Player extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Player.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Player.prototype, "abilities", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1.Person),
    (0, typeorm_1.JoinColumn)({ name: 'personId' }),
    __metadata("design:type", Number)
], Player.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SportGeneric_1.SportGeneric),
    (0, typeorm_1.JoinColumn)({ name: 'sportGenericId' }),
    __metadata("design:type", Number)
], Player.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Position_1.Position, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'positiontId' }),
    __metadata("design:type", Number)
], Player.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Level_1.Level, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'levelId' }),
    __metadata("design:type", Number)
], Player.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Valuation_1.Valuation, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'valuationId' }),
    __metadata("design:type", Number)
], Player.prototype, "valuation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlayerList_1.PlayerList, (playerList) => playerList.player),
    __metadata("design:type", Array)
], Player.prototype, "playerList", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventApply_1.EventApply, (eventApply) => eventApply.player),
    __metadata("design:type", Array)
], Player.prototype, "eventApply", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Player.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Player.prototype, "calification", void 0);
Player = __decorate([
    (0, typeorm_1.Entity)()
], Player);
exports.Player = Player;
