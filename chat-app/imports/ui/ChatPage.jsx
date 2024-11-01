import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../api/MessageList";
import MessageInput from "../api/MessageInput";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Tracker } from "meteor/tracker";

const ChatPage = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  
  const { user, isLoading } = useTracker(() => {
      const handle = Meteor.subscribe("userById", userId);
      const isLoading = !handle.ready();
      const user = Meteor.users.findOne(userId);
  
      // Retourneer de gebruiker en de laadstatus
      return { user, isLoading };
  }, [userId]);
  
  // useEffect wordt altijd aangeroepen, maar zal alleen uitvoeren als de voorwaarden zijn voldaan.
  useEffect(() => {
      if (user && !isLoading) {
          // Haal berichten op alleen wanneer de gebruiker is geladen
          Meteor.call("messages.fetch", userId, (error, fetchedMessages) => {
              if (error) {
                  console.error("Fout bij het ophalen van berichten:", error);
              } else {
                  setMessages(fetchedMessages);
                  console.log(fetchedMessages);
              }
          });
      }
  }, [user, isLoading, userId]);
  
  // Toon een laadscherm als de gegevens nog worden geladen
  if (isLoading) {
      return <div>Bezig met laden...</div>;
  }
  
  if (!user) {
      return <div>User not found</div>;
  }
    const handleSendMessage = (text) => {
        Meteor.call("messages.insert", userId, text, (error) => {
            if (error) {
                console.error("Error sending message:", error);
            }
        });
    };


    return (
        <div className="flex flex-col h-screen p-4 bg-blue-100">
            <h1 className="text-2xl mb-4 text-center">Chat with User {user ? user.emails[0].address : ""} </h1>      
                <MessageList messages={messages} />           
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatPage;
