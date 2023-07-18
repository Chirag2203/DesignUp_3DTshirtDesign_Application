// store.js

import { proxy } from "valtio";

const initialState = {
  intro: true,
  // ... other initial state properties
  logoPosition: { x: 0, y: 0 }, // Initialize the logo position to (0, 0)
};

const state = proxy(initialState);

// Add functions to update logo position
export const moveLogoLeft = () => {
  state.logoPosition.x -= 0.5; // Move the logo left by 10 units (adjust this value as needed)
};

export const moveLogoRight = () => {
  state.logoPosition.x += 0.5; // Move the logo right by 10 units (adjust this value as needed)
};

export const moveLogoUp = () => {
  state.logoPosition.y += 2; // Move the logo up by 10 units (adjust this value as needed)
};

export const moveLogoDown = () => {
  state.logoPosition.y -= 2; // Move the logo down by 10 units (adjust this value as needed)
};
export  const ScaleUp = () => {
  state.logoScale += 0.1;
};

export const ScaleDown = () => {
  state.logoScale = Math.max(0.1, state.logoScale - 0.1);
};
export default state;
