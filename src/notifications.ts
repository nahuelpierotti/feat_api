//const admin = require("firebase-admin");
import admin  from "firebase-admin";

export const initFirebase =async() =>{
    const serviceAccount = require('./keys/feat-6ca32-firebase-adminsdk-wd6c9-fc52d4c8a4.json');
    await admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    //subscribeTopic("27-EventoPrueba")
    sendPushToTopic(
        "27-EventoPrueba", 
        "27-EventoPrueba",
        "Todo ok"
    )
}

const registrationToken="f6H1MeIUSI69Dr57cbnubS:APA91bH-HiCxVaxbVEoU8xsAtYzk6aXvghJbsG3SagP5z5YGj5VVCK84NkwQXEg-puZe15tw2WjBMmI_e5FqDsmXm_x-TpUbxMgd94MEyG10cM5OlJUf_VqZwge2oYrwmRmRoMeWVsBm"

//initFirebase();

function subscribeTopic( event: string){
  // Subscribe the devices corresponding to the registration tokens to the
  // topic.
  admin.messaging().subscribeToTopic(registrationToken, event)
    .then((response: any) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully subscribed to topic:', response);
    })
    .catch((error: any) => {
      console.log('Error subscribing to topic:', error);
    });
}
/*
function sendPushToOneUser(tokenId: string, title: string, msg: string) {
    const message = {
        token: tokenId,
        data: {
            titulo: title,
            mensaje: msg
        }
    }
    sendMessage(message);
}
*/
function sendPushToTopic(topic: string, title: string,msg: string) {
    const message = {
        topic: topic,
        data: {
            titulo: title,
            mensaje: msg
        }
    }
    //sendMessage(message);
    admin.messaging().send(message)
}

//module.exports = { /*sendPushToOneUser,*/ sendPushToTopic }

function sendMessage(message: any) {
    admin.messaging().send(message)
    .then((response: any) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error: any) => {
        console.log('Error sending message:', error);
    })
}

