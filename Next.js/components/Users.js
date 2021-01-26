import React from "react";

const Users = (props) => (
  <div>
    <h1>
      <p>name : {props.name}</p>
      <p>age : {props.age}</p>
    </h1>
    <style jsx>{`
      div {
        border: 1px solid #eee;
        box-shadow: 0 2p 3px #ccc;
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </div>
);

export default Users;
