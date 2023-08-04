// PremiumPlansPage.js
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import PremiumPlanCard from "../components/PremiumCard";
import { Link } from "react-router-dom";
import { ThemeSwitch } from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const PremiumPlansPage = () => {
  const plans = [
    {
      title: "Free",
      price: "0",
      use: "Trial",
      features: ["Upload 20 images", "Download 10 images"],
    },
    {
      title: "Standard",
      price: "5.00",
      use: "Personal or Freelance",
      features: ["Upload 100 images", "Unlimited downloads", "Special Badge"],
    },
    {
      title: "Premium",
      price: "20.00",
      use: "Business or Enterprise",
      features: [
        "Upload Unlimited images",
        "Unlimited downloads",
        "Special Badge",
        "Premium Templates ",
      ],
    },
  ];

  return (
    <AnimatePresence>
      <motion.section {...slideAnimation("left")} className="h-screen">
        <motion.nav className="flex  gap-5 justify-between p-3 items-center mx-12 my-2">
          <motion.div className="flex justify-center gap-3 items-center">
            <img
              src="./Logo.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
            <p className="text-lg font-semibold ">Design Up</p>
          </motion.div>
          <motion.div className="flex items-center gap-3 mx-3">
            <Link to="/">
              <button className="gb-btn">Home</button>
            </Link>
            <Link to="/Profile">
              <button className="gb-btn">Profile</button>
            </Link>
            <ThemeSwitch />
          </motion.div>
        </motion.nav>
        <span className="prempage-header  items-center flex justify-center mt-12 bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
          PREMIUM PLANS <span className='text-sm font-light text-red-500'>(under build)</span>
        </span>
        <motion.div className="flex flex-wrap m-5 justify-center">
          {plans.map((plan, index) => (
            <PremiumPlanCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              use={plan.use}
            />
          ))}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default PremiumPlansPage;
