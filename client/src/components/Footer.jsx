import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 flex flex-col gap-2 justify-center items-center">
      <p className="text-m">
        &copy; {new Date().getFullYear()} DesignUP. All rights reserved.
      </p>
      <p className="text-sm">Developed with ❤️ by Chirag Rajput</p>
    </footer>
  );
};

export default Footer;
