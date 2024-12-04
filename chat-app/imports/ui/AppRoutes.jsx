import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import ChatPage from "./ChatPage"; // Import de ChatPage
import { useTracker } from "meteor/react-meteor-data";
import { App } from "./App";

const AppRoutes = () => {
    // Haal de huidige gebruiker op met behulp van useTracker
    const user = useTracker(() => Meteor.user());
    // Functie om uit te loggen
    const handleLogout = () => {
        // Log de gebruiker uit en geef een melding als het uitloggen is mislukt
        Meteor.logout((error) => {
            if (error) {
                console.error("Logout failed: ", error);
            } else {
                // Optioneel: je kunt hier ook een redirect toevoegen na het uitloggen
                console.log("Logged out successfully");
            }
        });
    };
    return (
        // Voeg de navigatiebalk toe en de routes voor de verschillende pagina's met juiste styling
        <Router>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white font-bold">
                        Meteor React
                    </Link>
                    <div>
                        {user ? (
                            <>
                                <Link to="/" className="text-white hover:underline">
                                    Chat
                                </Link>
                                <Link to="/" className="text-white hover:underline ml-4" onClick={handleLogout}>
                                    Afmelden
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-white hover:underline">
                                    Inloggen
                                </Link>
                                <Link to="/register" className="text-white hover:underline ml-4">
                                    Registreren
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <Routes>
                {/* Route voor de gebruikerslijst */}
                <Route path="/" element={<App />} />

                {/* Route voor registratie en login */}
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />

                {/* Dynamische route voor de chatpagina van een specifieke gebruiker */}
                <Route path="/chat/:userId" element={<ChatPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
