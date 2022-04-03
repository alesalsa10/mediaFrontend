import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';
import { Box, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

export default function Comments({ id }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
  ];

  const params = useParams();
  const [state, setState] = useState({
    loading: true,
    response: [],
    error: null,
  });

  const [newComment, setNewComment] = useState({
    loading: false,
    response: null,
    error: null
  })

  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

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


  const addComment = async() =>{
    try{
      const comment = await axios.post(`http://localhost:3000/comments/${params.mediaType}/${id}`, {
        text: text
      });
      setNewComment({
        loading:false,
        response: comment.data,
        error: null
      });

      const newState = [comment.data, ...state.response]
      setState({
        loading: false,
        response: newState,
        error: null
      })
    }catch(err){
      console.log(err.response.data.Msg);
      setNewComment({loading: false, response: null, error: err.response.data.Msg})
    }
  }

  useEffect(() => {
    getComments();
  }, [id, params]);

  return (
    <>
      {state.loading && !state.error ? (
        <>loading</>
      ) : !state.loading && state.error ? (
        <>error</>
      ) : (
        <>
          <Box sx={{ display: 'flex', width: '100%', mb: 2, ml: '1rem'}}>
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              placeholder='Enter your comment here'
            />
          </Box>

          {state.response.length > 0 ? (
            <>
              {state.response.map((comment) => (
                <Comment key={comment._id} comment={comment} index={1} />
              ))}
            </>
          ) : (
            <Box
              sx={{
                p: 10,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ChatIcon />
                <Typography variant='h6'>No Comments Yet</Typography>
                <Typography variant='h6'>
                  Be the first to share what you think
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}
