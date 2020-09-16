import React, { Component } from "react";
import "./style.scss";

class CardNewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValues: { name: "", email: "", title: "", body: "" }
    };
  }

  changeValues = (name, value) => {
    this.setState(prevState => ({
      inputValues: { ...prevState.inputValues, [name]: value }
    }));
  };
  render() {
    const { handleNewOrUpdatePost } = this.props;
    const { inputValues } = this.state;
    return (
      <div className="wrapper">
        <div className="blog-post">
          <div className="container-copy">
            <input
              value={inputValues.name}
              placeholder="Full Name"
              name={"name"}
              onChange={e => this.changeValues("name", e.target.value)}
            />
            <input
              value={inputValues.email}
              placeholder="Email"
              name={"email"}
              onChange={e => this.changeValues("email", e.target.value)}
            />
            <input
              value={inputValues.title}
              placeholder="Title"
              name={"title"}
              onChange={e => this.changeValues("title", e.target.value)}
            />
            <textarea
              style={{ height: "7rem", marginBottom: "2rem" }}
              value={inputValues.title}
              placeholder="Body"
              name={"body"}
              onChange={e => this.changeValues("body", e.target.value)}
            />
          </div>
          <button
            className="btn-primary"
            onClick={() => handleNewOrUpdatePost(inputValues)}
          >
            save post
          </button>
        </div>
      </div>
    );
  }
}

export default CardNewPost;
