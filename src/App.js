import './App.css';
import SignUp from './components/SignUp';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route exact path="/signUp">
          <SignUp/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
