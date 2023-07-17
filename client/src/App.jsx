import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
// import { BrowserRouter as Router, Route, } from 'react-router-dom';


function App() {
  return (
    <main >
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className="app transition-all ease-in ">
      <Home />
      <Canvas />
      <Customizer />
      </div>
    </main>
  )
}

export default App
