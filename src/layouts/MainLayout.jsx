import React from 'react';
import Navber from "./Navbar";
import { Outlet } from 'react-router';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <>
            <Navber />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;