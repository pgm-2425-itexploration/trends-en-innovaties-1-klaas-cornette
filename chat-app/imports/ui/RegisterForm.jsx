import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        // Voorkom dat de pagina herlaad bij het indienen van het formulier 
        e.preventDefault();
        setError("");
        setLoading(true); // Start laden

        Meteor.call("users.create", { name, email, password }, (err) => {
            setLoading(false); // stop laden
            if (err) {
                setError(err.reason);
            } else {
                // Stuur de gebruiker naar de inlogpagina als het registreren is gelukt
                setName("");
                setEmail("");
                setPassword("");
                setError("");
                window.location.href = "/login";
            }
        });
    };

    return (
        // Formulier voor het registreren met de juiste opmaak en styling 
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
                {/* Toon een foutmelding als het registreren is mislukt */}
                {error && <div className="mb-4 text-red-500">{error}</div>}

                {/* invulveld voor de naam */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* invulveld voor het e-mailadres */}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* invulveld voor het wachtwoord */}   
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    {/* knop om te registreren en de indicatie als de applicatie aan het laden is */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
};
