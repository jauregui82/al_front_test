import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./style.scss";
import moment from "moment";
import { ListComments } from "../ListComments";

const randomDate = (start, end) => {
  return moment(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
  ).format("DD-MM-YYYY");
};
const locationSend = (url, id) => ({
  pathname: `/${url}/${id}`,
  state: { fromDashboard: true }
});

const AddOrUpdatePost = ({ inputValues, changeValues }) => {
  return (
    <>
      <input
        value={inputValues.name}
        placeholder="Full Name"
        name={"name"}
        onChange={e => changeValues("name", e.target.value)}
      />
      <input
        value={inputValues.email}
        placeholder="Email"
        name={"email"}
        onChange={e => changeValues("email", e.target.value)}
      />
      <input
        value={inputValues.title}
        placeholder="Title"
        name={"title"}
        onChange={e => changeValues("title", e.target.value)}
      />
      <textarea
        style={{ height: "7rem", marginBottom: "2rem" }}
        value={inputValues.title}
        placeholder="Body"
        name={"body"}
        onChange={e => changeValues("body", e.target.value)}
      />
    </>
  );
};
const ListPost = ({ comments, user, title, body }) => {
  return (
    <>
      <div className="content-date-comments">
        <h3>{randomDate(new Date(2012, 0, 1), new Date())}</h3>
        <div className="constent-comments">
          <div className="comments" />
          <h3>{`${comments?.length} comments`}</h3>
        </div>
      </div>
      <h3>
        {user?.name} - {user?.email}
      </h3>

      <h1>{title}</h1>
      <p>{body}</p>
    </>
  );
};

class CardPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: { add: false, update: false },
      inputValues: { name: "", email: "", title: "", body: "" }
    };
  }
  componentDidMount() {
    if (this.verifyUpdate()) {
      this.handleUpdatePost();
    }
  }

  verifyUpdate = () => {
    return this.props.location.pathname.split("-")[0] === "/update"
      ? true
      : false;
  };

  handleUpdatePost = () => {
    const { body, title, user } = this.props;
    this.setState(
      prevState => ({
        inputValues: {
          ...prevState.inputValues,
          name: user.name,
          email: user.email,
          title,
          body
        }
      }),
      () => {
        this.setState(prevState => ({
          flag: { ...prevState.flag, update: true }
        }));
      }
    );
  };
  changeValues = (name, value) => {
    this.setState(prevState => ({
      inputValues: { ...prevState.inputValues, [name]: value }
    }));
  };
  render() {
    const {
      comments,
      body,
      id,
      title,
      origin,
      user,
      deleteComment,
      handleNewOrUpdatePost,
      deletePost
    } = this.props;
    const { flag, inputValues } = this.state;
    return (
      <div className="wrapper">
        <div className="content-btn-action">
          {!origin || !this.verifyUpdate() ? (
            <Link
              className={"btn-standar"}
              to={locationSend("update-post", id)}
            >
              edit
            </Link>
          ) : (
            <div />
          )}
          {origin || this.verifyUpdate() ? (
            <div />
          ) : (
            <button className={"btn-standar"} onClick={() => deletePost(id)}>
              delete
            </button>
          )}
        </div>
        <div className="blog-post">
          <div className="container-copy">
            {flag.update || this.verifyUpdate() ? (
              <AddOrUpdatePost
                comments={comments}
                user={user}
                title={title}
                body={body}
                inputValues={inputValues}
                flag={flag}
                changeValues={this.changeValues}
              />
            ) : (
              <ListPost
                comments={comments}
                user={user}
                title={title}
                body={body}
              />
            )}
          </div>
          {!origin ? (
            <>
              <Link
                className="btn-primary"
                to={locationSend("detail-post", id)}
              >
                Read More
              </Link>
            </>
          ) : (
            <>
              <ListComments comments={comments} deleteComment={deleteComment} />
              {this.verifyUpdate() && (
                <button
                  className="btn-primary"
                  onClick={() => handleNewOrUpdatePost(flag, id, inputValues)}
                >
                  save post
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CardPost);
