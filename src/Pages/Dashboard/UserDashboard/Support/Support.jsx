import { useState } from "react";

export default function Support() {
  const [messageData, setMessageData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageData({ ...messageData, [name]: value });
  };

  const handleSend = (e) => {
    e.preventDefault();
    console.log("Support message sent:", messageData);
  };

  const inputStyle =
    "w-full border p-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="max-w-2xl mx-auto p-6 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Support</h1>

      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block font-semibold">Your Name</label>
          <input
            type="text"
            name="name"
            value={messageData.name}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={messageData.email}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        <div>
          <label className="block font-semibold">Message</label>
          <textarea
            name="message"
            value={messageData.message}
            onChange={handleChange}
            className={inputStyle}
            rows="5"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

