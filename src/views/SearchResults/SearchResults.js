import { Grid, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchMenu from '../../components/SearchMenu/SearchMenu';
import { Card as MaterialCard } from '@mui/material';
import { Box } from '@mui/system';
const { default: axios } = require('axios');

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  let searchQuery = searchParams.get('name').split(' ').join('+');

  const [status, setStatus] = useState('loading');
  const [data, setData] = useState();

  const [selected, setSelected] = useState('Movies');

  let responseObj = {
    Movies: [],
    TV: [],
    //People: [],
    Books: [],
  };

  const searchMedia = async () => {
    //person
    try {
      const response = await axios.get(
        `http://localhost:3000/media/search/all?search_query=${searchQuery}`
      );
      response.data.results.forEach((item) => {
        if (item.media_type === 'movie') {
          responseObj.Movies.push(item);
        } else if (item.media_type === 'tv') {
          responseObj.TV.push(item);
        } //else if (item.media_type === 'person') {
        //mediaObj.People.push(item);
        //}
      });
      console.log(responseObj);
    } catch (e) {
      console.log(e);
      responseObj.Movies = e.response.data.Msg;
      responseObj.TV = e.response.data.Msg;
      setData(responseObj);
      setStatus('idle');
    }
  };

  const searchBooks = async () => {
    //http://localhost:3000/book/search?search_query=harry+potter
    try {
      const response = await axios.get(
        `http://localhost:3000/book/search?search_query=${searchQuery}`
      );
      console.log(response.data);
      response.data.items.forEach((item) => {
        responseObj.Books.push(item);
      });
      setData(responseObj);
      console.log(responseObj);
      setStatus('idle');
    } catch (e) {
      console.log(e);
      responseObj.Books = e.response.data.Msg;
      setData(responseObj);
      setStatus('idle');
    }
  };

  const handleChangeTab = (value) => {
    setSelected(value);
  };

  useEffect(() => {
    //call both apis
    //organize the data by cetegory (movies, books, tv shows, people will be added in the future)
    searchMedia();
    searchBooks();
  }, []);

  return (
    <Grid
      container
      justifyContent='center'
      px={1}
      py={2}
      sx={{ justifyContent: 'center' }}
    >
      <Grid item xs={12} md={3} sx={{ textAlign: 'center' }} mr={1} mb={1}>
        <SearchMenu selected={selected} handleChangeTab={handleChangeTab} />
      </Grid>
      <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
        {status === 'loading' ? (
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 0 }}
          >
            {[...Array(20).keys()].map((item, index) => (
              <Grid item xs={12} key={index}>
                <MaterialCard
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '100px 1fr',
                    boxShadow: '0 2px 8px rgb(0 0 0 / 25%)',
                  }}
                >
                  <Box>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={`100%`}
                      height={100}
                      sx={{ mb: 0 }}
                    />
                  </Box>
                  <Box>
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={170}
                      height={16}
                      sx={{ my: 2, ml: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={140}
                      height={10}
                      sx={{ mb: 2, ml: 1 }}
                    />
                    <Skeleton
                      animation='wave'
                      variant='rectangular'
                      width={'90%'}
                      height={10}
                      sx={{ mb: 2, ml: 1 }}
                    />
                  </Box>
                </MaterialCard>
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            {
              
            }
          </>
        )}
      </Grid>
    </Grid>
  );
}
