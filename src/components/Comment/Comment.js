import { Box, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';


export default function Comment({ comment, index}) {
  const nestedComments = (comment.replies || []).map((comment) => {
    return <Comment comment={comment} key={comment._id} index={0} />;
  });

  const sanitizedData = (text) => ({
    __html: DOMPurify.sanitize(text),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderLeft: '1px solid grey',
        marginLeft: '1rem',
        marginBottom: index === 1 ? '1rem': 0
      }}
      key={comment._id}
    >
        <Typography>{comment.postedBy.name}</Typography>
        {/* <Typography>{comment.text}</Typography> */}
        <div dangerouslySetInnerHTML={sanitizedData(comment.text)}/>
        {nestedComments}
    </Box>
  );
}
