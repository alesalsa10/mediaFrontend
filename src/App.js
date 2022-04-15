import React, { Fragment } from 'react';
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
import SearchResults from './views/SearchResults/SearchResults';
import FullCast from './views/FullCast/FullCast';
import Person from './views/Person/Person';
import User from './views/User/User';
import PrivateRoutes from './components/PriivateRoutes/PrivateRoutes';
import Favorites from './views/Favorites/Favorites';
import ListWrapper from './views/ListWrapper/ListWrapper';
import SeasonEpisodeWrapper from './views/SeasonEpisodeWrapper/SeasonEpisodeWrapper';
import Settings from './views/Settings/Settings';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';


function App() {
  const theme = useSelector((state) => state.theme);

  const myTheme = createTheme({
    palette: {
      mode: theme.isLight ? 'light': 'dark',
    },
  });

  return (
    <ThemeProvider theme={myTheme}>
      <div style={{ backgroundColor: theme.isLight ? '': 'rgba(3,3,3,255)' }}>
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

                <Route element={<PrivateRoutes />}>
                  <Route path='/favorites' element={<Favorites />} />
                  <Route path='/settings' element={<Settings />} />
                </Route>

                <Route
                  path={`/:mediaType/lists/:listType`}
                  element={<ListWrapper />}
                />

                <Route path='/person/:id' element={<Person />} />
                <Route path='/user/:username' element={<User />} />

                <Route path='/:mediaType/:id' element={<Media />} />
                <Route path='/:mediaType/isbn/:id' element={<Media />} />

                <Route
                  path='/tv/:id/seasons/:seasonNumber'
                  element={<SeasonEpisodeWrapper />}
                />
                <Route
                  path='/tv/:id/seasons/:seasonNumber/episodes/:episodeNumber'
                  element={<SeasonEpisodeWrapper />}
                />

                <Route
                  path='/:mediaType/:id/full_cast'
                  element={<FullCast />}
                />
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
      </div>
    </ThemeProvider>
  );
}

export default App;
