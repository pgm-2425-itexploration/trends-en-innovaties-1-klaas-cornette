import React from "react";

const MessageList = ({ messages }) => {
    return (
        <div className="box"> 
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
