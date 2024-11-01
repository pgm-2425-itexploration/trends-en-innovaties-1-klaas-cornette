import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    Meteor.call('users.create', { name, email, password }, (err) => {
      setLoading(false); // End loading
      if (err) {
        setError(err.reason);
      } else {
        // Set cookie after successful registration
        Cookies.set('userEmail', email, { expires: 1/24 }); // Cookie expires in 7 days
        setName('');
        setEmail('');
        setPassword('');
        setError('');
      }
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}

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
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};
