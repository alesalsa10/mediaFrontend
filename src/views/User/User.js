import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const { default: axios } = require('axios');

export default function User() {
  const params = useParams();
  const [state, setState] = useState({
    response: null,
    loading: true,
    error: null,
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users/${params.username}`
      );
      console.log(response.data);
      setState({
        response: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setState({
        loading: false,
        response: null,
        error: error.response.data.Msg,
      });
    }
  };

  useEffect(()=>{
    getUser()
  }, [params.username])

  return <div>User</div>;
}
