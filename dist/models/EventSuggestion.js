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
exports.EventSuggestion = void 0;
const typeorm_1 = require("typeorm");
const Event_1 = require("./Event");
const State_1 = require("./State");
const Person_1 = require("./Person");
let EventSuggestion = class EventSuggestion extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventSuggestion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => State_1.State),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], EventSuggestion.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Event_1.Event),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], EventSuggestion.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1.Person),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], EventSuggestion.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], EventSuggestion.prototype, "date", void 0);
EventSuggestion = __decorate([
    (0, typeorm_1.Entity)()
], EventSuggestion);
exports.EventSuggestion = EventSuggestion;
