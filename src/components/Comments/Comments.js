import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../Comment/Comment';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import api from '../../services/api';

export default function Comments({ id, count }) {
  const theme = useSelector((state) => state.theme);
  const [commentCount, setCommentCount] = useState(count);

  const { pathname, hash, key } = useLocation();

  const authData = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = (event, reason, comment, index, firstWithChildren) => {
    //console.log(comment, index, firstWithChildren);
    if (reason !== 'backdropClick') {
      setDeleted(comment);
      setDeletedIndex(index);
      setFirstWithChildren(firstWithChildren);
      setIsOpen(!isOpen);
    }
  };

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

  const [deletedIndex, setDeletedIndex] = useState();
  const [firstWithChildren, setFirstWithChildren] = useState();

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
    loading: false,
    error: null,
    response: null,
  });

  const [deletedComment, setDeletedComment] = useState({
    loading: false,
    error: null,
    response: null,
  });

  const [openedReplyId, setOpenedReplyId] = useState('');
  const [editId, setEditId] = useState('');
  const [deleted, setDeleted] = useState('');

  const [text, setText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [editText, setEditText] = useState('');

  const [collapsedId, setCollapsedId] = useState('');
  const [sort, setSort] = useState('popularity');

  const handleChange = (value) => {
    setText(value);
    if (value.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
      setText('');
    }
    if (value.includes('[Deleted]')) {
      value = '[Deleted]';
      //console.log(value);
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
      //console.log(value);
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
      // console.log(value);
      setEditText(value);
    }
  };

  const selectMedia = () => {
    if (params.mediaType) {
      return params.mediaType;
    } else if (params.seasonNumber && params.episodeNumber) {
      return 'episode';
    } else if (params.seasonNumber) {
      return 'season';
    }
  };

  const getComments = async () => {
    setState({
      loading: true,
      error: null,
      response: null,
    });
    let mediaType = selectMedia();
    try {
      const response = await api.get(
        `comments/${mediaType}/${id}?sort=${sort}`,
        {
          headers: {
            Authorization: authData.accessToken
              ? `Token ${authData.accessToken}`
              : null,
          },
        }
      );
      //console.log(response.data);
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
    if (newComment.loading) {
      return;
    }
    setNewComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      const comment = await api.post(
        `comments/${mediaType}/${id}`,
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
      setCommentCount(commentCount + 1);
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
        comment.editedAt = content.editedAt;
      } else {
        for (let comm of comment.replies) {
          if (comm._id === commentId) {
            comm.text = content.text;
            comm.editedAt = content.editedAt;
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
        //console.log(index, comm);
        if (comm._id === commentId) {
          comment.replies.splice(index, 1);
          break;
        } else {
          deleteIteration(commentId, comm);
        }
      }
    }
    //console.log(comment);
    return comment;
  };

  const vote = async (commentId, index, isUpvote) => {
    //voting logic will go here
    //{isUpvote: boolean}
    try {
      const comment = await api.put(
        `comments/vote/${commentId}`,
        {
          isUpvote: isUpvote,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      setEditedComment({
        loading: false,
        response: true,
        error: null,
      });
      const updatedState = [...state.response];

      let stateWithVote = editIteration(
        commentId,
        state.response[index],
        comment.data
      );
      updatedState[index] = stateWithVote;
    } catch (error) {
      console.log(error);
    }
  };

  const reply = async (commentId, index) => {
    let mediaType = selectMedia();
    if (changedComment.loading) {
      return;
    }
    setChangedComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      const comment = await api.post(
        `comments/${mediaType}/${id}/reply`,
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
      //console.log(comment.data);
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
      //console.log(updatedState);
      setCommentCount(commentCount + 1);
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
    if (editedComment.loading) {
      return;
    }
    //let mediaType = selectMedia();
    setEditedComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      const comment = await api.put(
        `comments/edit/${commentId}`,
        {
          text: editText,
        },
        {
          headers: {
            Authorization: `Token ${authData.accessToken}`,
          },
        }
      );
      // console.log(comment.data);
      setEditedComment({
        loading: false,
        response: true,
        error: null,
      });
      const updatedState = [...state.response];

      let stateWithReply = editIteration(
        commentId,
        state.response[index],
        comment.data
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
    //console.log(commentId, index, isFirstAndNoChildren);
    if (deletedComment.loading) {
      return;
    }
    setDeletedComment({
      error: null,
      response: null,
      loading: true,
    });
    try {
      let comment = await api.delete(`comments/delete/${commentId}`, {
        headers: {
          Authorization: `Token ${authData.accessToken}`,
        },
      });
      setDeletedComment({
        loading: false,
        response: true,
        error: null,
      });
      let updatedState = [...state.response];

      if (comment.data.Msg === 'Complete Deletion') {
        if (isFirstAndNoChildren) {
          updatedState.splice(index, 1);
          setState({
            loading: false,
            response: updatedState,
            error: null,
          });
          setCommentCount(commentCount - 1);
          setIsOpen(false);
        } else {
          let stateWithDeleted = deleteIteration(
            commentId,
            state.response[index]
          );
          updatedState[index] = stateWithDeleted;
          setState({
            loading: false,
            response: updatedState,
            error: null,
          });
          setIsOpen(false);
        }
      } else {
        // console.log(comment.data);
        let stateWithReply = editIteration(
          commentId,
          state.response[index],
          comment.data
        );
        updatedState[index] = stateWithReply;
        setState({ loading: false, response: updatedState, error: null });
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
      setDeletedComment({
        loading: false,
        response: null,
        error: err.response.data.Msg,
      });
      setTimeout(() => {
        setDeletedComment({
          error: null,
          response: null,
          loading: false,
        });
      }, 5000);
    }
  };

  const collapse = (id) => {
    if (id === collapsedId) {
      setCollapsedId('');
    } else {
      setCollapsedId(id);
    }
  };

  useEffect(() => {
    if (!theme.isLight) {
      setTimeout(() => {
        let qlStroke = Array.from(document.getElementsByClassName('ql-stroke'));
        qlStroke.forEach((element) => {
          element.id = 'ql-stroke';
        });
        let qlHeader = Array.from(document.getElementsByClassName('ql-header'));
        qlHeader.forEach((element) => {
          element.id = 'ql-header';
        });
        let qlFill = Array.from(document.getElementsByClassName('ql-fill'));
        qlFill.forEach((element) => {
          element.id = 'ql-fill';
        });
        let qlBlank = Array.from(document.getElementsByClassName('ql-blank'));
        qlBlank.forEach((element) => {
          element.id = 'ql-blank';
        });
        let qlPickerOptions = Array.from(
          document.getElementsByClassName('ql-picker-options')
        );
        qlPickerOptions.forEach((element) => {
          element.id = 'ql-picker-options';
        });
      }, 0);
    }
  });

  useEffect(() => {
    getComments();
  }, [id, params, sort]);

  useEffect(() => {
    // if not a hash link, scroll to top
    if (state.response && !state.error && !state.loading) {
      if (hash === '') {
        window.scrollTo(0, 0);
      }
      // else scroll to id
      else {
        setTimeout(() => {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
          }
        }, 0);
      }
    }
  }, [pathname, hash, key, state.loading]);

  return (
    <Box
      sx={{
        mb: 2,
        width: '100%',
      }}
    >
      {state.loading && !state.error ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : !state.loading && state.error ? (
        <Alert
          severity='error'
          variant='outlined'
          sx={{ color: 'text.primary' }}
        >
          {state.error}
        </Alert>
      ) : (
        <>
          <Box
            item
            sx={{
              pt: 3,
              width: '100%',
              pb: '1rem',
              color: 'text.primary',
            }}
          >
            <Typography component={'h2'} variant='h6'>
              Comments
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              mb: 1,
              color: 'text.primary',
              backgroundColor: 'background.paper',
            }}
          >
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={modules}
              formats={formats}
              placeholder='Enter your comment here'
            />
          </Box>

          {authData.isAuth && authData.user ? (
            <Box sx={{ mb: '1rem', width: '100%' }}>
              {newComment.error && !newComment.loading ? (
                <Alert severity='error' variant='outlined'>
                  {newComment.error}
                </Alert>
              ) : (
                <>
                  {newComment.error && !newComment.loading ? (
                    <Alert
                      severity='error'
                      variant='outlined'
                      sx={{ width: '100%' }}
                    >
                      {newComment.error}
                    </Alert>
                  ) : (
                    <>
                      <Button
                        variant='outlined'
                        onClick={addComment}
                        disabled={
                          (text === '' || text === '[Deleted]') &&
                          !newComment.loading
                        }
                        sx={{
                          width: '100px',
                          height: '40px',
                          mt: '0.5rem',
                        }}
                      >
                        {newComment.loading && !newComment.response ? (
                          <CircularProgress color='inherit' size={'1.2rem'} />
                        ) : (
                          'Comment'
                        )}
                      </Button>
                      {text === '[Deleted]' ? (
                        <Alert
                          severity='warning'
                          sx={{ mt: 1 }}
                          variant='outlined'
                        >
                          Text cannot be equal to [Deleted]
                        </Alert>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              )}
            </Box>
          ) : (
            <Box sx={{ mb: '1rem', width: '100%' }}>
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'text.primary',
                }}
              >
                <Typography>All Comments ({commentCount})</Typography>
                <Box>
                  <FormControl>
                    <Select
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                    >
                      <MenuItem value={'popularity'}>Best</MenuItem>
                      <MenuItem value={'replies'}>Most Replies</MenuItem>
                      <MenuItem value={'recent'}>Most Recent</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box>
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
                    deletedComment={deletedComment}
                    deleted={deleted}
                    deletedIndex={deletedIndex}
                    firstWithChildren={firstWithChildren}
                    collapse={collapse}
                    collpaseId={collapsedId}
                    isCollapsed={comment._id === collapsedId}
                    isOpen={isOpen}
                    handleModal={handleModal}
                    vote={vote}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Box
              sx={{
                p: { xs: 0, md: 10 },
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
                  color: 'text.primary',
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
    </Box>
  );
}
