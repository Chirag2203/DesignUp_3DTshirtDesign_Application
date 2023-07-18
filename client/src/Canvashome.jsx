import React from 'react';
import Canvas from './canvas';
import Home from './pages/Home';

function CanvasHome({handleClick}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'col' }}>
      <Home handleClick={handleClick} />
      <Canvas />
    </div>
  );
}

export default CanvasHome;
