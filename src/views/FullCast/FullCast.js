import { Grid } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FullCast() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');

  let params = useParams();

  const getMediaById = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/getById/${params.mediaType}/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
      setError();
      setStatus('idle');
    } catch (error) {
      console.log(error);
      setError(error.data.response.Msg);
      setData();
      setStatus('idle');
    }
  };

  useEffect(() =>{
      getMediaById()
  }, [params])


  return (
    <>
      {status === 'loading' && !error && !data ? (
        <>loading</>
      ) : status === 'idle' && error && !data ? (
        <>error</>
      ) : (
        <>
          <Grid container>
              <Grid item xs={12}>
                    back to main button
              </Grid>
          </Grid>
          <Grid container>
              <Grid item xs={12} sm={6}>
                  Cast
              </Grid>
              <Grid item xs={12} sm={6}>
                  Crew
              </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
