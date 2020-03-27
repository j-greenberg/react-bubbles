import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const [body, setBody] = useState({username: '', password: ''})
  const [status, setStatus] = useState({loggedIn: false})
  const history = useHistory();

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (event) => {
    setBody({...body, [event.target.name]: event.target.value})
    console.log(body);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:5000/api/login', body)
      .then(res => {
        console.log("Login Successful! Token received back: ", res.data.payload)
        localStorage.setItem('token', res.data.payload)
        console.log("Token assigned to localStorage");
        setStatus({loggedIn: true})
        console.log(status.loggedIn)
        setTimeout(function(){
          history.push('/bubbles')
        }
        , 4000);
      })
      .catch(err => {
        console.log("Login Failed! Reason: ", err)
      })
    }

  return (
    <div>
      <h1>Bubble Application</h1>
      <p>Please login below: </p>
      <form>
        <label>Username: </label>
        <input type="text" name="username" value={body.username} onChange={handleChange}/>
        <label>Password: </label>
        <input type="text" name="password" value={body.password} onChange={handleChange}/>
        <button onClick={handleSubmit}>LOGIN</button>
        {status.loggedIn ? `You are logged in! Redirecting... ` : "You are currently logged out" }
      </form>
    </div>
  );
};

export default Login;
