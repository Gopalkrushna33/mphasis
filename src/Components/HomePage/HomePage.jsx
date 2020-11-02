import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage(props) {
  // console.log(props.history.location.state && props.history.location.state.users);
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    props.history.push("./login");
  }
  return (
    <Fragment>
      <div className="logout">
          <Link to={{ pathname: `/login`, state: {logout:true} }}>{"logout"}</Link>
        </div>
      <div className="container-fluid">
        <li>
          <Link
            to={{
              pathname: "/users",
              state: { users: [...props.location.state.users] },
            }}
          >
            User List
          </Link>
        </li>
        <li>
          <Link
            to={{
              pathname: "/blogs",
              state: { users: [...props.location.state.users] },
            }}
          >
            Blogs
          </Link>
        </li>
      </div>
    </Fragment>
  );
}

export default HomePage;
