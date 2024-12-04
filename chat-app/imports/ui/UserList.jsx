import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const activeUser = Meteor.user();

    useEffect(() => {
        // Laad alle gebruikers met behulp van Tracker en Meteor.subscribe 
        const usersTracker = Tracker.autorun(() => {
            Meteor.subscribe("allUsers");
            const allUsers = Meteor.users.find().fetch();
            // Filter de huidige gebruiker uit de lijst met gebruikers
            allUsers.forEach((user) => {
                if (user._id === activeUser._id) {
                    allUsers.splice(allUsers.indexOf(user), 1);
                }
            });
            // Zet de gebruikers in de state
            setUsers(allUsers);
        });

        // Stop de tracker om geheugenlekken te voorkomen
        return () => {
            usersTracker.stop();
        };
    }, []);

    // Functie om de zoekterm bij te werken wanneer de gebruiker typt
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter de gebruikers op basis van de zoekterm en toon de resultaten
    const filteredUsers = users.filter((user) => {
        const email = user.emails ? user.emails[0].address : "";
        return email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        // Toon de lijst met gebruikers en voeg een zoekbalk toe om gebruikers te zoeken met de juiste styling
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Gebruikers</h2>
            {/* Voeg een zoekbalk toe om gebruikers te zoeken */}
            <input
                type="text"
                placeholder="Zoek gebruiker..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Toon de lijst met gebruikers door map functie te gebruiken  */}
            <ul className="mt-4">
                {filteredUsers.map((user) => (
                    <li key={user._id} className="border-b border-blue-200 py-2">
                        <Link to={`/chat/${user._id}`} className="text-blue-600 hover:text-blue-800">
                            {user.emails ? user.emails[0].address : "error"}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
