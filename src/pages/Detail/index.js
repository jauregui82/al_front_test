import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet";
import { Layout } from "../../components/Layout";
import { GET_POST, DELETE_COMMENT, UPDATE_POST } from "../../models/Post";
import CardPost from "../../components/CardPost";

const Detail = () => {
  const { id } = useParams();
  const [removeComment] = useMutation(DELETE_COMMENT);
  const [updatePost] = useMutation(UPDATE_POST);
  const history = useHistory();

  const { data, error, refetch, loading } = useQuery(GET_POST, {
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
      refetch();
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
          <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <meta name="description" content={data?.post.body} />
            <link rel="me" href="mailto:jauregui.crespo@gmail.com" />
            <link rel="me" href="sms:+56937393963" />
            <link
              rel="me"
              href="https://jauregui82.github.io/cv/"
              type="text/html"
            />
            <meta
              property="og:url"
              content="https://jauregui82.github.io/cv/"
            />
            <meta
              property="og:image"
              content="https://avatars0.githubusercontent.com/u/13053881?s=400&u=608e5c8eb29c6c8083a9128a725dbbb919622c4d&v=4"
            />
            <meta property="og:site_name" content={data?.post.body} />
            <meta property="og:description" content={data?.post.body} />
          </Helmet>
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
