import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import "./UserPage.css";

function UserPage(props) {
  const users = props.location.state && props.location.state.users;
  const [search, setSearch] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    props.history.push("./login");
  }
  if (users) {
    return (
      <Fragment>
        <div className="logout">
          <Link to={{ pathname: `/login`, state: {logout:true} }}>{"logout"}</Link>
        </div>

        <div className="container-fluid">
          <h3>
            User Filter:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </h3>
          {users.map((item) => {
            if (item.name.includes(search)) {
              return (
                <h3 key={item.id}>
                  {item.id}.{item.name}
                </h3>
              );
            }
            return <Fragment />;
          })}
        </div>
      </Fragment>
    );
  }
  return <Fragment />;
}

export default UserPage;
