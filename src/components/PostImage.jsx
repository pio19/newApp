import React from 'react';

const PostImage = ({ src, alt, style }) => {
  return (
    <img src={src} alt={alt} style={style} />
  );
};

export default PostImage;
