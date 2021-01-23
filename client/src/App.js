import { useState, useEffect } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { theme } from "./themes/theme";
import SignIn from './pages/SignIn'; 
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import UserContext from './context/UserContext';

import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    polls: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await axios.post(
        'http://localhost:5000/users/tokenIsValid',
        null,
        { headers: { 'x-auth-token': token } },
      );

      if (tokenRes.data) {
        const userRes = await axios.get(
          'http://localhost:5000/users/',
          { headers: { 'x-auth-token': token } },
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Switch>
              <Route exact path='/'>
                <SignIn />
              </Route>
              <Route exact path='/signup'>
                <SignUp />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Route exact path='/friends'>
                <Friends />
              </Route>
            </Switch>
          </UserContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
