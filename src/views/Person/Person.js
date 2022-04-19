import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Alert, Box, Grid, Skeleton } from '@mui/material';
import PersonOverview from '../../components/PersonOverview/PersonOverview';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import AllCredits from '../../components/AllCredits/AllCredits';
const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BASE
    : process.env.REACT_APP_LOCAL_BASE;
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
        `${baseURL}people/${params.id.split('-')[0]}`
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
                backgroundColor: 'background.paper',
                p: 2,
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
                  overflow: 'hidden',
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
                    py: 1,
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
                          width={'85%'}
                          height={16}
                          sx={{ mb: 2 }}
                        />
                      </Box>
                    ))}
                  </>
                </Box>
              </Box>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={3} mt={1}>
                {/* <PersonalInfo info={state.response} /> */}
                <Box sx={{ backgroundColor: 'background.paper', p: 2 }}>
                  <Skeleton
                    height={25}
                    width={'50%'}
                    animation={'wave'}
                    sx={{ mb: 2 }}
                  />

                  <Skeleton height={25} width={'80%'} animation={'wave'} />
                  <Skeleton
                    height={25}
                    width={'60%'}
                    animation={'wave'}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton height={25} width={'80%'} animation={'wave'} />
                  <Skeleton
                    height={25}
                    width={'60%'}
                    animation={'wave'}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton height={25} width={'80%'} animation={'wave'} />
                  <Skeleton
                    height={25}
                    width={'60%'}
                    animation={'wave'}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton height={25} width={'80%'} animation={'wave'} />
                  <Skeleton
                    height={25}
                    width={'60%'}
                    animation={'wave'}
                    sx={{ mb: 2 }}
                  />
                  <Skeleton height={25} width={'80%'} animation={'wave'} />
                  <Skeleton height={25} width={'60%'} animation={'wave'} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={8} mt={1}>
                {/* <AllCredits credits={state.response.combined_credits} /> */}
                <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
                  <Skeleton height={30} width={100} animation={'wave'} sx={{mb: 1}}/>
                  <Box sx={{ border: 1, borderColor: 'text.primary' }}>
                    {[...Array(10).keys()].map((item, index) => (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          my: 1,
                          gap: 2,
                          borderBottom: index !== 9 ? 1 : 0,
                          p: 2,
                          borderColor: 'text.primary',
                        }}
                        key={index}
                      >
                        <Skeleton width={'20%'} height={20} animation='wave' />
                        <Skeleton width={'50%'} height={20} animation='wave' />
                        <Skeleton width={'100%'} height={20} animation='wave' />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </>
        ) : !state.loading && state.error ? (
          <Alert severity='error' variant='outlined' sx={{ p: 2, m: 2 }}>
            {state.error}
          </Alert>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              <PersonOverview data={state.response} />
            </Grid>
            <Grid item xs={12} sm={3} mt={1}>
              <PersonalInfo info={state.response} />
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={8} mt={1}>
              <AllCredits credits={state.response.combined_credits} />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
