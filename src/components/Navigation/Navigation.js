import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
//import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Slide from '@mui/material/Slide';
import { Avatar, Card, useScrollTrigger } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Navigation.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../assets/logo.svg';
import ModeNightOutlinedIcon from '@mui/icons-material/ModeNightOutlined';
import Switch from '@mui/material/Switch';
import { toggleTheme } from '../../features/themeSlice';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import { green } from '@mui/material/colors';
import { Alert, CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import api from '../../services/api';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={'down'} in={!trigger}>
      {children}
    </Slide>
  );
};

export default function Navigation() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme);
  const [authSettings, setAuthSettings] = useState();
  const [state, setState] = useState({
    error: null,
    response: null,
    loading: false,
  });
  const [selfInfo, setSelfInfo] = useState({
    error: null,
    response: null,
    loading: false,
  });

  const pages2 = [
    {
      main: 'Movies',
      links: [
        { title: 'Popular', link: '/movie/lists/popular' },
        { title: 'Top Rated', link: '/movie/lists/top_rated' },
        { title: 'Now Playing', link: '/movie/lists/now_playing' },
        { title: 'Upcoming', link: '/movie/lists/upcoming' },
      ],
    },
    {
      main: 'TV Shows',
      links: [
        { title: 'Popular', link: '/tv/lists/popular' },
        { title: 'Top Rated', link: '/tv/lists/top_rated' },
        { title: 'Airing Today', link: '/tv/lists/airing_today' },
        { title: 'On TV', link: '/tv/lists/on_the_air' },
      ],
    },
    {
      main: 'Books',
      links: [{ title: 'Best Sellers', link: '/book/lists/best_sellers' }],
    },
    {
      main: 'People',
      links: [{ title: 'Popular People', link: '/people/lists/popular' }],
    },
  ];

  const getSelf = async () => {
    try {
      const response = await api.get(`users/self`, {
        headers: {
          Authorization: `Token ${authData.accessToken}`,
        },
      });
      console.log(response.data);
      setSelfInfo({
        response: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setSelfInfo({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    if (authData.isAuth && !authData.user) {
      getSelf();
    }
  }, [authData.isAuth, authData.user]);

  useEffect(() => {
    if (authData.isAuth && selfInfo.response) {
      const authLinks = [
        { title: 'Profile', link: `/user/${selfInfo.response.username}` },
        { title: 'Favorites', link: `/favorites` },
        { title: 'User Settings', link: '/settings' },
        { title: 'Signout', link: `signout` },
      ];
      setAuthSettings(authLinks);
    }
  }, [authData, selfInfo.response]);

  const nonAuthSettings = ['Sign In', 'Register'];
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleThemeChange = (e) => {
    dispatch(toggleTheme());
  };

  const resendEmail = async () => {
    console.log('clicked');
    setState({ loading: true, response: null, error: null });
    try {
      const response = await axios.post(
        `${baseURL}3000/auth/verify/resendEmail`,
        {
          email: authData.user.email,
        }
      );
      console.log(response.data);
      setState({
        error: null,
        response: 'Email successfully sent',
        loading: false,
      });
    } catch (err) {
      console.log(err.response.data.Msg);
      setState({
        error: err.response.data.Msg,
        response: null,
        loading: false,
      });
    }
  };

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Link
                component={RouterLink}
                to='/'
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                <img src={logo} alt='TMDB Logo' width={140} />
              </Link>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  id='menu-appbar'
                  keepMounted
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    bgcolor: 'background.paper',
                  }}
                >
                  {pages2.map((page) => (
                    <Accordion key={page.main}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography>{page.main}</Typography>
                      </AccordionSummary>
                      {page.links.map((link) => (
                        <AccordionDetails key={link.link}>
                          <Link
                            component={RouterLink}
                            to={link.link}
                            color='inherit'
                            underline='none'
                            onClick={handleCloseNavMenu}
                          >
                            {link.title}
                          </Link>
                        </AccordionDetails>
                      ))}
                    </Accordion>
                  ))}
                </Drawer>
              </Box>
              <Link
                component={RouterLink}
                to='/'
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                <img src={logo} alt='TMDB Logo' width={140} />
              </Link>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', md: 'flex' },
                  position: 'relative',
                }}
              >
                {pages2.map((page, index) => (
                  <div key={index} className={styles.dropdown}>
                    <Button
                      id={`menuButton${index}`}
                      variant='text'
                      color='inherit'
                    >
                      {page.main}
                    </Button>

                    <Card
                      className={styles.dropdownContent}
                      sx={{
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                      }}
                    >
                      {page.links.map((link) => (
                        <Link
                          component={RouterLink}
                          to={link.link}
                          key={link.title}
                          sx={{
                            color: 'text.primary',
                            ':hover': { bgcolor: 'divider' },
                          }}
                        >
                          <Typography>{link.title}</Typography>
                        </Link>
                      ))}
                    </Card>
                  </div>
                ))}
              </Box>
              <Box
                sx={{ flexGrow: 0, color: 'text.primary' }}
                className={styles.dropdown}
              >
                {authData.isAuth &&
                selfInfo.response &&
                selfInfo.response ? (
                  <Avatar sx={{ bgcolor: green[600], color: 'text.primary' }}>
                    {selfInfo.response.name.charAt(0)}
                  </Avatar>
                ) : (
                  <AccountCircleIcon
                    sx={{ p: 0, color: 'white' }}
                    fontSize='large'
                  ></AccountCircleIcon>
                )}
                <Card
                  className={`${styles.dropdownContent} ${styles.profileDropdownContent} `}
                  sx={{ width: 'max-content' }}
                >
                  {authData.isAuth &&
                  authSettings &&
                  selfInfo.response ? (
                    <>
                      {authSettings.map((link) => (
                        <Link
                          component={RouterLink}
                          to={link.link}
                          key={link.link}
                          sx={{
                            color: 'text.primary',
                            ':hover': { bgcolor: 'divider' },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            {/* <AccountCircleIcon fontSize='small' sx={{mr:1}}/> */}
                            {link.title === 'Profile' ? (
                              <AccountCircleIcon
                                fontSize='small'
                                sx={{ mr: 1 }}
                              />
                            ) : link.title === 'Favorites' ? (
                              <FavoriteRoundedIcon
                                fontSize='small'
                                sx={{ mr: 1 }}
                              />
                            ) : link.title === 'User Settings' ? (
                              <SettingsRoundedIcon
                                fontSize='small'
                                sx={{ mr: 1 }}
                              />
                            ) : (
                              <LogoutRoundedIcon
                                fontSize='small'
                                sx={{ mr: 1 }}
                              />
                            )}
                            <Typography textAlign='center'>
                              {link.title}
                            </Typography>
                          </Box>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {nonAuthSettings.map((setting) => (
                        <Link
                          component={RouterLink}
                          to={`/${setting.split(' ').join('')}`}
                          key={setting}
                          sx={{
                            color: 'text.primary',
                            ':hover': { bgcolor: 'divider' },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            {setting === 'Register' ? (
                              <AppRegistrationRoundedIcon
                                fontSize='small'
                                sx={{ mx: 1 }}
                              />
                            ) : (
                              <LoginRoundedIcon
                                fontSize='small'
                                sx={{ mx: 1 }}
                              />
                            )}
                            <Typography textAlign='center'>
                              {setting}
                            </Typography>
                          </Box>
                        </Link>
                      ))}
                    </>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ModeNightOutlinedIcon />
                    <Typography varaint='body1'>Dark Mode</Typography>
                    <Switch
                      checked={!theme.isLight}
                      onChange={handleThemeChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </Box>
                </Card>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {authData.isAuth &&
      selfInfo &&
      selfInfo.response &&
      selfInfo.response.foundUser &&
      !selfInfo.response.foundUser.isVerified ? (
        <Alert severity='warning' variant='outlined' sx={{ p: 2, m: 2 }}>
          An email has been sent to you to verify your account. Without
          verification, you will have limited access. If you did not received
          one, click{' '}
          <span
            style={{ fontWeight: 550, cursor: 'pointer' }}
            onClick={resendEmail}
          >
            here
          </span>{' '}
          to send a new one.
          {state.response ? (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.5rem',
              }}
            >
              {state.response}
            </p>
          ) : state.loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.5rem',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '0.5rem',
              }}
            >
              {state.error}
            </p>
          )}
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
}
