import React from 'react';
import { Fragment } from 'react';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Register from "../../components/Register/Register";

const Page = () => {
    return (
        <Fragment>
            <NavBar />
            <Register />
            <Footer />
        </Fragment>
    );
};

export default Page;
