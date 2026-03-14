import React, { useState, useEffect } from "react";

const Manager = () => {

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);
  const [editId, setEditId] = useState(null);

  /* =========================
     LOAD PASSWORDS
  ========================= */

  const getPasswords = async () => {

    const res = await fetch("https://password-manager-backend-3fj5.onrender.com/passwords");
    const data = await res.json();

    setPasswordArray(data);

  };

  useEffect(() => {
    getPasswords();
  }, []);
  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  /* =========================
     SAVE PASSWORD
  ========================= */

  const handleSave = async () => {

    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    /* EDIT MODE */

    if (editId) {

      await fetch(`https://password-manager-backend-3fj5.onrender.com/passwords/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      setEditId(null);

    } 
    else {

      /* ADD MODE */

      await fetch("https://password-manager-backend-3fj5.onrender.com/passwords", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)

      });

    }

    setForm({
      site: "",
      username: "",
      password: ""
    });

    getPasswords();

  };

  /* =========================
     COPY TEXT
  ========================= */

  const handleCopy = (text) => {

    navigator.clipboard.writeText(text);
    alert("Copied!");

  };

  /* =========================
     DELETE PASSWORD
  ========================= */

  const handleDelete = async (id) => {

    await fetch(`https://password-manager-backend-3fj5.onrender.com/passwords/${id}`, {
      method: "DELETE"
    });

    getPasswords();

  };

  /* =========================
     EDIT PASSWORD
  ========================= */

  const handleEdit = (item) => {

    setForm({
      site: item.site,
      username: item.username,
      password: item.password
    });

    setEditId(item._id);

  };

  return (

    <div className="flex flex-col items-center px-6 py-10">

      <h2 className="text-3xl font-bold text-green-500 mb-2">
        &lt;Guard_BY_OM/&gt;
      </h2>

      <p className="text-gray-600 mb-6">
        Your own Password Manager
      </p>

      <div className="w-full max-w-3xl space-y-4">

        {/* WEBSITE INPUT */}

        <input
          type="text"
          name="site"
          placeholder="Enter website URL"
          value={form.site}
          onChange={handleChange}
          className="w-full border rounded-full px-4 py-2 focus:outline-green-400"
        />

        <div className="flex flex-col md:flex-row gap-4">

          {/* USERNAME */}

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={form.username}
            onChange={handleChange}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-green-400"
          />

          {/* PASSWORD */}

          <div className="flex items-center border rounded-full px-4 py-2 flex-1 bg-white">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="flex-1 outline-none"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >

              {showPassword ? (

                <img src="/eyeclose.svg" alt="hide" className="w-5" />

              ) : (

                <img src="/eyeopen.svg" alt="show" className="w-5" />

              )}

            </span>

          </div>

        </div>

        {/* SAVE BUTTON */}

        <div className="flex justify-center">

          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
          >
            {editId ? "Update Password" : "Save Password"}
          </button>

        </div>

      </div>

      {/* PASSWORD LIST */}

      <div className="w-full max-w-4xl mt-10">

        <h3 className="font-semibold text-lg mb-4 text-center">
          Your Passwords
        </h3>

        {passwordArray.length === 0 ? (

          <p className="text-gray-500 text-center">
            No passwords to show
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full table-auto border border-green-400 rounded-lg overflow-hidden">

              <thead className="bg-green-500 text-white">

                <tr>
                  <th className="py-2 px-4 text-left">Website</th>
                  <th className="py-2 px-4 text-left">Username</th>
                  <th className="py-2 px-4 text-left">Password</th>
                  <th className="py-2 px-4 text-center">Actions</th>
                </tr>

              </thead>

              <tbody className="bg-white">

                {passwordArray.map((item) => (

                  <tr
                    key={item._id}
                    className="border-t hover:bg-green-50 transition"
                  >

                    {/* WEBSITE */}

                    <td className="py-2 px-4">

                      <div className="flex items-center gap-2">

                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {item.site}
                        </a>

                        <img
                          src="/copy.svg"
                          alt="copy"
                          className="w-4 cursor-pointer hover:scale-110"
                          onClick={() => handleCopy(item.site)}
                        />

                      </div>

                    </td>

                    {/* USERNAME */}

                    <td className="py-2 px-4">

                      <div className="flex items-center gap-2">

                        {item.username}

                        <img
                          src="/copy.svg"
                          alt="copy"
                          className="w-4 cursor-pointer hover:scale-110"
                          onClick={() => handleCopy(item.username)}
                        />

                      </div>

                    </td>

                    {/* PASSWORD */}

                    <td className="py-2 px-4">

                      <div className="flex items-center gap-2">

                        {"*".repeat(item.password.length)}

                        <img
                          src="/copy.svg"
                          alt="copy"
                          className="w-4 cursor-pointer hover:scale-110"
                          onClick={() => handleCopy(item.password)}
                        />

                      </div>

                    </td>

                    {/* ACTIONS */}

                    <td className="py-2 px-4 text-center space-x-3">

                      <button
                        onClick={() => handleEdit(item)}
                        className="hover:scale-110 transition"
                      >
                        <img src="/edit.svg" alt="edit" className="w-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="hover:scale-110 transition"
                      >
                        <img src="/delete.svg" alt="delete" className="w-4" />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Manager;