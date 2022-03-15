import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchMenu from '../../components/SearchMenu/SearchMenu';
const { default: axios } = require('axios');

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  let searchQuery = searchParams.get('name');

  const [mediaData, setMediaData] = useState();
  const [mediaError, setMediaError] = useState();
  const [mediaStatus, setMediaStatus] = useState('loading');

  const [bookData, setBookData] = useState();
  const [bookError, setBookError] = useState();
  const [bookStatus, setBookStatus] = useState('loading');

  const [selected, setSelected] = useState('Movies');

  const searchMedia = async () => {
    //http://localhost:3000/media/search/all?search_query=harry+potter\
    try {
      const response = await axios.get(
        `http://localhost:3000/media/search/all/?search_query=${searchQuery}`
      );
      console.log(response.data);
      setMediaData(response.data.results);
      setMediaError();
      setMediaStatus('idle');
    } catch (e) {
      console.log(e);
      setMediaError(e.response.data.Msg);
      setMediaData();
      setMediaStatus('idle');
    }
  };

  const searchBooks = async () => {
    //http://localhost:3000/book/search/?search_query=harry+potter
    try {
      const response = await axios.get(
        `http://localhost:3000/book/search?search_query=${searchQuery}`
      );
      console.log(response.data);
      setBookData(response.data.results);
      setBookError();
      setBookStatus('idle');
    } catch (e) {
      console.log(e);
      setBookError(e.response.data.Msg);
      setBookData();
      setBookStatus('idle');
    }
  };

  const handleChangeTab = (value) => {
    setSelected(value);
  };

  useEffect(() =>{
    //call both apis
    //organize the data by cetegory (movies, books, tv shows, people will be added in the future)
  },[])

  return (
    <Grid
      container
      justifyContent='center'
      px={1}
      py={2}
      sx={{ justifyContent: 'center' }}
    >
      <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
        <SearchMenu selected={selected} handleChangeTab={handleChangeTab} />
      </Grid>
      <Grid item xs={12} md={9} sx={{ textAlign: 'center' }}>
        Rest of stuff here
      </Grid>
    </Grid>
  );
}
