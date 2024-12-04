import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Messages } from "../imports/api/messages";

//start de server
Meteor.startup(() => {
    console.log("Server started");
})

// Voeg een asynchrone of normale methodes toe om de insert operatie uit te voeren
Meteor.methods({
    // Methode om een bericht toe te voegen
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
        //check of de gebruiker is aangemaakt
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
    //zoek naar berichten waarvan de verzender of ontvanger de huidige gebruiker is
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
        //zoek naar alle gebruikers en retourneer alleen de gebruikersnaam en e-mail
        return Meteor.users.find({}, { fields: { username: 1, emails: 1 } });
         // Pas aan welke velden je wilt publiceren
    } else {
        this.ready();
    }
});

Meteor.publish('userById', function (userId) {
    check(userId, String);
    // Zoek naar de gebruiker met de opgegeven id en retourneer alleen de profiel- en e-mailvelden
    return Meteor.users.find({ _id: userId }, { fields: { profile: 1, emails: 1 } });
    // Pas aan welke velden je wilt publiceren
  });
