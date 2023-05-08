import React from "react";
import intlTelInput from 'intl-tel-input';
import "./Register.scss";
import 'intl-tel-input/build/css/intlTelInput.css';

const Register = () => {
  const input = document.querySelector("#phone")!;
  intlTelInput(input, {
    utilsScript: "/intl-tel-input/js/utils.js?1681516311936"
  });
  return (
    <div className="register">
      <div className="container">
        <form action="">
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="*******" />
            <label htmlFor="picture">Profile Picture</label>
            <input type="file" className="picture" />
            <label htmlFor="country">Country</label>
            <input type="text" name="country" placeholder="usa" />
            <button type="submit">Sign Up</button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="">Activate the seller account</label>
              <label className="switch">
                <input type="checkbox" name="switch" />
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="">Phone Number</label>
            <input id="phone" type="tel" />
            <label htmlFor="">Description</label>
            <textarea placeholder="A short description of yourself" name="desc" cols={30} rows={10}></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
