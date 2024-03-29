import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, TextField, Button } from "@mui/material";
import "./Login.css";
import axios from "axios";
import { __LOGIN_URL__ } from "../../utils/constants";
import { useJwt } from "react-jwt";
import { useGlobalContext } from "../../utils/Hooks/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { auth, setAuth, setInLocalStorage, removeFromLocalStorage } =
    useGlobalContext();

  const { isExpired } = useJwt(auth.token);
  // console.log("Login: ", isExpired);
  useEffect(() => {
    if (isExpired) {
      removeFromLocalStorage();
      setAuth({ token: "" });
    } else if (auth.token && !isExpired) {
      // navigate("/home");
    }
  }, [isExpired]);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(__LOGIN_URL__, {
        email,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setInLocalStorage(res.data);
          setAuth({
            token: res.data.accessToken,
            email: res.data.email,
            id: res.data._id,
          });
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="card">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="contained" fullWidth>
          {/* <Link to="/home" className="linkto"> */}
          Login
          {/* </Link> */}
        </Button>

        <p className="message">
          Create a new account{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </form>
    </Card>
  );
};

export default Login;
