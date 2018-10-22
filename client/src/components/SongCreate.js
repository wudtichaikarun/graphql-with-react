import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {
  compose,
  withState,
  withHandlers,
  withStateHandlers
} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

const SongCreate = ({
  handleChange,
  handleSubmit,
  title
}) => {
  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a New Song</h3>
      <form onSubmit={event => handleSubmit(event)}>
        <label>Song Title:</label>
        <input
          onChange={event =>
            handleChange(event.target.value)
          }
          value={title}
        />
        <p>{title}</p>
      </form>
    </div>
  );
};

export default compose(
  graphql(mutation),
  withStateHandlers(
    () => ({
      title: ''
    }),
    {
      handleChange: ({ title }) => value => {
        // console.log('handleChange', value, title);
        return { title: value };
      }
    }
  ),
  withHandlers({
    handleSubmit: ({ mutate, title }) => event => {
      event.preventDefault();
      mutate({
        // past variable $title to mutation AddSong
        variables: {
          title
        },
        // refetch another component (SongList)
        refetchQueries: [{ query }]
      })
        .then(() => hashHistory.push('/'))
        .catch(() => {
          console.log('Error! create fail');
        });
    }
  })
)(SongCreate);
