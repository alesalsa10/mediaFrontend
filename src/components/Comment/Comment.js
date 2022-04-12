import { Alert, Backdrop, Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import ReplyIcon from '@mui/icons-material/Reply';
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
      sx={{ display: 'flex', width: '100%', marginTop: isFirst ? '1rem' : 0 }}
    >
      <Box
        sx={{
          width: isCollapsed ? 'auto' : '3px',
          borderLeft: isCollapsed ? '' : '2px solid grey',
          //marginBottom: isFirst ? '1rem' : 0,
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
                color='inherit'
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
            </Box>

            {isCollapsed ? (
              <></>
            ) : (
              <>
                {isEditOpen ? (
                  <>
                    <ReactQuill
                      value={editText}
                      onChange={handleEdit}
                      modules={modules}
                      formats={formats}
                      placeholder='Enter your comment here'
                    />

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
                    {authData.isAuth ? (
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
                              <Typography variant='body2' sx={{ mr: '0.2rem' }}>
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
                    ) : (
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
                    )}
                    {isReplyOpen ? (
                      <>
                        <ReactQuill
                          value={replyText}
                          onChange={handleReply}
                          modules={modules}
                          formats={formats}
                          placeholder='Enter your comment here'
                        />

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
        sx={{ backgroundColor: 'gray', opacity: 0.1 }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            //boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
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
              <Alert severity='error'>{deletedComment.error}</Alert>
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
