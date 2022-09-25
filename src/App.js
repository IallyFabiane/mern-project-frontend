import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auto-context';

const App = () => {
  const [isLoggedIn, setIsLoggedin] = useState(false);

  const login = useCallback(() => {
    setIsLoggedin(true)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedin(false)
  }, []);

  let routes;

  if(isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
            <UserPlaces />
        </Route>
        <Route path="/:userId/places" exact>
              <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
              <NewPlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
            <UserPlaces />
        </Route>
        <Route path="/auth">
              <Auth/>
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
