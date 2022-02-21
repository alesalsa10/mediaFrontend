import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import Drawer from '@mui/material/Drawer';
import Slide from '@mui/material/Slide';
import { Card, useScrollTrigger } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Navigation.module.css';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'down'} in={!trigger}>
      {children}
    </Slide>
  );
};

export default function Navigation() {
  const authData = useSelector((state) => state.auth);


  const pages2 = [
    {
      main: 'Movies',
      links: [
        { title: 'Popular movie', link: '/movie/popular' },
        { title: 'Trending', link: '/movie/trending' },
      ],
    },
    {
      main: 'TV Shows',
      links: [
        { title: 'Popular Tv', link: '/tv/popular' },
        { title: 'Trending', link: '/tv/trending' },
      ],
    },
    {
      main: 'Books',
      links: [
        { title: 'Popular book', link: '/book/popular' },
        { title: 'Trending', link: '/book/trending' },
      ],
    },
  ];

  const authSettings = ['Profile', 'Logout'];
  const nonAuthSettings = ['Sign In', 'Register'];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                LOGO
              </Typography>

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
                            href={link.link}
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
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                LOGO
              </Typography>
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

                    <div className={styles.dropdownContent}>
                      <Card>
                        {page.links.map((link) => (
                          <Link
                            href={link.link}
                            underline='none'
                            color='inherit'
                            key={link.title}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </Card>
                    </div>
                  </div>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt='Remy Sharp'
                      src='/static/images/avatar/2.jpg'
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {authData.isAuth ? (
                    <div>
                      {authSettings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Link href={`/${setting}`}>
                            <Typography textAlign='center'>
                              {setting}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {nonAuthSettings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Link href={`/${setting.split(' ').join('')}`}>
                            <Typography textAlign='center'>
                              {setting}
                            </Typography>
                          </Link>
                        </MenuItem>
                      ))}
                    </div>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
