import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";


import state from "../store";
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  Loading,
  ThemeSwitch,
} from "../components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";

const Home = ({ handleClick }) => {
  const snap = useSnapshot(state);

  const { isLoading, error } = useAuth0();

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home flex justify-between items-center " {...slideAnimation("left")}>
          <motion.div {...slideAnimation("down")} className="navh flex ">
            <div className="flex justify-center gap-3 items-center">
              <img
                src="./Logo.png"
                alt="logo"
                className="w-10 h-10 object-contain"
              />
              <p className="text-lg font-semibold ">Design Up</p>
            </div>
            <motion.div className="">
              <motion.div className="flex gap-3 mx-0">
                {error && <div>Oops... </div>}
                {isLoading && <Loading />}
                {!error && !isLoading && (
                  <>
                    <Link to="/PremiumPlanPage">
                      <button class="prem-btn flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 36 24"
                        >
                          <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
                        </svg>
                        <span>Unlock Pro</span>
                      </button>
                    </Link>
                    <LoginButton />
                    <LogoutButton />
                    <ProfileButton handleClick={handleClick} />
                    <ThemeSwitch />
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="text-6xl font-bold head-text">
                Unleash Your <br className="xl:block hidden" /> Imagination.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md  text-blue-600 text-base">
                Upload your artwork and see it come to life on a 3D t-shirt.
                Design Up lets you customize your own t-shirt with your own
                artwork and colors.
              </p>

              <button
                className="start-btn w-64 font-semibold inherit"
                type="filled"
                // title="Customize It"
                onClick={() => (state.intro = false)}
                // customStyles="w-64 px-4 py-2.5 font-bold text-sm"
              >
                {" "}
                Design Now!
              </button>
            </motion.div>
            <img
              src="./telegram.png"
              className="w-10 h-10 ml-16 telgicon"
              alt=""
            />
          </motion.div>
          
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
