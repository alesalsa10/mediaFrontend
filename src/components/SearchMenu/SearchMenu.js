import {
  Box,
  List as MaterialList,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

export default function SearchMenu({ selected, handleChangeTab }) {
  return (
    <Box sx={{}}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          p: { xs: 0.5, md: 2 },
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'start',
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          borderColor: 'text.secondary',
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      >
        <Typography variant='h6' component={'div'} sx={{ color: 'white' }}>
          Search Results
        </Typography>
      </Box>
      <MaterialList
        component='nav'
        aria-label='secondary mailbox folder'
        sx={{
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          borderColor: 'text.secondary',
          borderWidth: 1,
          borderStyle: 'solid',
          display: 'flex',
          flexDirection: {
            xs: 'row',
            md: 'column',
          },
          p: { xs: 0.5, md: 2 },
          backgroundColor: 'background.paper',
          color: 'text.primary'
        }}
      >
        <ListItemButton
          selected={selected === 'Movies'}
          onClick={() => handleChangeTab('Movies')}
        >
          <ListItemText primary='Movies' />
        </ListItemButton>
        <ListItemButton
          selected={selected === 'TV Shows'}
          onClick={() => handleChangeTab('TV Shows')}
        >
          <ListItemText primary='TV Shows' />
        </ListItemButton>
        <ListItemButton
          selected={selected === 'Books'}
          onClick={() => handleChangeTab('Books')}
        >
          <ListItemText primary='Books' />
        </ListItemButton>
        <ListItemButton
          selected={selected === 'People'}
          onClick={() => handleChangeTab('People')}
        >
          <ListItemText primary='People' />
        </ListItemButton>
      </MaterialList>
    </Box>
  );
}
