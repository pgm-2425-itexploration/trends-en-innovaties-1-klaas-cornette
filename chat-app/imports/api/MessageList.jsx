import React from "react";

const MessageList = ({ messages }) => {
    // Toon de berichten in een lijst met de juiste opmaak voor de afzender en ontvanger van het bericht 
    return (
        // maak een box aan met de berichten erin 
        <div className="box"> 
         {/* map door de berichten en geef ze een kleur en positie afhankelijk van de afzender */}
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`p-2 rounded-lg text ${
                        message.senderId === Meteor.userId() ? "bg-blue-500 text-white text--right" : "bg-gray-300 "
                    }`}
                >
                    <p>{message.text}</p>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
