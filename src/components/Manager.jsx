import React, { useState } from "react";

const Manager = () => {

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(form);
  };

  return (
    <div className="flex flex-col items-center px-6 py-10">

      <h2 className="text-3xl font-bold text-green-500 mb-2">
        &lt;Guard_BY_OM/&gt;
      </h2>

      <p className="text-gray-600 mb-6">
        Your own Password Manager
      </p>

      {/* INPUTS */}

      <div className="w-full max-w-3xl space-y-4">

        <input
          type="text"
          name="site"
          placeholder="Enter website URL"
          value={form.site}
          onChange={handleChange}
          className="w-full border rounded-full px-4 py-2 focus:outline-green-400"
        />

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={form.username}
            onChange={handleChange}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-green-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-green-400"
          />

        </div>

        {/* SAVE BUTTON */}

        <div className="flex justify-center">

          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            Save
          </button>

        </div>

      </div>

      {/* PASSWORD LIST */}

      <div className="w-full max-w-3xl mt-10">

        <h3 className="font-semibold text-lg mb-2">
          Your Passwords
        </h3>

        <p className="text-gray-500">
          No passwords to show
        </p>

      </div>

    </div>
  );
};

export default Manager;