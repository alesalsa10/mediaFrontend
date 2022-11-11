import {
  Alert,
  Backdrop,
  Box,
  Button,
  Modal,
  Typography,
  Grid,
} from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from '@mui/material';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

export default function Comment({
  comment,
  isFirst,
  index,
  replyText,
  handleReply,
  reply,

  isReplyOpen,
  openReply,
  openedReplyId,
  changedComment,

  editText,
  handleEdit,
  edit,
  editId,
  isEditOpen,
  openEdit,
  editedComment,

  handleDelete,
  deletedComment,
  deleted,
  deletedIndex,
  firstWithChildren,

  collapse,
  collpaseId,
  isCollapsed,

  isOpen,
  handleModal,

  vote,
}) {
  //add username to links instead of id
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const nestedComments = (comment.replies || []).map((comment) => {
    return (
      <Comment
        comment={comment}
        key={comment._id}
        isFirst={false}
        index={index}
        replyText={replyText}
        reply={reply}
        handleReply={handleReply}
        openedReplyId={openedReplyId}
        isReplyOpen={comment._id === openedReplyId}
        openReply={openReply}
        changedComment={changedComment}
        editText={editText}
        handleEdit={handleEdit}
        edit={edit}
        editId={editId}
        isEditOpen={comment._id === editId}
        openEdit={openEdit}
        editedComment={editedComment}
        handleDelete={handleDelete}
        deletedComment={deletedComment}
        deleted={deleted}
        deletedIndex={deletedIndex}
        firstWithChildren={firstWithChildren}
        collapse={collapse}
        collpaseId={collpaseId}
        isCollapsed={comment._id === collpaseId}
        isOpen={isOpen}
        handleModal={handleModal}
        vote={vote}
      />
    );
  });

  const sanitizedData = (text) => ({
    __html: DOMPurify.sanitize(text),
  });

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

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        marginTop: isFirst ? '1rem' : 0,
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          width: isCollapsed ? 'auto' : '3px',
          borderLeft: isCollapsed ? '' : '2px solid grey',
          ':hover': { borderColor: 'text.primary' },
          cursor: 'pointer',
        }}
        onClick={() => collapse(comment._id)}
      >
        {isCollapsed ? (
          <OpenInFullIcon
            fontSize='small'
            sx={{
              ':hover': { borderColor: 'text.primary', cursor: 'pointer' },
            }}
            onClick={() => collapse(comment._id)}
          />
        ) : (
          <></>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          pl: '0.5rem',
        }}
        tabIndex='-1'
        id={comment._id}
        key={comment._id}
      >
        {comment.text === '[Deleted]' ? (
          <>
            <Typography>{comment.text}</Typography>
            {isCollapsed ? <></> : nestedComments}
          </>
        ) : !comment.postedBy ? (
          <>
            <Typography>Deleted User</Typography>
            {isCollapsed ? <></> : nestedComments}
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Link
                component={RouterLink}
                to={`/user/${comment.postedBy.username}`}
                underline='none'
                sx={{ ':hover': { color: 'primary.main' }, mr: 1 }}
                color='text.primary'
              >
                {comment.postedBy.username}
              </Link>

              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {comment.editedAt ? (
                  <>Edited {moment(comment.editedAt).fromNow()}</>
                ) : (
                  moment(comment.datePosted).fromNow()
                )}
                {}
              </Typography>
              {/* check if authday.user.id is in comment.votes array and change color if it is */}
            </Box>

            {isCollapsed ? (
              <></>
            ) : (
              <>
                {isEditOpen ? (
                  <>
                    <Box sx={{ backgroundColor: 'background.paper' }}>
                      <ReactQuill
                        value={editText}
                        onChange={handleEdit}
                        modules={modules}
                        formats={formats}
                        placeholder='Enter your comment here'
                      />
                    </Box>

                    {editedComment.error && !editedComment.loading ? (
                      <Alert severity='error' variant='outlined'>
                        {changedComment.error}
                      </Alert>
                    ) : (
                      <>
                        <Button
                          variant='outlined'
                          onClick={(e) => edit(comment._id, index)}
                          disabled={
                            (editText === '' || editText === '[Deleted]') &&
                            !editedComment.loading
                          }
                          sx={{ width: '80px', height: '40px', my: '0.5rem' }}
                        >
                          {editedComment.loading && !editedComment.response ? (
                            <CircularProgress color='inherit' size={'1.2rem'} />
                          ) : (
                            'Edit'
                          )}
                        </Button>
                        {editText === '[Deleted]' ? (
                          <Alert severity='warning' variant='outlined'>
                            Text cannot be equal to [Deleted]
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    {nestedComments}
                  </>
                ) : (
                  <>
                    <div
                      style={{ marginBottom: '0.2rem' }}
                      dangerouslySetInnerHTML={sanitizedData(comment.text)}
                    />
                    {authData.isAuth && authData.user ? (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              mr: '0.5rem',
                              width: 'fit-content',
                            }}
                            //onClick={() => openReply(comment._id)}
                          >
                            <ArrowUpwardIcon
                              onClick={() => vote(comment._id, index, true)}
                              sx={{
                                ':hover': { color: 'primary.dark' },
                                cursor: 'pointer',
                                color: comment.votes.some(
                                  (e) =>
                                    e.postedBy === authData.user._id &&
                                    e.value === 1
                                )
                                  ? 'red'
                                  : 'text.secondary',
                              }}
                            />
                            <Typography
                              variant='body2'
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                color: comment.votes.some(
                                  (e) =>
                                    e.postedBy === authData.user._id &&
                                    e.value !== 0
                                )
                                  ? 'red'
                                  : 'text.secondary',
                              }}
                            >
                              {comment.voteCount}
                            </Typography>
                            <ArrowDownwardIcon
                              onClick={() => vote(comment._id, index, false)}
                              sx={{
                                ':hover': { color: 'primary.dark' },
                                cursor: 'pointer',
                                color: comment.votes.some(
                                  (e) =>
                                    e.postedBy === authData.user._id &&
                                    e.value === -1
                                )
                                  ? 'red'
                                  : 'text.secondary',
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              cursor: 'pointer',
                              '&:hover': { color: 'primary.main' },
                              //mb: '0.3rem',
                              mr: '0.5rem',
                              width: 'fit-content',
                            }}
                            onClick={() => openReply(comment._id)}
                          >
                            <Typography variant='body2'>Reply</Typography>
                            <ReplyIcon fontSize='small' />
                          </Box>

                          {authData.user._id === comment.postedBy._id ? (
                            <>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  cursor: 'pointer',
                                  '&:hover': { color: 'primary.main' },
                                  mb: '0.3rem',
                                  mr: '0.5rem',
                                  width: 'fit-content',
                                }}
                                onClick={() =>
                                  openEdit(comment._id, comment.text)
                                }
                              >
                                <Typography
                                  variant='body2'
                                  sx={{ mr: '0.2rem' }}
                                >
                                  Edit
                                </Typography>
                                <EditIcon fontSize='small' />
                              </Box>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  cursor: 'pointer',
                                  '&:hover': { color: 'error.main' },
                                  mb: '0.3rem',
                                  width: 'fit-content',
                                }}
                                onClick={(e, reason) =>
                                  handleModal(
                                    e,
                                    reason,
                                    comment,
                                    index,
                                    isFirst && comment.replies.length === 0
                                  )
                                }
                              >
                                <DeleteIcon fontSize='small' />
                              </Box>
                            </>
                          ) : (
                            <></>
                          )}
                        </Box>
                        {editedComment.error ? (
                          <Alert severity='error' variant='outlined'>
                            {editedComment.error}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mr: '0.5rem',
                            width: 'fit-content',
                          }}
                          //onClick={() => openReply(comment._id)}
                        >
                          <ArrowUpwardIcon
                            onClick={() => navigate('/signin')}
                            sx={{
                              ':hover': { color: 'primary.dark' },
                              cursor: 'pointer',
                            }}
                          />
                          <Typography
                            variant='body2'
                            sx={{
                              color: 'text.secondary',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {comment.voteCount}
                          </Typography>
                          <ArrowDownwardIcon
                            onClick={() => navigate('/signin')}
                            sx={{
                              ':hover': { color: 'primary.dark' },
                              cursor: 'pointer',
                            }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            cursor: 'pointer',
                            '&:hover': { color: 'primary.main' },
                            mb: '0.3rem',
                            width: 'fit-content',
                          }}
                          onClick={() => navigate('/signin')}
                        >
                          <Typography variant='body2'>Reply</Typography>
                          <ReplyIcon fontSize='small' />
                        </Box>
                      </Box>
                    )}
                    {isReplyOpen ? (
                      <>
                        <Box sx={{ backgroundColor: 'background.paper' }}>
                          <ReactQuill
                            value={replyText}
                            onChange={handleReply}
                            modules={modules}
                            formats={formats}
                            placeholder='Enter your comment here'
                          />
                        </Box>

                        {changedComment.error && !changedComment.loading ? (
                          <Alert severity='error' variant='outlined'>
                            {changedComment.error}
                          </Alert>
                        ) : (
                          <>
                            <Button
                              variant='outlined'
                              onClick={(e) => reply(comment._id, index)}
                              disabled={
                                (replyText === '' ||
                                  replyText === '[Deleted]') &&
                                !changedComment.loading
                              }
                              sx={{ width: '80px', height: '40px', mt: '1rem' }}
                            >
                              {/* Reply */}
                              {changedComment.loading &&
                              !changedComment.response ? (
                                <CircularProgress
                                  color='inherit'
                                  size={'1.2rem'}
                                />
                              ) : (
                                'Reply'
                              )}
                            </Button>
                            {replyText === '[Deleted]' ? (
                              <Alert severity='warning' variant='outlined'>
                                Text cannot be equal to [Deleted]
                              </Alert>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {nestedComments}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
      <Modal
        open={isOpen}
        onClose={(e, reason) => handleModal(e, reason)}
        aria-labelledby='delete comment confirmation'
        aria-describedby='confirmation for delete'
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', md: 500 },
            bgcolor: 'background.paper',
            p: 4,
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            color={'text.primary'}
          >
            Are you sure you want to delete this comment
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Button
              variant='contained'
              onClick={() =>
                handleDelete(deleted._id, deletedIndex, firstWithChildren)
              }
            >
              Yes
            </Button>
            <Button varaint='outlined' onClick={handleModal}>
              No
            </Button>
            {deletedComment.error && !deletedComment.loading ? (
              <Grid container>
                <Grid item xs={12}>
                  <Alert severity='error'>{deletedComment.error}</Alert>
                </Grid>
              </Grid>
            ) : !deletedComment.error && deletedComment.loading ? (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 1000,
                  width: '100%',
                  height: '100%',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
