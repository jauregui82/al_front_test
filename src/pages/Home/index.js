import React, { Component } from "react";
import { gql } from "@apollo/client";
import client from "../../config/apollo";
import { Layout } from "../../components/Layout";
import { CardPost } from "../../components/CardPost";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: [],
      loading: false,
      paginate: { page: 1, limit: 6 }
    };
  }
  componentDidMount() {
    this.setData();
  }

  handleGetMoreData = () => {
    const { paginate } = this.state;
    this.setState(
      prevState => ({
        paginate: { ...prevState.paginate, limit: paginate.limit * 2 }
      }),
      () => {
        this.setData();
      }
    );
  };
  handleAddNewPost = () => {
    console.log("add");
  };

  setData = () => {
    this.setState({ loading: true });
    const { paginate } = this.state;
    client
      .query({
        query: gql`
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
        console.log(result.data);
      });
  };
  render() {
    const { initialData, loading } = this.state;
    return (
      <>
        <Layout handleAddNewPost={this.handleAddNewPost}>
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
                  />
                );
              })}
              {initialData?.posts?.data.length <
                initialData?.posts?.meta?.totalCount && (
                <button onClick={this.handleGetMoreData}>load more</button>
              )}
            </>
          )}
        </Layout>
      </>
    );
  }
}

export default Home;
