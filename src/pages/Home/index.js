import React, { Component } from "react";
import { gql } from "@apollo/client";
import client from "../../config/apollo";
import { Layout } from "../../components/Layout";
import CardPost from "../../components/CardPost";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: [],
      loading: false,
      paginate: { page: 1, limit: 10 }
    };
  }
  componentDidMount() {
    this.setData();
  }

  handleGetMoreData = () => {
    const { paginate } = this.state;
    this.setState(
      prevState => ({
        paginate: { ...prevState.paginate, limit: paginate.limit + 10 }
      }),
      () => {
        this.setData();
      }
    );
  };

  handleNewOrUpdatePost = (flag, id, values) => {
    this.updatDataPost(id, values);
  };

  setData = () => {
    this.setState({ loading: true });
    const { paginate } = this.state;
    client
      .query({
        query: gql`,
            {
                posts(options: {paginate:{page:${paginate.page}, limit:${paginate.limit}}}) {
                    data {
                        id
                        title
                        body
                        comments{
                            data{
                              id
                            }
                        }
                        user{
                            id
                            name
                            email
                        }
                    }
                    meta {
                        totalCount
                    }
                }
            }
        `
      })
      .then(result => {
        this.setState({ initialData: result.data }, () => {
          this.setState({ loading: false });
        });
      });
  };

  deletePost = id => {
    this.setState({ loading: true });
    fetch("https://graphqlzero.almansi.me/api", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation{
            deletePost(id: ${id})
        }`
      })
    })
      .then(res => res.json())
      .then(res => {
        alert("Delete post");
        this.setState({ loading: false });
      });
  };
  render() {
    const { initialData, loading } = this.state;
    return (
      <>
        <Layout
          handleAddNewPost={this.handleAddNewPost}
          count={initialData?.posts?.data}
        >
          {loading ? (
            <p>cargando...</p>
          ) : (
            <>
              {initialData?.posts?.data.map(item => {
                return (
                  <CardPost
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    body={item.body}
                    comments={item.comments.data}
                    user={item.user}
                    deletePost={this.deletePost}
                  />
                );
              })}
              {initialData?.posts?.data.length <
                initialData?.posts?.meta?.totalCount && (
                <button
                  className={"btn-standar"}
                  onClick={this.handleGetMoreData}
                >
                  load more
                </button>
              )}
            </>
          )}
        </Layout>
      </>
    );
  }
}

export default Home;
