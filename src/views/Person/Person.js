import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Box, Grid, Skeleton } from '@mui/material';
import PersonOverview from '../../components/PersonOverview/PersonOverview';

export default function Person() {
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  const params = useParams();

  const getPerson = async () => {
    //http://localhost:3000/media/getById/movie/1420
    try {
      const response = await axios.get(
        `http://localhost:3000/people/${params.id.split('-')[0]}`
      );
      console.log(response.data);

      setState({
        loading: false,
        response: response.data,
        error: null,
      });
    } catch (error) {
      console.log(error.response.data);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    getPerson();
    // setState({
    //   loading: true,
    //   response: null,
    //   error: null
    // })
  }, [params]);
  return (
    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} p={8} px={{ xs: 3, md: 0 }} py={1}>
        
        {state.loading && !state.error ? (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: '0%',
                mx: 2,
              }}
            >
              <Box sx={{ alignSelf: { xs: 'center', sm: '' } }}>
                <Skeleton
                  sx={{
                    width: { xs: 150, sm: 200 },
                    height: { xs: 250, sm: 350 },
                    transform: 'scale(1,1)',
                    my: 1,
                  }}
                  animation='wave'
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: { xs: 0, sm: 2 },
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <Skeleton height={30} width={'50%'} animation='wave' />
                <Skeleton
                  height={25}
                  width={'25%'}
                  sx={{ my: 2 }}
                  animation='wave'
                />
                <Skeleton height={20} width={'90%'} animation='wave' />{' '}
                <Skeleton height={20} width={'90%'} animation='wave' />{' '}
                <Skeleton height={20} width={'75%'} animation='wave' />
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    overflow: 'hidden',
                    gap: '10px',
                  }}
                >
                  <>
                    {[...Array(5).keys()].map((item, index) => (
                      <Box key={index}>
                        <Skeleton
                          animation='wave'
                          variant='rectangular'
                          width={130}
                          height={200}
                          sx={{ mb: 2 }}
                        />
                        <Skeleton
                          animation='wave'
                          variant='rectangular'
                          width={130}
                          height={16}
                          sx={{ mb: 2 }}
                        />
                        
                      </Box>
                    ))}
                  </>
                </Box>
              </Box>
            </Box>

            
          </>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
        ) : (
          <Grid container>  
            <Grid item xs={12}>
                <PersonOverview data={state.response}/>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
