import React from 'react';
import { CardContent, CardMedia, Link, Typography } from '@mui/material';

import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import styles from './Card.module.css';
import 'react-circular-progressbar/dist/styles.css';


export default function Card({ mediaType, media }) {

  const capitalizeTitle = (title) =>{
    const arr = title.split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ')
  }

  return (
    <>
      <Link
        href={`/${mediaType}/${
          mediaType === 'book' ? media.primary_isbn10 : media.id
        }`}
        className={styles.cardWrapper}
      >
        <CardMedia
          component='img'
          src={
            mediaType === 'book'
              ? media.book_image
              : `https://image.tmdb.org/t/p/original/${media.poster_path}`
          }
          alt={media.title}
          sx={{ width: 200 }}
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
            href={`/${mediaType}/${
              mediaType === 'book' ? media.primary_isbn10 : media.id
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
    </>
  );
}
