import './App.css';
import CreateToken from './components/CreateToken';
import BuySell from './components/BuySell';
import ListToken from './components/ListToken';

function App() {
  return (
    <div className="App">
      <h1>Quản lý Token</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div className='acction'>
        <CreateToken />
        <BuySell />
      </div>
      <div className='list'>
        <ListToken />
      </div>
      </div>
      
    </div>
  );
}

export default App
