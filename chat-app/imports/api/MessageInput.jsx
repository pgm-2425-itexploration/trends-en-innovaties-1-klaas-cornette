import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState("");
    //functie om het bericht te versturen en de input leeg te maken
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        //formulier om een bericht te versturen
        <form onSubmit={handleSubmit} className="flex box">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 min-w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Schrijf u bericht..."
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 w-fit text-white rounded-lg">
                Verstuur
            </button>
        </form>
    );
};

export default MessageInput;
