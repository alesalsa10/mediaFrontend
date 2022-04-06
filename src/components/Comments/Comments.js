import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../Comment/Comment';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
    response: null,
  });

  const [changedComment, setChangedComment] = useState({
    loading: false,
    error: null,
    response: null,
  });

  const [editedComment, setEditedComment] = useState({
    loadng: false,
    error: null,
    response: null,
  });

  const [openedReplyId, setOpenedReplyId] = useState('');
  const [editId, setEditId] = useState('');

  const [text, setText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState('');

  const handleChange = (value) => {
    setText(value);
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setText('');
    }
    if (value.includes('[Deleted]')) {
      value = '[Deleted]';
      console.log(value);
      setText(value);
    }
  };

  const handleReplyText = (value) => {
    setReplyText(value);
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setReplyText('');
    }
    if (value.includes('[Deleted]')) {
      value = '[Deleted]';
      console.log(value);
      setReplyText(value);
    }
  };

  const handleEditText = (value) => {
    setEditText(value);
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setEditText('');
    }
    if (value.includes('[Deleted]')) {
      value = '[Deleted]';
      console.log(value);
      setEditText(value);
    }
  };

  const selectMedia = () => {
    console.log(params);
    if (params.mediaType) {
      return params.mediaType;
    } else if (params.seasonNumber && params.episodeNumber) {
      return 'episode';
    } else if (params.seasonNumber) {
      return 'season';
    }
  };

  const getComments = async () => {
    let mediaType = selectMedia();
    //let mediaId = params.id.split('-')[0];
    console.log(mediaType);
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
    let mediaType = selectMedia();
    setNewComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      const comment = await axios.post(
        `http://localhost:3000/comments/${mediaType}/${id}`,
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
        response: true,
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
      setTimeout(() => {
        setNewComment({
          error: null,
          response: null,
          loading: false,
        });
      }, 3000);
    }
  };

  const iterateComment = (commentId, comment, content) => {
    if (Array.isArray(comment.replies)) {
      if (comment._id === commentId) {
        comment.replies.unshift(content);
      } else {
        for (const comm of comment.replies) {
          if (comm._id === commentId) {
            comm.replies.unshift(content);
            break;
          } else {
            iterateComment(commentId, comm, content);
          }
        }
      }
    }
    return comment;
  };

  const editIteration = (commentId, comment, content) => {
    if (Array.isArray(comment.replies)) {
      if (comment._id === commentId) {
        comment.text = content.text;
      } else {
        for (let comm of comment.replies) {
          if (comm._id === commentId) {
            comm.text = content.text;
            break;
          } else {
            editIteration(commentId, comm, content);
          }
        }
      }
    }
    return comment;
  };

  const deleteIteration = (commentId, comment) => {
    if (Array.isArray(comment.replies)) {
      for (let [index, comm] of comment.replies.entries()) {
        console.log(index, comm);
        if (comm._id === commentId) {
          comment.replies.splice(index);
          break;
        } else {
          deleteIteration(commentId, comm);
        }
      }
    }
    console.log(comment);
    return comment;
  };

  // const mainDelete = (list, index) =>{
  //   return list.splice(index);
  // }

  const reply = async (commentId, index) => {
    let mediaType = selectMedia();
    setChangedComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      const comment = await axios.post(
        `http://localhost:3000/comments/${mediaType}/${id}/reply`,
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
      console.log(comment.data);
      setChangedComment({
        loading: false,
        response: true,
        error: null,
      });
      const updatedState = [...state.response];
      let stateWithReply = iterateComment(
        commentId,
        state.response[index],
        comment.data
      );
      updatedState[index] = stateWithReply;
      console.log(updatedState);
      openReply('');
      setState({ loading: false, response: updatedState, error: null });
    } catch (err) {
      console.log(err.response.data.Msg);
      setChangedComment({
        loading: false,
        response: null,
        error: err.response.data.Msg,
      });
      setTimeout(() => {
        setChangedComment({
          error: null,
          response: null,
          loading: false,
        });
      }, 5000);
    }
  };

  const edit = async (commentId, index) => {
    //let mediaType = selectMedia();
    setEditedComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      const comment = await axios.put(
        `http://localhost:3000/comments/edit/${commentId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      console.log(comment.data);
      setEditedComment({
        loading: false,
        response: true,
        error: null,
      });
      const updatedState = [...state.response];

      let stateWithReply = editIteration(
        commentId,
        state.response[index],
        comment.data.foundComment
      );
      updatedState[index] = stateWithReply;
      openEdit('');
      setState({ loading: false, response: updatedState, error: null });
    } catch (err) {
      console.log(err.response);
      setEditedComment({
        loading: false,
        response: null,
        error: err.response.data.Msg,
      });
      setTimeout(() => {
        setEditedComment({
          error: null,
          response: null,
          loading: false,
        });
      }, 5000);
    }
  };

  const openReply = (id) => {
    if (id === openedReplyId) {
      setOpenedReplyId('');
      //setReplyText('');
    } else {
      setReplyText('');
      setOpenedReplyId(id);
    }
  };

  const openEdit = (id, text) => {
    if (id === editId) {
      setEditId('');
      //setEditText(text)
    } else {
      //setReplyText('');
      setEditId(id);
      setEditText(text);
    }
  };

  const deleteComment = async (commentId, index, isFirstAndNoChildren) => {
    try {
      let comment = await axios.delete(
        `http://localhost:3000/comments/delete/${commentId}`,
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      let updatedState = [...state.response];

      if (comment.data.Msg === 'Complete Deletion') {
        //setState({ loading: false, response: updatedState, error: null });
        if (isFirstAndNoChildren) {
          updatedState.splice(index, 1);
          //const updated = mainDelete(updatedState, index)
          //console.log(updated)
          setState({
            loading: false,
            response: updatedState,
            error: null,
          });
        } else {
          let stateWithDeleted = deleteIteration(
            commentId,
            state.response[index]
            //comment.data.foundComment
          );
          updatedState[index] = stateWithDeleted;
          setState({
            loading: false,
            response: updatedState,
            error: null,
          });
        }
      } else {
        console.log(comment.data);
        let stateWithReply = editIteration(
          commentId,
          state.response[index],
          comment.data
        );
        updatedState[index] = stateWithReply;
        setState({ loading: false, response: updatedState, error: null });
      }
    } catch (err) {
      console.log(err);
      // setChangedComment({
      //   loading: false,
      //   response: null,
      //   error: err.response.data.Msg,
      // });
      // setTimeout(() => {
      //   setChangedComment({
      //     error: null,
      //     response: null,
      //     loading: false,
      //   });
      // }, 5000);
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
          {authData.isAuth ? (
            <Box sx={{ ml: '1rem', mb: '1rem' }}>
              {newComment.error && !newComment.loading ? (
                <Alert severity='error'>{newComment.error}</Alert>
              ) : (
                <>
                  <Button
                    variant='outlined'
                    onClick={addComment}
                    disabled={
                      (text === '' || text === '[Deleted]') &&
                      !newComment.loading
                    }
                    sx={{ width: '100px', height: '40px', mt: '1rem' }}
                  >
                    {newComment.loading && !newComment.response ? (
                      <CircularProgress color='inherit' size={'1.2rem'} />
                    ) : (
                      'Comment'
                    )}
                  </Button>
                  {text === '[Deleted]' ? (
                    <Alert severity='warning'>
                      Text cannot be equal to [Deleted]
                    </Alert>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Box>
          ) : (
            <Box sx={{ ml: '1rem', mb: '1rem', width: '100%' }}>
              <Button
                fullWidth
                variant='outlined'
                component={Link}
                to='/signin'
              >
                Sign in and Join the Conversation
              </Button>
            </Box>
          )}

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
                  openedReplyId={openedReplyId}
                  isReplyOpen={comment._id === openedReplyId}
                  openReply={openReply}
                  changedComment={changedComment}
                  editText={editText}
                  handleEdit={handleEditText}
                  edit={edit}
                  editId={editId}
                  isEditOpen={comment._id === editId}
                  openEdit={openEdit}
                  editedComment={editedComment}
                  handleDelete={deleteComment}
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
