import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import { compose, withHandlers } from 'recompose';

const Lists = ({ onSongDelete, list }) => (
  <div>
    <ul className="collection">
      {list.map(({ id, title }) => (
        <li key={id} className="collection-item">
          {title}
          <i
            className="material-icons"
            onClick={() => onSongDelete(id)}
          >
            delete
          </i>
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

const SongList = ({
  onSongDelete,
  data: { loading, songs }
}) => {
  console.log('Props......', songs);

  return loading ? (
    <Loading />
  ) : (
    <Lists list={songs} onSongDelete={onSongDelete} />
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

// export default graphql(mutation)(graphql(query)(SongList));
export default compose(
  graphql(query),
  graphql(mutation),
  withHandlers({
    onSongDelete: ({ mutate }) => id => {
      // console.log('onsong delete', id);
      mutate({
        // past variable $id to mutation DeleteSong
        variables: {
          id
        }
      });
    }
  })
)(SongList);
