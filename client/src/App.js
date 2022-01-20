import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Client Page
        </p>
        <a href="/auth/google">Sign In With Google</a>
        <button type="button">Sign In With Google</button>
      </header>
    </div>
  );
}

export default App;
