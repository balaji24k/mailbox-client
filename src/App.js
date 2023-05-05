import './App.css';
import SignUp from './components/SignUp';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import { useSelector } from 'react-redux';
import NavbarDetails from "./components/NavBar";
import ComposeEmail from "./components/ComposeEmail";
import Inbox from "./components/Inbox";
import Sent from './components/Sentbox';


function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className='App'>
      <NavbarDetails />
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signUp">
          <SignUp/>
        </Route>
        <Route exact path="/composemail">
          {isAuthenticated && <ComposeEmail />}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
        <Route path="/inbox">
          {isAuthenticated && <Inbox />}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
        <Route exact path="/">
          {isAuthenticated && <Redirect to="/inbox" />}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
        <Route path="/sentbox">
          {isAuthenticated && <Sent/>}
          {!isAuthenticated && <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
