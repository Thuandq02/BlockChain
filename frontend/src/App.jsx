import './App.css';
import CreateToken from './components/CreateToken';
import CheckBalance from './components/CheckBalance';
import SwapToken from './components/SwapToken';
import UpdatePrice from './components/UpdatePrice';

function App() {
  return (
    <div className="App">
      <h1>Quản lý Token</h1>
      <CreateToken />
      <SwapToken />
      <UpdatePrice />
    </div>
  );
}

export default App
