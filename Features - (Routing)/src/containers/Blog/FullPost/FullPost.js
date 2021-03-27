import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    console.log(this.props);
    this.loadData();
  }
  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost &&
          this.state.loadedPost.id !== +this.props.match.params.id)
      ) {
        axios.get("/posts/" + this.props.match.params.id).then((response) => {
          // console.log(response);
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }
  deletedPostHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then((response) => {
      console.log(response);
    });
  };
  render() {
    let post = (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Please select a Post!
      </p>
    );
    console.log(this.props);
    if (this.props.match.params.id)
      post = (
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Loading!</p>
      );

    if (this.state.loadedPost)
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletedPostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    return post;
  }
}

export default FullPost;
