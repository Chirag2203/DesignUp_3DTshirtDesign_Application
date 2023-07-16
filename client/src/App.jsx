import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

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
