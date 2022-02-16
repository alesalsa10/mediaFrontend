import React, { Fragment } from 'react';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Fragment>
      </Router>
    </>
  );
}

export default App;
