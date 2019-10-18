// require package called firebase-functions from firebase
const functions = require('firebase-functions');
// require package called firebase-admin from firebase library
const admin = require("firebase-admin");
admin.initializeApp();
// exoirt addAdminRole from functions with https and onCall function with data and context as input
exports.addAdminRole = functions.https.onCall((data, context) => {
    // get user and add custom claim (admin credential) to that user based on the email provided
    return admin.auth().getUserByEmail(data.email).then(user => {
        // once the user promise is returned, then set custom claim to the user uid making the admin credential true
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
        // once all of the returns are done, a message is made
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
        // catch any error and return to debug later
    }).catch(err => {
        return err;
    });
});

// deploy to firebase by typing in Terminal: firebase deploy --only functions
// you should see deploy complete
// On firebase under project > functions > you should see addAdminRole function
// Logs tab should show how many time the functions have been deployed