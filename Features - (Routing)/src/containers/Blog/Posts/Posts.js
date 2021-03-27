import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const postsUpdated = posts.map((post) => {
          return {
            ...post,
            author: "Mohamed Elghandour",
          };
        });
        this.setState({ posts: postsUpdated });
        // console.log(response.data[0]);
      })
      .catch((err) => {
        // this.setState({error:true})
        // console.log(err)
      });
  }
  postSelectedHandler = (id) => {
    this.props.history.push({ pathname: `${this.props.match.url}/${id}` });
  };
  render() {
    let posts = <p>Something Went Wrong.</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => (
        // <Link to={`/posts/${post.id}`} key={post.id}>
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
        /* </Link> */
      ));
    }
    return (
      <div>
        <section className="Posts">{posts}</section>;
        <Route
          path={`${this.props.match.url}/:id`}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}
export default Posts;
