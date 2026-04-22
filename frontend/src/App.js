import './App.css';
import CustomerList from './components/CustomerList';
import keycloak from './config/Keycloak';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#282c34', color: 'white' }}>
        <span>Logged in as: <strong>{keycloak.tokenParsed?.preferred_username}</strong></span>
        <button onClick={() => keycloak.logout()} style={{ cursor: 'pointer' }}>Logout</button>
      </header>
      
      <main>
        <CustomerList />
      </main>
      </header>
    </div>
  );
}

export default App;
