import React, { useEffect } from 'react';
import Search from '../../components/Search/Search';
import Trending from '../../components/Trending/Trending';

export default function Home() {
  useEffect(() => {
    document.title = 'Media World';
  }, []);
  return (
    <div>
      <Search />
      <Trending mediaType={'movie'} />
      <Trending mediaType={'tv'} />
    </div>
  );
}
