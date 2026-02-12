import { useState, useEffect } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    notifications: true,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Settings saved:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Enable Notifications</span>
        </div>

        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}

