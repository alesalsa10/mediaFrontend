import { Alert, Box, Button, Typography } from '@mui/material';
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

  collapse
}) {
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
        collapse={collapse}
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
          width: '3px',
          borderLeft: '2px solid grey',
          //marginBottom: isFirst ? '1rem' : 0,
          ':hover': { borderColor: 'text.primary' },
          cursor: 'pointer'
        }}
        onClick={collapse}
      ></Box>
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
            {nestedComments}
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
                to={`/user/${comment.postedBy._id}`}
                underline='none'
                sx={{ ':hover': { color: 'primary.main' }, mr: 1 }}
                color='inherit'
              >
                {comment.postedBy.name}
              </Link>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {moment(comment.datePosted).fromNow()}
              </Typography>
            </Box>

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
                  //need to check first response from server not db
                  <Alert severity='error'>{changedComment.error}</Alert>
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
                      <Alert severity='warning'>
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
                          onClick={() => openEdit(comment._id, comment.text)}
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
                          onClick={() =>
                            handleDelete(
                              comment._id,
                              index,
                              isFirst && comment.replies.length === 0
                                ? true
                                : false
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
                      <Alert severity='error'>{changedComment.error}</Alert>
                    ) : (
                      <>
                        <Button
                          variant='outlined'
                          onClick={(e) => reply(comment._id, index)}
                          disabled={
                            (replyText === '' || replyText === '[Deleted]') &&
                            !changedComment.loading
                          }
                          sx={{ width: '80px', height: '40px', mt: '1rem' }}
                        >
                          {/* Reply */}
                          {changedComment.loading &&
                          !changedComment.response ? (
                            <CircularProgress color='inherit' size={'1.2rem'} />
                          ) : (
                            'Reply'
                          )}
                        </Button>
                        {replyText === '[Deleted]' ? (
                          <Alert severity='warning'>
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
      </Box>
    </Box>
  );
}
