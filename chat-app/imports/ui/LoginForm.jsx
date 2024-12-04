import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const submit = async (e) => {
    // Voorkom dat de pagina herlaad bij het indienen van het formulier
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    // E-mail validatie
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Invalid email format.');
      setLoading(false);
      return;
    }

    // Log de gebruiker in met de ingevoerde gegevens en geef een melding als het inloggen is mislukt 
    Meteor.loginWithPassword(email, password, (err) => {
      setLoading(false); 
      if (err) {
        setError(err.reason);
      } else {
        // zet de gebruikersnaam in een cookie en stuur de gebruiker naar de chatpagina
        Cookies.set('userEmail', email, { expires: 1/24 }); // cookie voor 1 uur
        setEmail('');
        setPassword('');
        setError('');
        window.location.href = '/';
      }
    })
    
  };

  
  return (
    // Formulier voor het inloggen met de juiste opmaak en styling 
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>
        {/* Toon een foutmelding als het inloggen is mislukt */}
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* invulveld voor het e-mailadres */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="border border-gray-300 p-2 w-full rounded"
            value={email} // Standaard waarde instellen
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
            value={password} // Standaard waarde instellen
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          {/* knop om in te loggen en de indicatie als de applicatie aan het laden is */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
          >
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </div>
      </form>
    </div>
  );
};
