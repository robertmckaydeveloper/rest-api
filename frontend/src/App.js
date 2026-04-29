import './App.css';
import { useAuth } from './auth/KeycloakProvider';
import CustomerPage from './pages/CustomerPage';
import LandingPage from './pages/LandingPage';

function App() {
  const { authenticated } = useAuth();

  return (
    <div className="App">
      {authenticated ? <CustomerPage /> : <LandingPage />}
    </div>
  );
}

export default App;
