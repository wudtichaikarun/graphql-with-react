import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

const Lists = ({ list }) => (
  <div>
    <ul className="collection">
      {list.map((song, index) => (
        <li key={song.id} className="collection-item">
          {song.title}
        </li>
      ))}
    </ul>
    <Link
      to="/songs/new"
      className="btn-floating btn-large red right"
    >
      <i className="material-icons">add</i>
    </Link>
  </div>
);

const Loading = () => <div>Loading...</div>;

const SongList = ({ data: { loading, songs } }) => {
  console.log('Props......', songs);

  return loading ? <Loading /> : <Lists list={songs} />;
};

export default graphql(query)(SongList);
