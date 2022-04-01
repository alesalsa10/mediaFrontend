import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';

export default function Comments({ id }) {
  const params = useParams();
  const [state, setState] = useState({
    loading: true,
    response: [],
    error: null,
  });

  const selectMedia = () => {
    if (params.mediaType) {
      return params.mediaType;
    } else if (params.seassonNumber && params.episodeNumber) {
      return 'episode';
    } else if (params.episodeNumber) {
      return 'season';
    }
  };

  const getComments = async () => {
    let mediaType = selectMedia();
    let mediaId = params.id.split('-')[0];
    console.log(mediaType, mediaId);
    try {
      const response = await axios.get(
        `http://localhost:3000/comments/${mediaType}/${id}`
      );
      console.log(response.data);
      setState({ loading: false, response: response.data, error: null });
    } catch (err) {
      console.log(err.response.data.Msg);
      setState({
        loading: false,
        response: null,
        error: err.response.data.Msg,
      });
    }
  };

  useEffect(() => {
    getComments();
  }, [params]);

  return (
    <>
      {state.loading && !state.error ? (
        <>loading</>
      ) : !state.loading && state.error ? (
        <>error</>
      ) : (
        <>
          {state.response.length > 0 ? (
            <>
              {state.response.map((comment) => (
                <Comment key={comment._id} comment={comment}  index={1}/>
              ))}
            </>
          ) : (
            <></>
          )}
          {/* <Comment comment={state.response}/> */}
        </>
      )}
    </>
  );
}
