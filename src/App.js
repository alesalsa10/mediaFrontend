import React, { Fragment } from 'react';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin/Signin';
import Register from './components/auth/Register/Register';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import ViewForgotPassword from './components/auth/ViewForgotPassword/ViewForgotPassword';
import VerifyEmail from './components/auth/VerifyEmail/VerifyEmail';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <>
      <Router>
        <Fragment>
          <Navigation />
          <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/forgotPassword/:token' element={<ViewForgotPassword />} />
            <Route path='/verify/:token' element={<VerifyEmail/>}  />
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Fragment>
      </Router>
    </>
  );
}

export default App;
