import React from 'react';
import { Fragment } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Login from "../../components/Login/Login";

const LoginPage = () => {
  return (
    <Fragment>
      <NavBar />
      <Login />
      <Footer />
    </Fragment>
  );
};

export default LoginPage;