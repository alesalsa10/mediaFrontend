import { Box, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function AllCredits({ credits }) {
  const [sortedByDate, setSortedByDate] = useState([]);
  const [sortedCrewByDate, setSortredCrewByDate] = useState([]);

  const sortCredits = (credits) => {
    let sorted = [];
    for (const credit of credits) {
      if (credit.media_type === 'movie') {
        credit.date = credit.release_date;
        sorted.push(credit);
      } else {
        credit.date = credit.first_air_date;
        sorted.push(credit);
      }
    }
    return sorted.sort((a, b) => parseFloat(b.date) - parseFloat(a.date));
  };

  useEffect(() => {
    if (credits.cast && credits.crew) {
      setSortedByDate(sortCredits(credits.cast));
      setSortredCrewByDate(sortCredits(credits.crew));
    } else if (credits.cast) {
      setSortedByDate(sortCredits(credits.cast));
    } else if (credits.crew) {
      setSortredCrewByDate(sortCredits(credits.crew));
    }
  }, [credits.cast, credits.crew]);
  return (
    <Box sx={{ py: '0.5rem' }}>
      {sortedByDate.length > 0 ? (
        <Box>
          <Typography variant='h5' component={'div'} sx={{ pb: '0.5rem' }}>
            Acting
          </Typography>
          {sortedByDate.map((media, index) => (
            <Box
              key={media.id + index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                borderLeft: '1px solid #dedede',
                borderRight: '1px solid #dedede',
                borderTop:
                  index === 0 ||
                  new Date(sortedByDate[index - 1].date).getFullYear() !==
                    new Date(media.date).getFullYear()
                    ? '1px solid #dedede'
                    : '',
                borderBottom:
                  index === sortedByDate.length - 1 ? '1px solid #dedede' : '',
              }}
            >
              <Typography>{new Date(media.date).getFullYear()} </Typography>
              <Typography component={'span'}>
                <Link
                  color='inherit'
                  underline='none'
                  sx={{
                    ':hover': { color: 'primary.main' },
                    pl: 1,
                    fontWeight: 550,
                  }}
                  href={`/${media.media_type}/${media.id}-${
                    media.media_type === 'movie' ? media.title : media.name
                  }`}
                >
                  {media.media_type === 'movie' ? media.title : media.name}
                </Link>{' '}
                <Typography variant='body2' component={'span'}>
                  as
                </Typography>{' '}
                {media.character || 'Not available'}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <></>
      )}
      {sortedCrewByDate.length > 0 ? (
        <Box>
          <Typography variant='h5' component={'div'} sx={{ pb: '0.5rem', pt:'1.5rem' }}>
            Crew
          </Typography>
          {sortedCrewByDate.map((media, index) => (
            <Box
              key={media.id + index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                borderLeft: '1px solid #dedede',
                borderRight: '1px solid #dedede',
                borderTop:
                  index === 0 ||
                  new Date(sortedCrewByDate[index - 1].date).getFullYear() !==
                    new Date(media.date).getFullYear()
                    ? '1px solid #dedede'
                    : '',
                borderBottom:
                  index === sortedCrewByDate.length - 1 ? '1px solid #dedede' : '',
              }}
            >
              <Typography>{new Date(media.date).getFullYear()} </Typography>
              <Typography component={'span'}>
                <Link
                  color='inherit'
                  underline='none'
                  sx={{
                    ':hover': { color: 'primary.main' },
                    pl: 1,
                    fontWeight: 550,
                  }}
                  href={`/${media.media_type}/${media.id}-${
                    media.media_type === 'movie' ? media.title : media.name
                  }`}
                >
                  {media.media_type === 'movie' ? media.title : media.name}
                </Link>{' '}
                
                {media.job || 'Not available'}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
