//const admin = require("firebase-admin");
import admin  from "firebase-admin";
const serviceAccount = require('./keys/feat-6ca32-firebase-adminsdk-wd6c9-fc52d4c8a4.json');
const FCM= require('fcm-node');
const serverKey = 'AAAAikENcUo:APA91bGLbGzdssDn1uzfq5qFTMbOBhx6Sr3kgoDc8OQ_azW95Q-cqw_uotuvODQ1Xa9C5gCz4Xoq5W-HNa9aHDVmCxLa0J2vi_pA5SmGpV5sYwTdU0vUSsgdsKkvOibXsG0T3QqVLJVU';
const fcm = new FCM(serverKey);


export const initFirebase =async() =>{
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const subscribeTopic=async ( event: string,registrationTokens:string) =>{
  admin.messaging().subscribeToTopic(registrationTokens, event)
    .then((response: any) => {
      console.log('Successfully subscribed to topic:', response);
    })
    .catch((error: any) => {
      console.log('Error subscribing to topic:', error);
    });
}

export const sendPushToOneUser=async(tokenId: string, title: string, msg: string) =>{
    const message = {
        to: tokenId,
        notification: {
            title: title,
            body: msg,
        }
    }
    sendMessage(message);
}

export const sendPushToTopic=async(topic: string, title: string,msg: string)=> {
    const message = {
        topics: topic,
        notification: {
            title: title,
            body: msg
        }
    }
    sendMessage(message);
    //admin.messaging().send(message)
}

export const sendMessage=async(message: any)=> {
    fcm.send(message, function(err:any, response:any) {
        if (err) {
            console.log("Something has gone wrong!"+err);
			console.log("Respponse:! "+response);
        } else {
            // showToast("Successfully sent with response");
            console.log("Successfully sent with response: ", response);
        }

    });
}

