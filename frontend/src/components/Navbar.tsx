import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex justify-between items-center">
      <div className="text-2xl font-bold text-indigo-600">Trace</div>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li>
          <a href="#" className="hover:text-indigo-500">
            Home
          </a>
        </li>
        <li>
          <a href="#analyze" className="hover:text-indigo-500">
            Analyze
          </a>
        </li>
        <li>
          <a href="#report" className="hover:text-indigo-500">
            Report
          </a>
        </li>
        <li>
          <a href="#about" className="hover:text-indigo-500">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
