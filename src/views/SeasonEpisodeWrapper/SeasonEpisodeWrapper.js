import React from 'react';
import { useParams } from 'react-router-dom';
import Season from '../Season/Season';


export default function SeasonEpisodeWrapper() {
  const params = useParams();
  return (
    <Season
      key={params.seasonNumber + params.episodeNumber + params.id}
      seasonNumber={params.seasonNumber}
      episodeNumber={params.episodeNumber}
      id={params.id}
      mediaType={params.mediaType}
      params={params}
    />
  );
}
