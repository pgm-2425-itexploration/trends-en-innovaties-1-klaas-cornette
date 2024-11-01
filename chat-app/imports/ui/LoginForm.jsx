import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const submit = async (e) => {
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

    Meteor.loginWithPassword(email, password, (err) => {
      setLoading(false); 
      if (err) {
        setError(err.reason);
      } else {

        Cookies.set('userEmail', email, { expires: 1/24 }); 
        setEmail('');
        setPassword('');
        setError('');
        
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}

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
