import React, { useState, useEffect } from 'react';
import Overview from '../../components/Overview/Overview';
import { useParams, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import TopBillCast from '../../components/TopBillCast/TopBillCast';

const { default: axios } = require('axios');

export default function Media() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');
  const [hasTrailer, setHasTrailer] = useState(false);
  const [videoKey, setVideoKey] = useState();

  let params = useParams();
  console.log(params);
  const location = useLocation();

  const getMediaById = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/media/getById/${params.mediaType}/${params.id}`
      );
      console.log(response.data);

      if (
        response.data.mediaDetails.videos &&
        response.data.mediaDetails.videos.results.length > 0
      ) {
        for (const media of response.data.mediaDetails.videos.results) {
          if (
            media.type === 'Trailer' &&
            media.site === 'YouTube' &&
            media.official
          ) {
            setHasTrailer(true);
            setVideoKey(media.key);
            break;
          }
        }
      } else {
        setHasTrailer(false);
      }

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

  const getBookById = async () => {
    //http://localhost:3000/book/e3_6vQEACAAJ
    try {
      const response = await axios.get(
        `http://localhost:3000/book/${params.id}`
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

  const getBookByIsbn = async () => {
    //http://localhost:3000/book/isbn/1101885688
    try {
      const response = await axios.get(
        `http://localhost:3000/book/isbn/${params.id}`
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

  useEffect(() => {
    if (params.mediaType === 'movie' || params.mediaType === 'tv') {
      getMediaById();
    } else if (location.pathname.includes('isbn')) {
      getBookByIsbn();
    } else if (params.mediaType === 'book') {
      getBookById();
    } else {
      setError('Invalid media type');
    }
  }, [params]);
  return (
    <>
      {status === 'loading' && !error && !data ? (
        <>loading</>
      ) : status === 'idle' && error && !data ? (
        <>error</>
      ) : (
        <Grid container>
          <Grid item>
            <Overview
              mediaDetails={data.mediaDetails}
              mediaType={params.mediaType}
              hasTrailer={hasTrailer}
              videoKey={videoKey}
            />
          </Grid>
          {params.mediaType !== 'book' ? (
            <Grid container>
              <Grid item xs={12}>
                <TopBillCast
                  cast={data.mediaDetails.credits.cast}
                  mediaType={params.mediaType}
                  mediaId={params.id}
                />
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      )}
    </>
  );
}
