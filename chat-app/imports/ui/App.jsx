import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import UserList from "./UserList";

export const App = () => {
    const user = useTracker(() => Meteor.user());

    return (
        <div className="main flex flex-col items-center bg-gradient-to-r pt-32">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-gray-800 text-center">Welkom</h1>
                
                {user ? (
                    <>
                    <p className="text-center">{user.emails[0].address}</p>
                    < UserList />
                    </>
                    
                ) : (
                    <>
                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition duration-300 mr-1">
                            <a href="/registren">Registreren</a>
                        </button>
                        <button className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 ml-1">
                            <a href="/login">Inloggen</a>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
