import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#3b82f0',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './Logo.png',
  fullDecal: './threejs.png',
  designs: [],

  // Add a counter for the next available design ID
  nextDesignId: 1,

  // Function to save the current design
  saveDesign: () => {
    // Generate a unique design ID using the nextDesignId counter
    const designId = state.nextDesignId;

    // Create a new design object with the necessary properties
    const newDesign = {
      id: designId,
      name: `Design ${designId}`,
      // Add other design properties here (e.g., logoPosition, logoScale, etc.)
    };

    // Push the new design object to the designs array
    state.designs.push(newDesign);
    console.log(state.designs);
    // Increment the nextDesignId counter for the next design
    state.nextDesignId++;
  }
    // You can add any additional logic or save the designs to a backend here if needed
});

export default state;