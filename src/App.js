import React, { Fragment } from 'react';
//import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin/Signin';
import Register from './components/auth/Register/Register';
import ForgotPassword from './components/auth/ForgotPassword/ForgotPassword';
import ViewForgotPassword from './components/auth/ViewForgotPassword/ViewForgotPassword';
import VerifyEmail from './components/auth/VerifyEmail/VerifyEmail';
import Home from './views/Home/Home';
import WithoutNav from './components/Navigation/WithoutNav';
import WithNav from './components/Navigation/WithNav';
import Media from './views/Media/Media';
import List from './views/List/List';

function App() {
  return (
    <>
      <Router>
        <Fragment>
          <Routes>
            <Route element={<WithoutNav />}>
              <Route path='/signin' element={<Signin />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgotPassword' element={<ForgotPassword />} />
              <Route
                path='/forgotPassword/:token'
                element={<ViewForgotPassword />}
              />
              <Route path='/verify/:token' element={<VerifyEmail />} />
            </Route>
            <Route element={<WithNav />}>
              {/* <Route path='/home' element={<Home />} /> */}
              <Route path='/' element={<Home />} />
              {/* <Route path={`/:mediaType/:id`} element={<Media />} /> */}
              <Route path={`/:mediaType/:listType`} element={<List/>}/>
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </>
  );
}

export default App;
