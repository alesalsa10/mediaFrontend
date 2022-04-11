import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const { default: axios } = require('axios');

export default function Favorites() {
  const authData = useSelector((state) => state.auth);
  const [state, setState] = useState({
    loading: true,
    response: null,
    error: null,
  });

  const getFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/favorites/all`, {
        headers: {
          Authorization: `Token ${authData.accessToken}`,
        },
      });
      console.log(response.data);
      setState({
        loading: false,
        response: response.data,
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

  useEffect(() => {
    getFavorites();
  }, []);

  return <div>Favorites</div>;
}
