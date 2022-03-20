import React, {useState, useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';

const { default: axios } = require('axios');

export default function Overview() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState('loading');

  let params = useParams();
  console.log(params);
  const location = useLocation();
  

  const getMediaById = async() =>{
    //http://localhost:3000/media/getById/movie/1420
    try{
      const response = await axios.get(
        `http://localhost:3000/media/getById/${params.mediaType}/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
      setError();
      setStatus('idle');
    }catch(error){
      console.log(error);
      setError(error.data.response.Msg);
      setData();
      setStatus('idle');
    }
  }

  const getBookById = async () => {
    //http://localhost:3000/book/e3_6vQEACAAJ
    try {
      const response = await axios.get(
        `http://localhost:3000/book/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
      setError();
      setStatus('idle');
    } catch (error) {
      console.log(error);
      setError(error.data.response.Msg);
      setData();
      setStatus('idle');
    }
  };


  const getBookByIsbn = async () =>{
    //http://localhost:3000/book/isbn/1101885688
    try {
      const response = await axios.get(
        `http://localhost:3000/book/isbn/${params.id}`
      );
      console.log(response.data);
      setData(response.data);
      setError();
      setStatus('idle');
    } catch (error) {
      console.log(error);
      setError(error.data.response.Msg);
      setData();
      setStatus('idle');
    }
  }

  useEffect(() =>{
    //getMediaById()
    if(params.mediaType === 'movie' || params.mediaType === 'tv'){
      getMediaById()
    }else if(location.pathname.includes('isbn')){
      getBookByIsbn()
    }else if(params.mediaType === 'book'){
      getBookById()
    }else {
      setError('Invalid media type')
    }
  }, [])

  return (
    <div>Overview</div>
  )
}
