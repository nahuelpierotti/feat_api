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
exports.State = void 0;
const typeorm_1 = require("typeorm");
const EventApply_1 = require("./EventApply");
const Event_1 = require("./Event");
const EventSuggestion_1 = require("./EventSuggestion");
const PlayerList_1 = require("./PlayerList");
let State = class State extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], State.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], State.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], State.prototype, "stateGeneric", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventApply_1.EventApply, eventApply => eventApply.state, { cascade: ['insert', 'update'] }),
    __metadata("design:type", EventApply_1.EventApply)
], State.prototype, "eventApply", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Event_1.Event, event => event.state, { cascade: ['insert', 'update'] }),
    __metadata("design:type", Event_1.Event)
], State.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => EventSuggestion_1.EventSuggestion, eventSuggestion => eventSuggestion.state, { cascade: ['insert', 'update'] }),
    __metadata("design:type", EventSuggestion_1.EventSuggestion)
], State.prototype, "eventSuggestion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PlayerList_1.PlayerList, playerList => playerList.state, { cascade: ['insert', 'update'] }),
    __metadata("design:type", PlayerList_1.PlayerList)
], State.prototype, "playerList", void 0);
State = __decorate([
    (0, typeorm_1.Entity)()
], State);
exports.State = State;
