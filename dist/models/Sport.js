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
exports.Sport = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
const SportGeneric_1 = require("./SportGeneric");
let Sport = class Sport extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Sport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Sport.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Sport.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Sport.prototype, "substitute", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Event_1.Event, event => event.sport),
    __metadata("design:type", Event_1.Event)
], Sport.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SportGeneric_1.SportGeneric, (sportGeneric) => sportGeneric.sports),
    __metadata("design:type", SportGeneric_1.SportGeneric)
], Sport.prototype, "sportGeneric", void 0);
Sport = __decorate([
    (0, typeorm_1.Entity)()
], Sport);
exports.Sport = Sport;
