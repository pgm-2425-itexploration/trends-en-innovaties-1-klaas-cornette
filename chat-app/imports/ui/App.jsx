import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import UserList from "./UserList";

export const App = () => {
    // Haal de huidige gebruiker op met behulp van useTracker
    const user = useTracker(() => Meteor.user());

    return (
        // Toon een welkomstbericht en de optie om in te loggen of te registreren met de juiste styling 
        <div className="main flex flex-col items-center bg-gradient-to-r pt-32">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                
                <h1 className="text-2xl font-bold text-gray-800 text-center">Welkom</h1>
                
                {user ? (
                    <>
                    {/* Toon de gebruiker als deze is ingelogd  */}
                    <p className="text-center">{user.emails[0].address}</p>
                    {/* Toon de lijst met gebruikers */}
                    < UserList />
                    </>
                    
                ) : (
                    <>
                        {/* Toon de knoppen om in te loggen of te registreren  */}
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
