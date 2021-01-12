import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { theme } from "./themes/theme";
import SignIn from './pages/SignIn'; 
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
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
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
