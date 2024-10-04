import React from "react";
import ColorSelect from "./ColorSelect.jsx";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

export const Navbar = () => {
  return (
    <nav className="flex items-center flex-grow p-4 mt-3 bg-transparent">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
        className="flex items-center"
      >
        <h1 className="text-[#00FF00] cursor-pointer hover:text-white text-xl font-bold m1-6">
          segfault1337
        </h1>
      </motion.div>
    </nav>
  );
};
