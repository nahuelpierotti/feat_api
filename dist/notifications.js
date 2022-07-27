"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.sendPushToTopic = exports.sendPushToOneUser = exports.subscribeTopic = exports.initFirebase = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebaseServiceAccountJson = __importStar(require("./keys/feat-6ca32-firebase-adminsdk-wd6c9-fc52d4c8a4.json"));
const FCM = require("fcm-node");
const serverKey = "AAAAikENcUo:APA91bGLbGzdssDn1uzfq5qFTMbOBhx6Sr3kgoDc8OQ_azW95Q-cqw_uotuvODQ1Xa9C5gCz4Xoq5W-HNa9aHDVmCxLa0J2vi_pA5SmGpV5sYwTdU0vUSsgdsKkvOibXsG0T3QqVLJVU";
const fcm = new FCM(serverKey);
const firebaseServiceAccount = firebaseServiceAccountJson;
const initFirebase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(firebaseServiceAccount),
    });
});
exports.initFirebase = initFirebase;
const subscribeTopic = (event, registrationTokens) => __awaiter(void 0, void 0, void 0, function* () {
    firebase_admin_1.default
        .messaging()
        .subscribeToTopic(registrationTokens, event)
        .then((response) => {
        //   console.log("Successfully subscribed to topic:", response);
    })
        .catch((error) => {
        console.log("Error subscribing to topic:", error);
    });
});
exports.subscribeTopic = subscribeTopic;
const sendPushToOneUser = (tokenId, title, msg) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        to: tokenId,
        notification: {
            title: title,
            body: msg,
        },
    };
    (0, exports.sendMessage)(message);
});
exports.sendPushToOneUser = sendPushToOneUser;
const sendPushToTopic = (topic, title, msg) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        data: {
            mensaje: msg,
        },
        notification: {
            title: title,
            body: msg,
        },
        topic: topic,
    };
    //sendMessage(message);
    firebase_admin_1.default
        .messaging()
        .send(message)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
});
exports.sendPushToTopic = sendPushToTopic;
const sendMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    fcm.send(message, function (err, response) {
        if (err) {
            //console.log("Something has gone wrong!" + err);
            //console.log("Respponse:! " + response);
        }
        else {
            // showToast("Successfully sent with response");
            //console.log("Successfully sent with response: ", response);
        }
    });
});
exports.sendMessage = sendMessage;
