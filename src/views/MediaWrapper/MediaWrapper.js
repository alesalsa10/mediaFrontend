import React from 'react';
import Media from '../Media/Media';
import { useLocation } from 'react-router-dom';

export default function MediaWrapper() {
  const location = useLocation();
  return <Media key={location.pathname} />;
}
