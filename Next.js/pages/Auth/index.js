import React from "react";
import Link from "next/link";
import Users from "../../components/Users";

const index = (props) => (
  <div>
    <h1>The Auth Page {props.appName}</h1>
    <Link href="/">
      <a>Go To Main!</a>
    </Link>
    <Users name="Ghandour" age="21" />
  </div>
);

index.getInitialProps = (context) => {
  console.log(context);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: "Async Name (Auth)" });
    }, 1000);
  });
  return promise;
};

export default index;
