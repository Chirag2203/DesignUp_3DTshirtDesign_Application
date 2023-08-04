// store.js

import { proxy } from "valtio";

const initialState = {
  intro: true,
  logoPosition: { x: 0, y: 0 }, // Initialize the logo position to (0, 0)
};

const state = proxy(initialState);

export const moveLogoLeft = () => {
  state.logoPosition.x -= 0.5; // Move the logo left by 10 units 
};

export const moveLogoRight = () => {
  state.logoPosition.x += 0.5; // Move the logo right by 10 units 
};

export const moveLogoUp = () => {
  state.logoPosition.y += 2; // Move the logo up by 10 units 
};

export const moveLogoDown = () => {
  state.logoPosition.y -= 2; // Move the logo down by 10 units 
};
export  const ScaleUp = () => {
  state.logoScale += 0.1;
};

export const ScaleDown = () => {
  state.logoScale = Math.max(0.1, state.logoScale - 0.1);
};
export default state;
