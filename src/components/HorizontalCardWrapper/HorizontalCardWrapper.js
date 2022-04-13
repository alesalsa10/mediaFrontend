import React from 'react';
import { Alert, Typography } from '@mui/material';
import HorizontalCard from '../HorizontalCard/HorizontalCard';

export default function HorizontalCardWrapper({ selected, data }) {
  console.log(data)
  return (
    <>
      {typeof data[selected] === 'string' ? (
        <Alert severity='error' variant='outlined' p={2}>
          {data[selected]}
        </Alert>
      ) : data[selected].length === 0 ? (
        <Typography sx={{ textAlign: 'left' }}>
          There are no {selected} that match your query
        </Typography>
      ) : (
        <>
          {data[selected].map((movie, index) => (
            <HorizontalCard
              selected={selected}
              movie={movie}
              index={index}
              key={
                selected === 'Movies'
                  ? movie.title + index
                  : selected === 'TV Shows'
                  ? movie.name + index
                  : selected === 'Books'
                  ? movie.volumeInfo.title + index
                  : movie.profile_path + index
              }
            />
            
          ))}
        </>
      )}
    </>
  );
}
