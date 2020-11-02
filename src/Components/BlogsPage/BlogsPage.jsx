import React, { Fragment, useState, useEffect } from "react";
import { userService } from "../../service";
import { Link } from "react-router-dom";
import "./BlogsPage.css";

function BlogsPage(props) {
  const [blogsData, setBlogsData] = useState([]);
  const [search, setSearch] = useState("");
  const users = props.location.state.users;
  let usersObj = {};
  users.forEach((item) => {
    usersObj[item.id] = item;
  });
  blogsData.forEach((item) => {
    item.user = usersObj[item.userId];
  });

  const clickHandler = (data) => {
    props.history.push({
      pathname: `/blogs/${data.id}`,
      state: { blog: data, users: users },
    });
  };

  useEffect(() => {
    async function fetchData() {
      let data = await userService.getBlogs();
      setBlogsData(data.blogs);
    }
    fetchData();
  }, []);
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    props.history.push("./login");
  }
  if (blogsData) {
    return (
      <Fragment>
        <div className="logout">
          <Link to={{ pathname: `/login`, state: {logout:true} }}>{"logout"}</Link>
        </div>

        <div className="container-fluid">
          <h4>
            Filter:
            <input
              type="text"
              value={search}
              placeholder="Author name or Title"
              onChange={(e) => setSearch(e.target.value)}
            />
          </h4>
          {blogsData.map((item) => {
            if (
              item.title.includes(search) ||
              item.user.name.includes(search)
            ) {
              return (
                <div
                  className="blogsContainer"
                  key={item.id}
                  onClick={() => clickHandler(item)}
                >
                  <label className="label">Blog #{item.id}</label>
                  <div>
                    <label className="label">Title:</label>
                    <span> {item.title}</span>
                  </div>
                  <div>
                    <label className="label">Author Name:</label>
                    <span> {item.user.name}</span>
                  </div>
                </div>
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

export default BlogsPage;
