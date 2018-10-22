import React from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';

const SongDetail = props => {
  console.log('songdetail', props);
  return (
    <div>
      <h3>Song Detail</h3>
    </div>
  );
};

export default graphql(fetchSong, {
  // past variable $id to fetchSong
  // options: props => ({ variables: { id: props.params.id } })
  options: ({ params: { id } }) => ({ variables: { id } })
})(SongDetail);
