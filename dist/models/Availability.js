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
exports.Availability = void 0;
const typeorm_1 = require("typeorm");
const Day_1 = require("./Day");
const Person_1 = require("./Person");
let Availability = class Availability extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Availability.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'start_time' }),
    __metadata("design:type", Date)
], Availability.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'end_time' }),
    __metadata("design:type", Date)
], Availability.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1.Person),
    (0, typeorm_1.JoinColumn)({ name: 'personId' }),
    __metadata("design:type", Number)
], Availability.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Day_1.Day),
    (0, typeorm_1.JoinColumn)({ name: 'dayId' }),
    __metadata("design:type", Number)
], Availability.prototype, "day", void 0);
Availability = __decorate([
    (0, typeorm_1.Entity)()
], Availability);
exports.Availability = Availability;
