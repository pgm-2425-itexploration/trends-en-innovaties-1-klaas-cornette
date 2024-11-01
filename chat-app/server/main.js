import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";

import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export const Messages = new Mongo.Collection("messages");

// Meteor methodes
Meteor.methods({
});


Meteor.methods({
    
    async "messages.insert"(recipientId, text) {
        // Controleer of de gebruiker is ingelogd
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        // Voeg een nieuw bericht toe en wacht op de operatie
        await Messages.insertAsync({
            senderId: this.userId,
            recipientId,
            text,
            createdAt: new Date(),
        });
    },

    "messages.fetch"(recipientId) {
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }

        // Haal berichten op tussen de gebruikers
        return Messages.find({
            $or: [
                { senderId: this.userId, recipientId },
                { senderId: recipientId, recipientId: this.userId },
            ],
        }).fetch();
    },

    "users.create"({ name, email, password }) {
        // Validatie
        check(name, String);
        check(email, String);
        check(password, String);

        // Maak de gebruiker aan
        const userId = Accounts.createUser({
            username: name,
            email: email,
            password: password,
        });

        if (!userId) {
            throw new Meteor.Error("User creation failed");
        }
        return userId;
    },
});

// Publicatie voor berichten
Meteor.publish("messages", function (recipientId) {
    if (!this.userId) {
        return this.ready();
    }

    return Messages.find({
        $or: [
            { senderId: this.userId, recipientId },
            { senderId: recipientId, recipientId: this.userId },
        ],
    });
});

// Publicaties voor gebruikers
Meteor.publish("allUsers", function () {
    if (this.userId) {
        return Meteor.users.find({}, { fields: { username: 1, emails: 1 } });
         // Pas aan welke velden je wilt publiceren
    } else {
        this.ready();
    }
});

Meteor.publish('userById', function (userId) {
    check(userId, String);
    return Meteor.users.find({ _id: userId }, { fields: { profile: 1, emails: 1 } });
    // Pas aan welke velden je wilt publiceren
  });
