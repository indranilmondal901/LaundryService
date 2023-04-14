import React from 'react';
import "../login/Login.css";

const Login = () => {
  return (
    <div id="loginMainDiv">
      <div id='loginHeading'>Sign In</div>
      <form id='loginForm'>
        <div>
          <input type="email" placeholder='Email' />
        </div>
        <br />
        <div>
          <input type='password' placeholder='password' />
        </div>
      </form>
    </div>
  )
}

export default Login
