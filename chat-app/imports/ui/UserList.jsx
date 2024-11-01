import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const usersTracker = Tracker.autorun(() => {
            Meteor.subscribe("allUsers");
            const allUsers = Meteor.users.find().fetch();
            setUsers(allUsers);
        });

        return () => {
            usersTracker.stop();
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) => {
        const email = user.emails ? user.emails[0].address : "";
        return email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="max-w-lg mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Gebruikers</h2>
            <input
                type="text"
                placeholder="Zoek gebruiker..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
