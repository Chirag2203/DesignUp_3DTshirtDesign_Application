import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';

import CanvasHome from './Canvashome';
// function CanvasHome() {
//   return (
//     <React.Fragment>
//       {/* <Home /> */}
//       <Canvas />
//     </React.Fragment>
//   );
// }

const handleClick = () => { 
  const navigate = useNavigate(); // Create a useHistory instance
  navigate('/Profile'); // Push the new route to history
  };

function App() {
  return (
    <ThemeProvider>
    <main>
      <Router>
      <div className='main'>
        <div className='gradient' />
      </div>
        <Routes className='app transition-all ease-in'>
          {/* <Route path='/Canvas' element={<Canvas />} /> */}
          <Route path='/' element={<CanvasHome handleClick={handleClick}/>} />
          <Route path='/Profile' element={<Profile />} />
        </Routes>
        <Customizer />
      </Router>
    </main>
    </ThemeProvider>
  );
}

export default App;
