import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import ReplyIcon from '@mui/icons-material/Reply';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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
}) {
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //const [isOpen, setIsOpen] = useState(false);
  const nestedComments = (comment.replies || []).map((comment) => {
    //console.log(openedReplyId)
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
      />
    );
  });

  const sanitizedData = (text) => ({
    __html: DOMPurify.sanitize(text),
  });

  // const replyClick = () => {
  //   setIsOpen(!isOpen);
  // };

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
        marginLeft: '0.5rem',
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
      <div dangerouslySetInnerHTML={sanitizedData(comment.text)} />
      {authData.isAuth ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer',
            '&:hover': { color: 'primary.main' },
            mb: '0.3rem',
            width: 'fit-content',
          }}
          onClick={() => openReply(comment._id)}
        >
          <Typography variant='body2'>Reply</Typography>
          <ReplyIcon fontSize='small' />
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

          <Button
            variant='outlined'
            onClick={(e) => reply(comment._id, index)}
            disabled={replyText === ''}
            sx={{ width: 'fit-content', mt: '1rem' }}
          >
            Reply
          </Button>
        </>
      ) : (
        <></>
      )}
      {nestedComments}
    </Box>
  );
}
