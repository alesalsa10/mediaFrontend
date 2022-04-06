import { Alert, Box, Button, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import { CommentsDisabled } from '@mui/icons-material';

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

  editId,
  isEditOpen,
  openEdit,
}) {
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const nestedComments = (comment.replies || []).map((comment) => {
    return (
      <Comment
        comment={comment}
        key={comment._id}
        isFirst={false}
        replyText={replyText}
        reply={reply}
        handleReply={handleReply}
        index={index}
        openedReplyId={openedReplyId}
        isReplyOpen={comment._id === openedReplyId}
        openReply={openReply}
        changedComment={changedComment}
        
        editId={editId}
        isEditOpen={comment._id === editId}
        openEdit={openEdit}
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
        flexDirection: 'column',
        width: '100%',
        borderLeft: '1px solid grey',
        marginLeft: isFirst ? '1rem' : '0.5rem',
        marginBottom: isFirst ? '1rem' : 0,
        pl: '0.5rem',
      }}
      key={comment._id}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography sx={{ mr: 1 }}>{comment.postedBy.name}</Typography>
        <Typography variant='body2'>
          {moment(comment.datePosted).fromNow()}
        </Typography>
      </Box>

      {isEditOpen ? (
        <>
          <ReactQuill
            //value={replyText}
            //onChange={handleReply}
            modules={modules}
            formats={formats}
            placeholder='Enter your comment here'
          />
        </>
      ) : (
        <>
          <div dangerouslySetInnerHTML={sanitizedData(comment.text)} />
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
                  mb: '0.3rem',
                  mr: '0.5rem',
                  width: 'fit-content',
                }}
                onClick={() => openReply(comment._id)}
              >
                <Typography variant='body2'>Reply</Typography>
                <ReplyIcon fontSize='small' />
              </Box>

              {authData.user._id === comment.postedBy._id ? (
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
                  onClick={() => openEdit(comment._id)}
                >
                  <Typography variant='body2'>Edit</Typography>
                  <EditIcon fontSize='small' />
                </Box>
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
                <Button
                  variant='outlined'
                  onClick={(e) => reply(comment._id, index)}
                  disabled={replyText === '' && !changedComment.loading}
                  sx={{ width: '80px', height: '40px', mt: '1rem' }}
                >
                  {/* Reply */}
                  {changedComment.loading && !changedComment.response ? (
                    <CircularProgress color='inherit' size={'1.2rem'} />
                  ) : (
                    'Reply'
                  )}
                </Button>
              )}
            </>
          ) : (
            <></>
          )}
          {nestedComments}
        </>
      )}
    </Box>
  );
}
