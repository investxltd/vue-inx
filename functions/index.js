const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const Slack = require('slack-node');

const webhookUri = 'https://hooks.slack.com/services/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';

const slack = new Slack();
slack.setWebhook(webhookUri);

const channel = '#portal-alerts';
const username = 'botty-mc-botface';
const emoji = ':boat:';


exports.newUserNotification = functions.auth.user().onCreate((user) => {
    console.log(user);

    slack.webhook({
        channel,
        username,
        icon_emoji: emoji,
        text: `*** NEW USER *** ${user.email} [${user.uid}]`
    }, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            console.log(response);
        }

        return true;
    });

    return true;
});


exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});