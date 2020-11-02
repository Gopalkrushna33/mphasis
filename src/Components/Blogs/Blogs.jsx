import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./Blogs.css";

function Blogs(props) {
  const blog = props.location.state.blog;
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    props.history.push("./login");
  }
  return (
    <Fragment>
      <div className="back">
        <Link to={{ pathname: `/blogs`, state: { users:props.location.state.users } }}>
          {"<back to blogs page"}
        </Link>
      </div>
      <div className="logout">
        <Link to={{ pathname: `/login`, state: {logout:true} }}>
          {"logout"}
        </Link>
      </div>
      <div className="blogContainer">
        <h4>Blog#{blog.id}</h4>
        <div>
          <label className="label">Title:</label>
          <span> {blog.title}</span>
        </div>
        <div>
          <label className="label">Body:</label>
          <span> {blog.body}</span>
        </div>
      </div>
    </Fragment>
  );
}

export default Blogs;
