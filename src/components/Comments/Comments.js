import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';
import { Box, Button, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from 'react-redux';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

export default function Comments({ id }) {
  const authData = useSelector((state) => state.auth);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
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
    error: null,
  });

  const [text, setText] = useState('');
  const [replyText, setReplyText] = useState('');

  const handleChange = (value) => {
    setText(value);
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setText('');
    }
  };

  const handleReplyText = (value) => {
    setReplyText(value);
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setReplyText('');
    }
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

  const addComment = async () => {
    try {
      const comment = await axios.post(
        `http://localhost:3000/comments/${params.mediaType}/${id}`,
        {
          text: text,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      setNewComment({
        loading: false,
        error: null,
      });

      const newState = [comment.data, ...state.response];
      setState({
        loading: false,
        response: newState,
        error: null,
      });
    } catch (err) {
      console.log(err.response.data.Msg);
      setNewComment({
        loading: false,
        response: null,
        error: err.response.data.Msg,
      });
    }
  };

  const iterateComment = (commentId, comment, content) => {
    if (Array.isArray(comment.replies)) {
      if(comment._id === commentId){
        comment.replies.push(content)
      }else {
        comment.replies.forEach((comm) => {
          if (comm._id === commentId) {
            comm.replies.push(content);
          } else {
            iterateComment(commentId, comm, content);
          }
        });
      } 
    }
    return comment;
  };

  const reply = async (commentId, index) => {
    try {
      const comment = await axios.post(
        `http://localhost:3000/comments/${params.mediaType}/${id}/reply`,
        {
          text: replyText,
          parentCommentId: commentId,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      console.log(comment.data)
      setNewComment({
        loading: false,
        response: comment.data,
        error: null,
      });
      // const newState = [comment.data, ...state.response];
      // setState({
      //   loading: false,
      //   response: newState,
      //   error: null,
      // });
      const updatedState = [...state.response];
      let stateWithReply = iterateComment(
        commentId,
        state.response[index],
        comment.data
      );
      updatedState[index] = stateWithReply;
      console.log(updatedState)
      setState({ loading: false, response: updatedState, error: null });
    } catch (err) {
      console.log(err.response.data.Msg);
      setNewComment({
        loading: false,
        response: null,
        error: err.response.data.Msg,
      });
    }
  };

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
          <Box sx={{ display: 'flex', width: '100%', mb: 2, ml: '1rem' }}>
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              placeholder='Enter your comment here'
            />
          </Box>
          <Box sx={{ ml: '1rem', mb: '1rem' }}>
            <Button
              variant='outlined'
              onClick={addComment}
              disabled={text === ''}
            >
              Comment
            </Button>
          </Box>

          {state.response.length > 0 ? (
            <>
              {state.response.map((comment, index) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  isFirst={true}
                  index={index}
                  replyText={replyText}
                  handleReply={handleReplyText}
                  reply={reply}
                />
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
