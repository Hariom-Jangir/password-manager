import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-around items-center">
      
      <h1 className="text-xl font-bold text-green-400">
        &lt;Guard_BY_OM/&gt;
      </h1>

      <button  onClick={() =>window.open("https://github.com/Hariom-Jangir", "_blank")}   className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full flex items-center gap-1 text-sm ">
        <img
          src="github.svg"
          alt="github"
          className="w-7 rounded-full"
        />
        GitHub
      </button>

    </nav>
  );
};

export default Navbar;