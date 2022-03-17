import React from 'react';
import moment from 'moment';
import { Alert, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import placeholder from '../../assets/placeholder.png';
import HorizontalCard from '../HorizontalCard/HorizontalCard';

export default function HorizontalCardWrapper({ selected, data }) {
  const capitalizeTitle = (title) => {
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

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
            // <Box
            //   sx={{
            //     display: 'grid',
            //     gridTemplateColumns: '100px 1fr',
            //     boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
            //     mb: 1,
            //     borderTopRightRadius: 3,
            //     borderBottomRightRadius: 3,
            //   }}
            //   key={
            //     selected === 'Movies'
            //       ? movie.title + index
            //       : selected === 'TV Shows'
            //       ? movie.name + index
            //       : selected === 'Books'
            //       ? movie.volumeInfo.title + index
            //       : movie.profile_path + index
            //   }
            // >
            //   <Link
            //     href={`/${
            //       selected === 'Books'
            //         ? 'book'
            //         : selected === 'People'
            //         ? 'person'
            //         : selected === 'Movies'
            //         ? 'movie'
            //         : 'tv'
            //     }/${
            //       selected === 'Books'
            //         ? movie.primary_isbn10 || movie.id
            //         : movie.id
            //     }`}
            //     component='img'
            //     sx={{
            //       width: 100,
            //       borderTopLeftRadius: 3,
            //       borderBottomLeftRadius: 3,
            //     }}
            //     src={
            //       selected === 'Books'
            //         ? !movie.volumeInfo.imageLinks
            //           ? placeholder
            //           : movie.volumeInfo.imageLinks.thumbnail
            //         : selected === 'People'
            //         ? !movie.profile_path
            //           ? placeholder
            //           : `${baseImgUrl}${movie.profile_path}`
            //         : selected === 'Movies'
            //         ? !movie.poster_path
            //           ? placeholder
            //           : `${baseImgUrl}${movie.poster_path}`
            //         : !movie.poster_path
            //         ? placeholder
            //         : `${baseImgUrl}/${movie.poster_path}`
            //     }
            //     alt={movie.title}
            //   >
            //   </Link>
            //   <Box
            //     sx={{
            //       justifySelf: 'start',
            //       display: 'flex',
            //       flexDirection: 'column',
            //     }}
            //   >
            //     <Typography
            //       variant='body1'
            //       component={'div'}
            //       sx={{
            //         fontWeight: 'bold',
            //         paddingLeft: '0.5rem',
            //         textAlign: 'left',
            //       }}
            //     >
            //       <Link
            //         href={`/${
            //           selected === 'Books'
            //             ? 'book'
            //             : selected === 'People'
            //             ? 'person'
            //             : selected === 'Movies'
            //             ? 'movie'
            //             : 'tv'
            //         }/${
            //           selected === 'Books'
            //             ? movie.primary_isbn10 || movie.id
            //             : movie.id
            //         }`}
            //         variant='inherit'
            //         color='inherit'
            //         underline='none'
            //         sx={{ ':hover': { color: 'primary.main' } }}
            //       >
            //         {selected === 'Movies'
            //           ? capitalizeTitle(movie.title)
            //           : selected === 'TV Shows'
            //           ? capitalizeTitle(movie.name)
            //           : selected === 'People'
            //           ? capitalizeTitle(movie.name)
            //           : capitalizeTitle(movie.volumeInfo.title)}
            //       </Link>
            //     </Typography>
            //     {selected !== 'People' ? (
            //       <Typography
            //         variant={'body2'}
            //         component={'div'}
            //         color='text.secondary'
            //         sx={{
            //           fontWeight: 'bold',
            //           paddingLeft: '0.5rem',
            //           textAlign: 'left',
            //         }}
            //       >
            //         {moment(
            //           selected === 'Movies'
            //             ? movie.release_date
            //             : selected === 'TV Shows'
            //             ? movie.first_air_date
            //             : movie.volumeInfo.publishedDate
            //         ).format('MMM DD, YYYY')}
            //       </Typography>
            //     ) : (
            //       <Typography
            //         variant={'body2'}
            //         component={'div'}
            //         color='text.secondary'
            //         sx={{
            //           fontWeight: 'bold',
            //           paddingLeft: '0.5rem',
            //           textAlign: 'left',
            //         }}
            //       >
            //         {movie.known_for_department}:{' '}
            //         {movie.known_for.length > 0 ? (
            //           <>
            //             {movie.known_for.map((item) => (
            //               <>{item.title}</>
            //             ))}
            //           </>
            //         ) : (
            //           <></>
            //         )}
            //       </Typography>
            //     )}
            //     {selected !== 'People' ? (
            //       <Typography
            //         variant={'body2'}
            //         component={'div'}
            //         color='text.primary'
            //         sx={{
            //           paddingLeft: '0.5rem',
            //           textAlign: 'left',
            //           flexGrow: 1,
            //           display: 'grid',
            //           alignContent: 'end',
            //           pb: 3,
            //         }}
            //       >
            //         {selected !== 'Books'
            //           ? `${movie.overview.substring(0, 150)}...`
            //           : `${
            //               !movie.volumeInfo.description
            //                 ? 'No description available'
            //                 : movie.volumeInfo.description.substring(0, 100) +
            //                   '...'
            //             }`}
            //       </Typography>
            //     ) : (
            //       <></>
            //     )}
            //   </Box>
            // </Box>
          ))}
        </>
      )}
    </>
  );
}
