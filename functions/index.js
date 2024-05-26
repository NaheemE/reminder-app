/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

function parseDateTime(dateTimeStr) {
  try {
    const [datePart, timePart] = dateTimeStr.split(',').map(part => part.trim());
    if (!datePart || !timePart) {
      throw new Error('Invalid date and time format');
    }
    
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');
    
    if (!day || !month || !year || !hours || !minutes || !seconds) {
      throw new Error('Invalid date or time components');
    }

    // Create a Date object with the parsed values
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date object');
    }

    return date;
  } catch (error) {
    console.error('Error parsing date and time:', error);
    return null;
  }
}

exports.sendReminderNotification = functions.firestore
  .document('reminders/{reminderId}')
  .onCreate(async (snapshot, context) => {
    const reminderId = context.params.reminderId; // Retrieve the reminder ID
    const reminder = snapshot.data();
    const { title, description, dateandtime, uid } = reminder;

    // Fetch the user's FCM token from the Firestore user document
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    const user = userDoc.data();
    const fcmToken = user.fcmToken;

    // Ensure dateandtime is a valid date string and convert it to a Date object
    const reminderDate = parseDateTime(dateandtime);
    if (!reminderDate) {
      console.error('Invalid reminder date');
      return;
    }

    const reminderTime = reminderDate.getTime();
    const now = Date.now();
    const delay = reminderTime - now;

    if (delay > 0) {
      setTimeout(async () => {
        const message = {
          notification: {
            title: 'Reminder: ' + title,
            body: description,
          },
          token: fcmToken,
        };

        // Send the notification
        try {
          await admin.messaging().send(message);
          console.log('Notification sent successfully');
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      }, delay);
    }
  });
