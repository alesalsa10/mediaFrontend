import React from 'react';
import moment from 'moment';
import { Alert, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function HorizontalCard({ selected, data }) {
  const capitalizeTitle = (title) => {
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };
  return (
    <>
      {typeof data[selected] === 'string' ? (
        <Alert severity='error' variant='outlined' p={2}>
          {data[selected]}
        </Alert>
      ) : data[selected].lenght === 0 ? (
        <div>nothing here</div>
      ) : (
        <>
          {data[selected].map((movie, index) => (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '100px 1fr',
                boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                my: 1,
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
              }}
              key={
                selected === 'Movies' || selected === 'Books'
                  ? movie.title + index
                  : movie.name + index
              }
            >
              <Box
                component='img'
                sx={{
                  width: 100,
                  borderTopLeftRadius: 3,
                  borderBottomLeftRadius: 3,
                }}
                src={
                  selected === 'Books'
                    ? movie.volumeInfo.imageLinks.thumbnail
                    : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                }
                alt={movie.title}
              ></Box>
              <Box
                sx={{
                  justifySelf: 'start',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant='body1'
                  component={'div'}
                  sx={{
                    fontWeight: 'bold',
                    paddingLeft: '0.5rem',
                    textAlign: 'left',
                  }}
                >
                  <Link
                    href={`/${'movie'}/${
                      selected === 'Books' ? movie.primary_isbn10 : movie.id
                    }`}
                    variant='inherit'
                    color='inherit'
                    underline='none'
                    sx={{ ':hover': { color: 'primary.main' } }}
                  >
                    {/* {selected === 'Movies' || selected === 'Books'
                      ? capitalizeTitle(movie.title)
                      : movie.name} */}
                    {selected === 'Movies'
                      ? capitalizeTitle(movie.title)
                      : selected === 'TV Shows'
                      ? capitalizeTitle(movie.name)
                      : capitalizeTitle(movie.volumeInfo.title)}
                  </Link>
                </Typography>
                <Typography
                  variant={'body2'}
                  component={'div'}
                  color='text.secondary'
                  sx={{
                    fontWeight: 'bold',
                    paddingLeft: '0.5rem',
                    textAlign: 'left',
                  }}
                >
                  {moment(
                    selected === 'Movies'
                      ? movie.release_date
                      : selected === 'TV Shows'
                      ? movie.first_air_date
                      : movie.volumeInfo.publishedDate
                  ).format('MMM DD, YYYY')}
                </Typography>
                <Typography
                  variant={'body2'}
                  component={'div'}
                  color='text.primary'
                  sx={{
                    paddingLeft: '0.5rem',
                    textAlign: 'left',
                    flexGrow: 1,
                    display: 'grid',
                    alignContent: 'end',
                    pb: 3,
                  }}
                >
                  {}
                  {selected !== 'Books'
                    ? `${movie.overview.substring(0, 150)}...`
                    : `${
                        !movie.volumeInfo.description
                          ? 'No description available'
                          : movie.volumeInfo.description.substring(0, 100) + '...'
                      }`}
                </Typography>
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );
}
