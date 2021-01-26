import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

class Index extends Component {
  static async getInitialProps(context) {
    console.log(context);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ appName: "Async Name" });
      }, 1000);
    });
    return promise;
  }
  render() {
    return (
      <div>
        <h1>The Main Page {this.props.appName}</h1>
        <Link href="/Auth/">
          <a>Go To Auth!</a>
        </Link>
        <button
          onClick={() => Router.push("/Auth")}
          style={{ display: "block", margin: "10px" }}
        >
          Go To Auth
        </button>
      </div>
    );
  }
}

export default Index;
