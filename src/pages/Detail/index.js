import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POST, DELETE_COMMENT } from "../../models/Post";
import { CardPost } from "../../components/CardPost";

const Detail = () => {
  const { id } = useParams();
  const [removeComment] = useMutation(DELETE_COMMENT);

  const { data, error, loading } = useQuery(GET_POST, {
    variables: { id },
    fetchPolicy: "network-only"
  });
  console.log(loading, data, error);
  const deleteComment = e => {
    console.log(e);
    handleAddAccountBank(e);
  };
  const handleAddAccountBank = async id => {
    const payload = { id: id };
    try {
      await removeComment({ variables: payload });
      //   const message = "La cuenta bancaria ha sido creada.";
      //   enqueueSnackbar(message, { variant: "success" });
      console.log("borrado");
    } catch (e) {
      console.log(e);
      //   dispatch(updateLoader(false));
      //   enqueueSnackbar("Error!", { variant: "error" });
    }
  };
  return (
    <Layout>
      {loading ? (
        <p>cargando...</p>
      ) : (
        <>
          <CardPost
            origin={"detail"}
            id={data.post.id}
            title={data.post.title}
            body={data.post.body}
            comments={data.post.comments.data}
            user={data.post.user}
            deleteComment={deleteComment}
          />
        </>
      )}
    </Layout>
  );
};

export default Detail;
