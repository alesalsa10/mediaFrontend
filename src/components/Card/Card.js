import React from 'react';
import { Box, CardContent, CardMedia, Link, Typography } from '@mui/material';

import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import styles from './Card.module.css';
import 'react-circular-progressbar/dist/styles.css';

import placeholder from '../../assets/placeholder.png';

export default function Card({ mediaType, media, type }) {
  const capitalizeTitle = (title) => {
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
  };

  const baseImgUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <Box
      sx={{
        // display: 'flex',
        // justifyContent: 'space-between',
        // flexDirection: 'column',
        // boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
        display: type !== 'lists' ? 'flex' : '',
        justifyContent: type !== 'lists' ? 'space-between' : '',
        flexDirection: type !== 'lists' ? 'column' : '',
        boxShadow: type !== 'lists' ? '' : '0 2px 8px rgb(0 0 0 / 25%)',
        width: type !== 'lists' ? '' : 'fit-content',
        height: type !== 'lists' ? '' : 'auto',
      }}
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
          mediaType === 'book' ? media.primary_isbn10 || media.id : media.id
        }`}
        variant='inherit'
        color='inherit'
        underline='none'
        sx={{ ':hover': { color: 'primary.main' } }}
        className={styles.cardWrapper}
      >
        <CardMedia
          component='img'
          src={
            mediaType === 'book'
              ? !media.book_image
                ? placeholder
                : media.book_image
              : mediaType === 'person'
              ? !media.profile_path
                ? placeholder
                : `${baseImgUrl}/${media.profile_path}`
              : mediaType === 'movie'
              ? !media.poster_path
                ? placeholder
                : `${baseImgUrl}/${media.poster_path}`
              : !media.poster_path
              ? placeholder
              : `${baseImgUrl}/${media.poster_path}`
          }
          alt={media.title}
          sx={{
            //height: type !== 'lists' ? 'auto' : '20%',
            width: type !== 'lists' ? 200 : '100%',
            height: { xs: '300px', sm: 'auto' },
          }}
        />
        {mediaType === 'book' ? (
          <></>
        ) : (
          <div className={styles.layer}>
            <CircularProgressbar
              value={media.vote_average * 10}
              text={`${media.vote_average * 10}%`}
              background
              backgroundPadding={6}
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
        )}
      </Link>
      <CardContent
        sx={{
          px: 0,
          width: 200,
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
              mediaType === 'book' ? media.primary_isbn10 || media.id : media.id
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
      </CardContent>
    </Box>
  );
}
