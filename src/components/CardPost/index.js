import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
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
const location = id => ({
  pathname: `/detail-post/${id}`,
  state: { fromDashboard: true }
});

const AddOrUpdatePost = () => {
  return (
    <>
      <input placeholder="Full Name" />
      <input placeholder="Email" />
      <input placeholder="Title" />
      <textarea placeholder="Body" />
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
          <h3>{`${comments.length} comments`}</h3>
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

export class CardPost extends PureComponent {
  render() {
    const {
      addPost,
      body,
      comments,
      id,
      title,
      origin,
      user,
      deleteComment
    } = this.props;
    return (
      <div className="wrapper">
        <div className="blog-post">
          <div className="container-copy">
            {!addPost ? (
              <AddOrUpdatePost />
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
              {addPost ? (
                <Link className="btn-primary" to={location(id)}>
                  Read More
                </Link>
              ) : (
                <button className="btn-primary">save post</button>
              )}
            </>
          ) : (
            <>
              <ListComments comments={comments} deleteComment={deleteComment} />
            </>
          )}
        </div>
      </div>
    );
  }
}
