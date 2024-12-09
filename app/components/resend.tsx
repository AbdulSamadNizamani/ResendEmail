"use client";

import React, { useState } from "react";

// Reusable Input Field Component
interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  placeholder,
  onChange,
}) => (
  <div className="w-64">
    <label className="block text-2xl font-semibold text-blue-800 mb-2">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className="w-64 h-10 text-lg border-2 border-gray-800 rounded px-2 focus:outline-none focus:border-blue-600"
    />
  </div>
);

export const ResendBox: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setStatusMessage("Email sent successfully!");
        setIsError(false);
        console.log(result);
      } else {
        const error = await response.json();
        setStatusMessage(`Error: ${error.error}`);
        setIsError(true);
      }
    } catch (err) {
      setStatusMessage("An unexpected error occurred.");
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-tr from-purple-800 to-pink-800 flex items-center justify-center">
      <div className="shadow-2xl w-96 bg-white rounded-xl p-6">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
          Send an Email
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <InputField
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            placeholder="Enter your username"
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-40 px-6 py-2 text-xl bg-blue-600 text-white rounded hover:bg-blue-800 hover:scale-105 transition-transform duration-300"
          >
            Send
          </button>
        </form>
        {statusMessage && (
          <p
            className={`mt-4 text-center text-lg ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResendBox;
``;
