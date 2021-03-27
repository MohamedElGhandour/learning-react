import React, { Component } from "react";
import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
// import FullPost from "./FullPost/FullPost";
import asyncComponent from "../../hoc/asyncComponent";
import { Route /*Link*/, NavLink, Switch, Redirect } from "react-router-dom";
import "./Blog.css";

const AsyncNewPost = asyncComponent(() => import("./NewPost/NewPost"));

class Blog extends Component {
  state = {
    auth: true,
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="active"
                  activeStyle={{ color: "#fa923f" }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true",
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home 2</h1>} /> */}

        <Switch>
          {this.state.auth ? (
            <Route path="/new-post" exact component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Route
            render={() => (
              <h1 style={{ textAlign: "center" }}>404 Not Found</h1>
            )}
          />
          {/* <Redirect from="/" to="/posts" /> */}
          {/* <Route path="/" component={Posts} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
