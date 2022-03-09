import React from 'react';
import Search from '../../components/Search/Search';
import Trending from '../../components/Trending/Trending';

export default function Home() {
  return (
    <div>
      <Search />
      <Trending mediaType={'movie'} />
    <Trending mediaType={'tv'} />
    </div>
  );
}
