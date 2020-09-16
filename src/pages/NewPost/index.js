import React from "react";
import { useHistory } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../models/Post";
import CardNewPost from "../../components/CardNewPost";

const NewPost = () => {
  const [addPost] = useMutation(CREATE_POST);
  const history = useHistory();

  const handleUpdatePost = async inputValues => {
    const payload = {
      input: {
        body: inputValues.body,
        title: inputValues.title
      }
    };
    try {
      await addPost({ variables: payload });
      //   const message = "";
      //   enqueueSnackbar(message, { variant: "success" });
      console.log("Creado");
      history.push("/");
    } catch (e) {
      console.log(e);
      //   dispatch(updateLoader(false));
      //   enqueueSnackbar("Error!", { variant: "error" });
    }
  };

  const handleNewOrUpdatePost = inputValues => {
    handleUpdatePost(inputValues);
  };
  return (
    <Layout>
      <>
        <CardNewPost handleNewOrUpdatePost={handleNewOrUpdatePost} />
      </>
    </Layout>
  );
};

export default NewPost;
