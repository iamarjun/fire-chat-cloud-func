'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendNotification = functions.database.ref('/notification/{user_id}/{notification_id}').onWrite(event => {

    const user_id = event.params.user_id;
    const notification_id = event.params.notification_id;

    console.log('user id: ', user_id);
    console.log('notification id: ', notification_id);
})