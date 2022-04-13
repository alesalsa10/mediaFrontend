import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment';
import placeholder from '../../assets/placeholder.png';
import { Link as RouterLink } from 'react-router-dom';

export default function HorizontalCard({
  selected,
  movie,
  index,
  bestSellers,
}) {
  const baseImgUrl = 'https://image.tmdb.org/t/p/original';
  const capitalizeTitle = (title) => {
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };

  const selectImg = (book) => {
    if (bestSellers) {
      if (!book.book_image) {
        return placeholder;
      } else {
        return book.book_image;
      }
    } else {
      if (!book.volumeInfo.imageLinks) {
        return placeholder;
      } else {
        return book.volumeInfo.imageLinks.thumbnail;
      }
    }
  };

  const selectBookLink = (book) => {
    if (book.id) {
      return `${book.id}-${book.volumeInfo.title.toLowerCase().split(' ').join('-')}`;
    } else if (book.primary_isbn10) {
      return `isbn/${book.primary_isbn10}-${book.title
        .toLowerCase()
        .split(' ')
        .join('-')}`;
    } else {
      return `isbn/${book.primary_isbn13}-${book.title
        .toLowerCase()
        .split(' ')
        .join('-')}`;
    }
  };

  const selectMediaLink = () => {
    if (selected === 'Movies') {
      return `${movie.id}-${movie.title.toLowerCase().split(' ').join('-')}`;
    } else {
      return `${movie.id}-${movie.name.toLowerCase().split(' ').join('-')}`;
    }
  };

  const selectKey = (book, index) => {
    if (bestSellers) {
      return book.primary_isbn10;
    } else {
      return book.volumeInfo.title + index;
    }
  };

  const selectDescription = (book) => {
    if (bestSellers) {
      if (!book.description) {
        return 'No Description Available';
      } else {
        return book.description;
      }
    } else {
      if (!movie.volumeInfo.description) {
        return 'No Description Available';
      } else {
        return movie.volumeInfo.description.substring(0, 100) + '...';
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '100px 1fr',
        boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
        mb: 1,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
      }}
      key={
        selected === 'Movies'
          ? movie.title + index
          : selected === 'TV Shows'
          ? movie.name + index
          : selected === 'Books'
          ? selectKey(movie, index)
          : movie.id + index
      }
    >
      <Link
        component={RouterLink}
        to={`/${
          selected === 'Books'
            ? 'book'
            : selected === 'People'
            ? 'person'
            : selected === 'Movies'
            ? 'movie'
            : 'tv'
        }/${selected === 'Books' ? selectBookLink(movie) : selectMediaLink()}`}
      >
        <Box
          component='img'
          sx={{
            width: 100,
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            height: '100%',
          }}
          src={
            selected === 'Books'
              ? selectImg(movie)
              : selected === 'People'
              ? !movie.profile_path
                ? placeholder
                : `${baseImgUrl}${movie.profile_path}`
              : selected === 'Movies'
              ? !movie.poster_path
                ? placeholder
                : `${baseImgUrl}${movie.poster_path}`
              : !movie.poster_path
              ? placeholder
              : `${baseImgUrl}/${movie.poster_path}`
          }
          alt={movie.title || movie.name}
        />
      </Link>
      <Box
        sx={{
          justifySelf: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
        }}
      >
        <Typography
          variant='body1'
          component={'div'}
          sx={{
            fontWeight: 'bold',
            px: '0.5rem',
            textAlign: 'left',
          }}
        >
          <Link
            component={RouterLink}
            to={`/${
              selected === 'Books'
                ? 'book'
                : selected === 'People'
                ? 'person'
                : selected === 'Movies'
                ? 'movie'
                : 'tv'
            }/${
              selected === 'Books' ? selectBookLink(movie) : selectMediaLink()
            }`}
            variant='inherit'
            color='inherit'
            underline='none'
            sx={{ ':hover': { color: 'primary.main' } }}
          >
            {selected === 'Movies'
              ? capitalizeTitle(movie.title)
              : selected === 'TV Shows'
              ? capitalizeTitle(movie.name)
              : selected === 'People'
              ? capitalizeTitle(movie.name)
              : capitalizeTitle(
                  movie.title ? movie.title : movie.volumeInfo.title
                )}
          </Link>
        </Typography>
        {selected !== 'People' ? (
          <Typography
            variant={'body2'}
            component={'div'}
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              px: '0.5rem',
              textAlign: 'left',
            }}
          >
            {moment(
              selected === 'Movies'
                ? movie.release_date
                : selected === 'TV Shows'
                ? movie.first_air_date
                : bestSellers
                ? movie.created_date
                : movie.volumeInfo.publishedDate
            ).format('MMM DD, YYYY')}
          </Typography>
        ) : (
          <Typography
            variant={'body2'}
            component={'div'}
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              px: '0.5rem',
              textAlign: 'left',
            }}
          >
            {movie.known_for_department}
            <span>&#183;</span>{' '}
            {movie.known_for.length > 0 ? (
              <>
                {movie.known_for.map((item, index) => (
                  <Box
                    component={'span'}
                    sx={{ flexGrow: '1', flexShrink: '1', flexBasis: '0' }}
                    key={index}
                  >
                    {`${item.title || item.name}${
                      index === movie.known_for.length - 1 ? '' : ', '
                    }`}
                  </Box>
                ))}
              </>
            ) : (
              <></>
            )}
          </Typography>
        )}
        {selected !== 'People' ? (
          <Typography
            variant={'body2'}
            component={'div'}
            color='text.primary'
            sx={{
              px: '0.5rem',
              textAlign: 'left',
              flexGrow: 1,
              display: 'grid',
              alignContent: 'end',
              //pb: 3,
            }}
          >
            {selected !== 'Books'
              ? `${movie.overview.substring(0, 150)}...`
              : selectDescription(movie)}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
