import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import UserPage from "./Components/UserPage/UserPage";
import BlogsPage from "./Components/BlogsPage/BlogsPage";
import Blogs from "./Components/Blogs/Blogs";

import "./App.css";

function App(props) {
  return (
    <Fragment>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/login" />;
              }}
            />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/users" component={UserPage} />
            <Route exact path="/blogs" component={BlogsPage} />
            <Route exact path="/blogs/:blogId" component={Blogs} />
          </Switch>
        </Router>
    </Fragment>
  );
}

export default App;
