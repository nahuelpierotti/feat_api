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
exports.PlayerEventCalification = void 0;
const typeorm_1 = require("typeorm");
const Player_1 = require("./Player");
const Event_1 = require("./Event");
const Calification_1 = require("./Calification");
let PlayerEventCalification = class PlayerEventCalification extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlayerEventCalification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Player_1.Player),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], PlayerEventCalification.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Event_1.Event),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], PlayerEventCalification.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Calification_1.Calification),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], PlayerEventCalification.prototype, "calification", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlayerEventCalification.prototype, "detail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], PlayerEventCalification.prototype, "date", void 0);
PlayerEventCalification = __decorate([
    (0, typeorm_1.Entity)()
], PlayerEventCalification);
exports.PlayerEventCalification = PlayerEventCalification;
