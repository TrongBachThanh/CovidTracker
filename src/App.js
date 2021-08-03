import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import GlobalLoading from './components/GlobalLoading';
import News from './pages/News';
import AuthRoute from './HOC/AuthRoute';
import PrivateRoute from './HOC/PrivateRoute';

import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetailCountry from './pages/DetailCountry';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={News} />
        <Route exact path="/signup" component={Register} />
        <AuthRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/global" component={Dashboard} />
        <PrivateRoute exact path="/countries/:countryName" component={DetailCountry} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <GlobalLoading />
    </BrowserRouter>
  );
}

export default App;
