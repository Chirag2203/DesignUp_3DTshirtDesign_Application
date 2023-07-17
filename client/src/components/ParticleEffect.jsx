import React from 'react';
// import './ParticleEffect.css'; // Create a new CSS file for the particle effect styles

const ParticleEffect = () => {
  return (
    <div className="particle-container">
      {/* You can use multiple div elements with a particle class to create more particles */}
      <div className="particle z-50"></div>
      <div className="particle z-50 ml-10"></div>
      <div className="particle z-50"></div>
      <div className="particle z-50"></div>
      <div className="particle z-50"></div>
      <div className="particle z-50"></div>
      <div className="particle z-50"></div>
    </div>
  );
};

export default ParticleEffect;
