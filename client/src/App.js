import { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import { theme } from './themes/theme';
import SignIn from './pages/SignIn'; 
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Friends from './pages/Friends';
import Opinions from './pages/Opinions';
import Profile from './pages/Profile';
import PollsForReview from './pages/PollsForReview';
import PublicProfile from './pages/PublicProfile';
import UserContext from './context/UserContext';

import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [reload, setReload] = useState(true);

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
  }, [reload]);

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <UserContext.Provider value={{ userData, setUserData, reload, setReload}}>
          <Switch>
              <Route exact path='/'>
                <SignIn />
              </Route>
              <Route exact path='/signup'>
                <SignUp />
              </Route>
              <Route exact path='/dashboard'>
                <Dashboard />
              </Route>
              <Route exact path='/friends'>
                <Friends />
              </Route>
              <Route exact path='/review'>
                <PollsForReview />
              </Route>
              <Route exact path='/opinions'>
                <Opinions />
              </Route>
              <Route exact path='/profile'>
                <Profile />
              </Route>
              <Route exact path='/:userId/profile'>
                <PublicProfile />
              </Route>
            </Switch>
          </UserContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
