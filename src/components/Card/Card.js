import React from 'react';
import { Box, CardContent, CardMedia, Link, Typography } from '@mui/material';

import moment from 'moment';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

import styles from './Card.module.css';
import 'react-circular-progressbar/dist/styles.css';

import placeholder from '../../assets/placeholder.png';

export default function Card({ mediaType, media, type, bestSellers }) {
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
        }/${
          mediaType === 'book' ? media.primary_isbn10 || media.id : media.id
        }`}
        sx={{ ':hover': { color: 'primary.main' } }}
        className={styles.cardWrapper}
      >
        <CardMedia
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
            // width: type !== 'lists' ? 200 : '100%',
            // height: { xs: '300px', sm: 'auto' },
            width: {
              xs: type === 'carousel' ? '100%' : '100%',
            },
            height: {
              xs: type === 'carousel' ? 300 : 'auto',
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
            ) : (
              <></>
            )}
          </>
        )}
      </Link>
      <CardContent
        sx={{
          px: 0,
          //width: 200,
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
                  <React.Fragment key={index}>{item.title}</React.Fragment>
                ))}
              </>
            ) : (
              <></>
            )}
          </Typography>
        ) : (
          <></>
        )}
      </CardContent>
    </Box>
  );
}
