
import { proxy } from 'valtio';

const state = proxy({
  // ... other state variables
  logoPosition: { x: 0, y: 0 }, // Initial position of the logo on the t-shirt
});

const moveLogoLeft = () => {
  state.logoPosition.x -= 0.01; // Adjust the amount of movement as needed
  state.logoPosition = { ...state.logoPosition };
};

const moveLogoRight = () => {
  state.logoPosition.x += 0.5; // Adjust the amount of movement as needed
  state.logoPosition = { ...state.logoPosition };
};

const moveLogoUp = () => {
  state.logoPosition.y += 0.01; // Adjust the amount of movement as needed
  state.logoPosition = { ...state.logoPosition };
};

const moveLogoDown = () => {
  state.logoPosition.y -= 0.01; // Adjust the amount of movement as needed
  state.logoPosition = { ...state.logoPosition };
};

  export { moveLogoLeft, moveLogoRight, moveLogoUp, moveLogoDown };
  export default state;