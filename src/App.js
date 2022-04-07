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
import SearchResults from './views/SearchResults/SearchResults';
import FullCast from './views/FullCast/FullCast';
import Season from './views/Season/Season';
import Person from './views/Person/Person';
import User from './views/User/User';
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
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<SearchResults />} />
              <Route path={`/:mediaType/lists/:listType`} element={<List />} />

              <Route  path='/person/:id' element={<Person/>}/>
              <Route path='/user/:id' element={<User/>}/>

              <Route path='/:mediaType/:id' element={<Media />} />
              <Route path='/:mediaType/isbn/:id' element={<Media />} />

              <Route
                path='/tv/:id/seasons/:seasonNumber'
                element={<Season />}
              />
              <Route
                path='/tv/:id/seasons/:seasonNumber/episodes/:episodeNumber'
                element={<Season />}
              />

              <Route path='/:mediaType/:id/full_cast' element={<FullCast />} />
              <Route
                path='/tv/:id/seasons/:seasonNumber/full_cast'
                element={<FullCast />}
              />
              <Route
                path='/tv/:id/seasons/:seasonNumber/episodes/:episodeNumber/full_cast'
                element={<FullCast />}
              />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </>
  );
}

export default App;
