import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
        { title: 'Popular', link: '/movie/popular' },
        { title: 'Top Rated', link: '/movie/top_rated' },
        { title: 'Latest', link: '/movie/latest' },
        { title: 'Now Playing', link: '/movie/now_playing' },
        { title: 'Upcoming', link: '/movie/upcoming' },
      ],
    },
    {
      main: 'TV Shows',
      links: [
        { title: 'Popular', link: '/tv/popular' },
        { title: 'Top Rated', link: '/tv/top_rated' },
        { title: 'Latest', link: '/movie/latest' },
        { title: 'Airing Today', link: '/movie/airing_today' },
        { title: 'Upcoming', link: '/movie/upcoming' },
      ],
    },
    {
      main: 'Books',
      links: [{ title: 'Best Sellers', link: '/book/best_sellers' }],
    },
  ];

  const authSettings = ['Profile', 'Logout'];
  const nonAuthSettings = ['Sign In', 'Register'];
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

                    <Card className={styles.dropdownContent}>
                      {page.links.map((link) => (
                        <Link
                          href={link.link}
                          //underline='none'
                          //color='inherit'
                          key={link.title}
                        >
                          <Typography>
                            {link.title}
                          </Typography>
                        </Link>
                      ))}
                    </Card>
                  </div>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }} className={styles.dropdown}>
                <AccountCircleIcon
                  sx={{ p: 0 }}
                  fontSize='large'
                ></AccountCircleIcon>
                <Card className={`${styles.dropdownContent} ${styles.profileDropdownContent} `}>
                  {authData.isAuth ? (
                    <>
                      {authSettings.map((setting) => (
                        <Link href={`/${setting}`} key={setting}>
                          <Typography textAlign='center'>{setting}</Typography>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <>
                      {nonAuthSettings.map((setting) => (
                        <Link href={`/${setting.split(' ').join('')}`} key={setting}>
                          <Typography textAlign='center'>{setting}</Typography>
                        </Link>
                      ))}
                    </>
                  )}
                </Card>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
