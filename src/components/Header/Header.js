import { Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';

export default function Header({ params }) {
  const [content, setContent] = useState();

  useEffect(() => {
    switch (params.listType) {
      case 'popular':
        if(params.mediaType === 'movie'){
          setContent(
            `Popular ${
              params.mediaType.charAt(0).toUpperCase() +
              params.mediaType.slice(1)
            }s`
          );
        }else {
          setContent(`Popular ${params.mediaType.toUpperCase()} Shows`)
        }
        break;
      case 'top_rated':
        if(params.mediaType === 'movie'){
          setContent(
            `Top Rated ${
              params.mediaType.charAt(0).toUpperCase() +
              params.mediaType.slice(1)
            }s`
          );
        }else {
          setContent(`Top Rated ${params.mediaType.toUpperCase()} Shows`)
        }
        break;
      case 'now_playing':
        setContent(
          `${params.mediaType.charAt(0).toUpperCase() + params.mediaType.slice(1)}s Now Playing`
        );
        break;
      case 'upcoming':
        setContent(
          `Upcoming ${
            params.mediaType.charAt(0).toUpperCase() + params.mediaType.slice(1)
          }s`
        );
        break;
      case 'airing_today':
        setContent(`${params.mediaType.toUpperCase()} Shows Airing Today`);
        break;
      case 'on_the_air':
        setContent(`Currenly Airing TV Shows`);
        break;
      case 'best_sellers':
        setContent(`Best Selling ${params.mediaType}s`);
        break;
      default:
        break;
    }
  }, [params])

  //mediaType and listType
  return <Typography variant='h5' component='div'>
    {content}
  </Typography>;
}
