import React, { useState } from "react";
import { userService } from "../../service";
import "./LoginPage.css";

function LoginPage(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [alert, setAlert] = useState("");
  const [userData, setUserData] = useState([]);
  const { email, password } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (email && password) {
      let data = await userService.login(email, password);
      if (data.error) {
        setAlert(data.error);
      } else {
        sessionStorage.setItem("user",JSON.stringify(inputs));
        setUserData(data.users);
        setLoggingIn(true);
      }
    }
  }
if(props.location.state && props.location.state.logout){
  sessionStorage.removeItem("user");
  props.location.state={};
}

  if (loggingIn) {
    props.history.push({
      pathname: "/home",
      state: { users: [...userData] },
    });
  }
  return (
    <div className="container center">
      <form name="form" className="form" onSubmit={handleSubmit}>
        {alert !== "" && <div className={`alert alert-danger`}>{alert}</div>}
        <div className="form-group">
          <label>Email Id</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !email ? " is-invalid" : "")
            }
          />
          {submitted && !email && (
            <div className="invalid-feedback">Email Id is required</div>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={
              "form-control" + (submitted && !password ? " is-invalid" : "")
            }
          />
          {submitted && !password && (
            <div className="invalid-feedback">Password is required</div>
          )}
        </div>
        <div className="form-group">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
