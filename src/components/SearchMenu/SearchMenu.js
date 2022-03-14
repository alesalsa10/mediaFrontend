import {
    Box,
  List as MaterialList,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

export default function SearchMenu() {
  const [selected, setSelected] = useState('Movies');
  const handleChangeTab = (value) => {
      //this will come from the parent in the future
    setSelected(value);
  };
  return (
    <Box sx={{ m: 2 }}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          p: 2,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'start',
        }}
      >
        <Typography>Search Results</Typography>
      </Box>
      <MaterialList component='nav' aria-label='secondary mailbox folder'>
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
      </MaterialList>
    </Box>
  );
}
