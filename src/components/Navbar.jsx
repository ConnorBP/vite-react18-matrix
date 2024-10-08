import React from "react";
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
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
        className="flex flex-col md:flex-row lg:flex-row items-center text-2xl justify-center flex-grow"
      >
          <Link
            to="features"
            smooth={true}
            duration={500}
            offset={-70}
          >
            About
          </Link>
        </motion.div>
    </nav>
  );
};
