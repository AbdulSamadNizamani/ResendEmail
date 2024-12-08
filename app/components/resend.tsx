
'use client';

import React, { useState } from 'react';

export const ResendBox: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setStatusMessage('Email sent successfully!');
        console.log(result);
      } else {
        const error = await response.json();
        setStatusMessage(`Error: ${error.error}`);
      }
    } catch (err) {
      setStatusMessage('An unexpected error occurred.');
      console.error(err);
    }
  };

  return (
    <div className="antialiased w-full h-full overflow-hidden bg-gradient-to-tr from-purple-800 to-pink-800">
      <div className="shadow-2xl mx-80 mt-16 h-[35vw] bg-white rounded-xl">
        <h1 className="text-4xl font-bold text-center py-6 text-indigo-800">
          Here is a Form to Send an Email!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
          <div className="w-64">
            <label className="text-2xl font-semibold text-blue-800 mb-4">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-64 h-10 text-lg focus:outline-none border-2 border-gray-800 rounded"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="w-64">
            <label className="text-2xl font-semibold text-blue-800 mb-4">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-64 h-10 text-lg focus:outline-none border-2 border-gray-800 rounded"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="w-64">
            <label className="text-2xl font-semibold text-blue-800 mb-4">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-64 h-10 text-lg focus:outline-none border-2 border-gray-800 rounded"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-8 py-2 text-2xl bg-blue-600 text-white hover:bg-blue-800 hover:scale-105 rounded transition-all duration-300 ease-in"
            >
              Send
            </button>
          </div>
        </form>
        {statusMessage && (
          <p className="mt-4 text-center text-lg text-indigo-600">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ResendBox;
