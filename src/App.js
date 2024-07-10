import TutorialPage from './pages/TutorialPage.js';
import BoxesPage from './pages/BoxesPage.js';
// import Box from './components/Box.js';
// import Audi from './components/Audis.js';
import FlowFieldPage from './pages/FlowFieldPage.js';
import Link from './components/Link.js';
import Route from './components/Route.js';
import SolarPage from './pages/SolarPage.js';
import Temp from './pages/TempPage.js';

function App() {
  return (
    <div className= 'w-screen bg-orange-200'>
        <div className='h-screen flex justify-center items-center'>
          <Route path='/flowfield'>
            <FlowFieldPage />
          </Route>

          <Route path='/tutorial'>
            <TutorialPage />
          </Route>

          <Route path='/boxes'>
            <BoxesPage />
          </Route>

          <Route path='/solar'>
            <SolarPage />
          </Route>

          <Route path='/temp'>
            <Temp />
          </Route>

        </div>
        <div className='absolute bottom-0 right-0 p-4 '>
          <Link className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-2" to="/flowfield">Flow</Link>
          <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" to="/boxes">Boxes</Link>
          <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" to="/tutorial">Tute</Link>
          <Link className="bg-black hover:bg-grey-800 text-white font-bold py-2 px-4 rounded mr-2" to="/solar">Sol</Link>
          <Link className="bg-white hover:bg-grey-800 text-black font-bold py-2 px-4 rounded mr-2" to="/temp">Temp</Link>
        </div>
    </div>
  );
}

export default App;