import React, { useRef, useState, useEffect } from 'react';
import { Box, Link, Typography } from '@mui/material';

import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import styles from './Card.module.css';
import 'react-circular-progressbar/dist/styles.css';

import placeholder from '../../assets/placeholder.png';

export default function Card({ mediaType, media, type, bestSellers }) {
  const [width, setWidth] = useState();
  const refElement = useRef();
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
      return `${book.id}-${book.volumeInfo.toLowerCase().split(' ').join('')}`;
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
    if (mediaType === 'movie') {
      return `${media.id}-${media.title.toLowerCase().split(' ').join('-')}`;
    } else {
      return `${media.id}-${media.name.toLowerCase().split(' ').join('-')}`;
    }
  };

  const getListSize = () => {
    const newWidth = refElement.current.clientWidth;
    setWidth(newWidth);
  };

  const handleImageLoad = (event) => {
    setWidth(event.target.clientWidth);
  };


  useEffect(() => {
    window.addEventListener('resize', handleImageLoad);
    window.addEventListener('resize', getListSize);
  }, []);

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        boxShadow: type === 'carousel' ? '' : '0 2px 8px rgb(0 0 0 / 25%)',
      }}
    >
      <Link
        href={`/${
          mediaType === 'book'
            ? 'book'
            : mediaType === 'people'
            ? 'person'
            : mediaType === 'movie'
            ? 'movie'
            : 'tv'
        }/${mediaType === 'book' ? selectBookLink(media) : selectMediaLink()}`}
        sx={{ ':hover': { color: 'primary.main' } }}
        className={styles.cardWrapper}
      >
        <Box
          ref={refElement}
          onLoad={handleImageLoad}
          component='img'
          src={
            mediaType === 'book'
              ? selectImg(media)
              : mediaType === 'people'
              ? !media.profile_path
                ? placeholder
                : `${baseImgUrl}${media.profile_path}`
              : mediaType === 'movie'
              ? !media.poster_path
                ? placeholder
                : `${baseImgUrl}${media.poster_path}`
              : !media.poster_path
              ? placeholder
              : `${baseImgUrl}/${media.poster_path}`
          }
          alt={media.title}
          sx={{
            // width: {
            //   xs: 'auto',
            // },
            // height: {
            //   xs: 200,
            //   sm: 300,
            // },
            width:{
              xs: 130,
              sm: 170
            },
            borderTopRightRadius: '3px',
            borderTopLeftRadius: '3px',
          }}
        />
        {mediaType === 'book' ? (
          <></>
        ) : (
          <>
            {mediaType !== 'people' ? (
              <div className={styles.layer}>
                <CircularProgressbar
                  value={media.vote_average * 10}
                  text={`${parseFloat((media.vote_average * 10).toFixed(1))}`}
                  background
                  backgroundPadding={4}
                  styles={buildStyles({
                    backgroundColor: '#282b29',
                    textColor: '#fff',
                    pathColor:
                      media.vote_average * 10 >= 70
                        ? '#21d07a'
                        : media.vote_average * 10 > 50 &&
                          media.vote_average * 10 < 70
                        ? '#d2d531'
                        : '#d53f31',
                    trailColor: 'transparent',
                    textSize: '30px',
                  })}
                />
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </Link>
      <Box
        sx={{
          px: 0,
          width: width,
          pt: 3,
        }}
      >
        <Typography
          variant='body1'
          component={'div'}
          sx={{ fontWeight: 'bold', paddingLeft: '0.5rem' }}
        >
          <Link
            href={`/${
              mediaType === 'book'
                ? 'book'
                : mediaType === 'person'
                ? 'person'
                : mediaType === 'person'
                ? 'movie'
                : 'tv'
            }/${
              mediaType === 'book' ? selectBookLink(media) : selectMediaLink()
            }`}
            variant='inherit'
            color='inherit'
            underline='none'
            sx={{ ':hover': { color: 'primary.main' } }}
          >
            {mediaType === 'movie' || mediaType === 'book'
              ? capitalizeTitle(media.title)
              : media.name}
          </Link>
        </Typography>
        {mediaType !== 'people' ? (
          <Typography
            variant={'body2'}
            component={'div'}
            color='text.secondary'
            sx={{ fontWeight: 'bold', paddingLeft: '0.5rem' }}
          >
            {moment(
              mediaType === 'movie'
                ? media.release_date
                : mediaType === 'tv'
                ? media.first_air_date
                : media.created_date
            ).format('MMM DD, YYYY')}
          </Typography>
        ) : (
          <></>
        )}
        {mediaType === 'people' ? (
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
            {media.known_for_department}
            <span>&#183;</span>{' '}
            {media.known_for.length > 0 ? (
              <>
                {media.known_for.map((item, index) => (
                  <React.Fragment key={index}>
                    {`${item.title || item.name}${
                      index === media.known_for.length - 1 ? '' : ', '
                    }`}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <></>
            )}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
