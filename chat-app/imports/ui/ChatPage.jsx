import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../api/MessageList";
import MessageInput from "../api/MessageInput";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages";

const ChatPage = () => {
    // Haal de userId op uit de URL met behulp van useParams
    const { userId } = useParams();

    // Gebruik de useTracker hook om de gebruiker en de laadstatus op te halen
    const { user, isLoading } = useTracker(() => {
        // Laad de gebruiker waarmee wordt gechat door gebruik te maken van de subscribe methode
        const handle = Meteor.subscribe("userById", userId);
        const isLoading = !handle.ready();
        const user = Meteor.users.findOne(userId);
        // Retourneer de gebruiker en de laadstatus
        return { user, isLoading };
    }, [userId]);

    // Gebruik de useTracker hook om de berichten en de laadstatus op te halen
    const { messages, isLoadingMessages } = useTracker(() => {
        // Laad de berichten van de huidige gebruiker en de gebruiker waarmee wordt gechat door gebruik te maken van de subscribe methode
        // hierdoor worden de berichten van de gebruiker en de ontvanger geladen in real-time in de chat
        const handle = Meteor.subscribe("messages", userId);
        const isLoadingMessages = !handle.ready();
        const messages = Messages.find().fetch();

        // Retourneer de berichten en de laadstatus
        return { messages, isLoadingMessages };
    }, [userId]);

    // Toon een laadscherm als de berichten nog worden geladen
    if (isLoadingMessages) {
        return <div>Loading messages...</div>;
    }

    // Toon een laadscherm als de gegevens nog worden geladen
    if (isLoading) {
        return <div>Bezig met laden...</div>;
    }

    // Toon een melding als de gebruiker niet is gevonden
    if (!user) {
        return <div>User not found</div>;
    }
    const handleSendMessage = (text) => {
        // Verstuur het bericht naar de gebruiker waarmee wordt gechat
        // door gebruik te maken van de messages.insert methode van de server en geef een melding als het versturen is mislukt
        Meteor.call("messages.insert", userId, text, (error) => {
            if (error) {
                console.error("Error sending message:", error);
            }
        });
    };

    return (
        // Toon de chatpagina met de berichten en de invoervelden voor het versturen van berichten met de juiste styling 
        <div className="flex flex-col h-screen p-4 bg-blue-100">
            <h1 className="text-2xl mb-4 text-center">Chat with User {user ? user.emails[0].address : ""} </h1>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatPage;
