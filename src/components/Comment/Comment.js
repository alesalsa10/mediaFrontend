import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import ReplyIcon from '@mui/icons-material/Reply';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

export default function Comment({
  comment,
  isFirst,
  index,
  replyText,
  handleReply,
  reply,
}) {
  const [isOpen, setIsOpen] = useState(false);
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
      />
    );
  });

  const sanitizedData = (text) => ({
    __html: DOMPurify.sanitize(text),
  });

  const replyClick = () => {
    setIsOpen(!isOpen);
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderLeft: '1px solid grey',
        marginLeft: '1rem',
        marginBottom: isFirst ? '1rem' : 0,
        pl: 1,
      }}
      key={comment._id}
    >
      <Typography>{comment.postedBy.name}</Typography>
      <div dangerouslySetInnerHTML={sanitizedData(comment.text)} />
      <ReplyIcon onClick={replyClick} />
      {isOpen ? (
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
