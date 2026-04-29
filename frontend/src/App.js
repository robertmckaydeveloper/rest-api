import './App.css';
import CustomerList from './components/CustomerList';
import keycloak from './auth/keycloak';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#282c34', color: '#f4f4f4' }}>
        <span>Logged in as: <strong>{keycloak.tokenParsed?.preferred_username}</strong></span>
        <button onClick={() => keycloak.logout()} style={{ cursor: 'pointer', marginInlineStart: '1rem' }}>Logout</button>
      </header>
      
      <main>
        <CustomerList />
      </main>
      </header>
    </div>
  );
}

export default App;
