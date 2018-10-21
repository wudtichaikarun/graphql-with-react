import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Lists = ({ list }) => (
  <ul>
    {list.map((song, index) => (
      <li key={song.id}>{song.title}</li>
    ))}
  </ul>
);

const Loading = () => <div>Loading...</div>;

const SongList = ({ data: { loading, songs } }) => {
  console.log('Props......', songs);

  return loading ? <Loading /> : <Lists list={songs} />;
};

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
