import React, {useEffect} from 'react'
import Search from '../Search/Search';
const { default: axios } = require('axios');

export default function Home() {

  useEffect(async ()=>{
    // const response = await axios.get(`http://localhost:3000/media/trending/all/day`);
    // console.log(response.data)
  }, [])

  return (
    <div>
      <Search />

    </div>
  );
}
