import React from 'react';
import { useParams } from 'react-router-dom';
import List from '../List/List';

export default function ListWrapper() {
    let params = useParams();
  return (
    <List 
    key={params.mediaType + params.listType}
    mediaType={params.mediaType} listType={params.listType} />
  )
}
