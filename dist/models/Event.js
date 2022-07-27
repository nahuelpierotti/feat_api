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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const EventApply_1 = require("./EventApply");
const EventSuggestion_1 = require("./EventSuggestion");
const Periodicity_1 = require("./Periodicity");
const Person_1 = require("./Person");
const PlayerList_1 = require("./PlayerList");
const Sport_1 = require("./Sport");
const State_1 = require("./State");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Event.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'start_time' }),
    __metadata("design:type", Date)
], Event.prototype, "start_time", void 0);
__decorate([
    (0, typeorm_1.Column)('time', { name: 'end_time' }),
    __metadata("design:type", Date)
], Event.prototype, "end_time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Event.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Event.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", String)
], Event.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Event.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => State_1.State, state => state.event, { cascade: ['insert', 'update'] }),
    (0, typeorm_1.JoinColumn)({ name: 'stateId' }),
    __metadata("design:type", Number)
], Event.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sport_1.Sport),
    (0, typeorm_1.JoinColumn)({ name: 'sportId' }),
    __metadata("design:type", Number)
], Event.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Periodicity_1.Periodicity),
    (0, typeorm_1.JoinColumn)({ name: 'periodicityId' }),
    __metadata("design:type", Number)
], Event.prototype, "periodicity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventApply_1.EventApply, eventApply => eventApply.event, { cascade: ['insert', 'update'] }),
    __metadata("design:type", EventApply_1.EventApply)
], Event.prototype, "eventApply", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlayerList_1.PlayerList, playerList => playerList.event, { cascade: ['insert', 'update'] }),
    __metadata("design:type", PlayerList_1.PlayerList)
], Event.prototype, "playerList", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Person_1.Person, (person) => person.events),
    (0, typeorm_1.JoinColumn)({ name: 'organizerId' }),
    __metadata("design:type", Number)
], Event.prototype, "organizer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventSuggestion_1.EventSuggestion, eventSuggestion => eventSuggestion.event, { cascade: ['insert', 'update'] }),
    __metadata("design:type", EventSuggestion_1.EventSuggestion)
], Event.prototype, "eventSuggestion", void 0);
Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
exports.Event = Event;
