import React from 'react';
import Search from '../Search/Search';
import Trending from '../Trending/Trending';

export default function Home() {
  return (
    <div>
      <Search />
      <Trending mediaType={'movie'} />
      <Trending mediaType={'tv'} />
    </div>
  );
}
