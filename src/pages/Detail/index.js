import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST, DELETE_COMMENT, UPDATE_POST } from "../../models/Post";
import CardPost from "../../components/CardPost";

const Detail = () => {
  const { id } = useParams();
  const [removeComment] = useMutation(DELETE_COMMENT);
  const [updatePost] = useMutation(UPDATE_POST);
  const history = useHistory();

  const { data, error, loading } = useQuery(GET_POST, {
    variables: { id },
    fetchPolicy: "network-only"
  });

  const deleteComment = e => {
    handleDeleteComment(e);
  };

  const handleDeleteComment = async id => {
    const payload = { id: id };
    try {
      await removeComment({ variables: payload });
      alert("Deleted comment");
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePost = async (id, inputValues) => {
    const payload = {
      id,
      input: {
        body: inputValues.body,
        title: inputValues.title
      }
    };
    try {
      await updatePost({ variables: payload });
      alert("Update post");
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleNewOrUpdatePost = (flag, id, inputValues) => {
    handleUpdatePost(id, inputValues);
  };
  return (
    <Layout>
      {loading && !error ? (
        <p>cargando...</p>
      ) : (
        <>
          <CardPost
            origin={"detail"}
            id={data?.post.id}
            title={data?.post.title}
            body={data?.post.body}
            comments={data?.post.comments.data}
            user={data?.post.user}
            deleteComment={deleteComment}
            handleNewOrUpdatePost={handleNewOrUpdatePost}
          />
        </>
      )}
    </Layout>
  );
};

export default Detail;
