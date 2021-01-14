import { useState } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { theme } from "./themes/theme";
import SignIn from './pages/SignIn'; 
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import UserContext from './context/UserContext';

import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

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
            </Switch>
          </UserContext.Provider>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
