import { gql } from "@apollo/client";

const GET_ALL_POST = gql`
  query($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;
const GET_POST = gql`
  query($id: ID!) {
    post(id: $id) {
      id
      body
      title
      user {
        id
        name
        email
      }
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation($id: ID!) {
    deleteComment(id: $id)
  }
`;

const UPDATE_POST = gql`
  mutation($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      body
      title
    }
  }
`;

const CREATE_POST = gql`
  mutation($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;
export { GET_ALL_POST, GET_POST, DELETE_COMMENT, UPDATE_POST, CREATE_POST };
