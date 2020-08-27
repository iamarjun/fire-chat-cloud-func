'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendNotification = functions.database.ref('notification/{user_id}/{notification_id}').onWrite((event, context) => {

    const user_id = context.params.user_id;
    const notification_id = context.params.notification_id;

    const message = event.after.child('message').exportVal();

    console.log('user id: ', user_id);
    console.log('notification id: ', notification_id);

    let t = admin.database().ref(`users/${user_id}/token`).once('value', (snapshot) => {
        console.log(snapshot.val());
    }, (errorObject) => {
        console.log("The read failed: " + errorObject.code);
    });


    return t.then(r => {
        console.log("The result: " + r.val())

        const token = r.val();

        console.log('token id: ', token);

        const payload = {
            notification: {
                title: 'Message',
                body: message,
                icon: 'default'
            }
        };

        return admin.messaging().sendToDevice(token, payload);

    });

})