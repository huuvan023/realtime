import React from 'react';
import IndexPage from '../Page/IndexPage';
import NotFoundPage from '../Page/NotFoundPage';
import LoginPage from './../Page/LoginPage';
import RegisterPage from './../Page/RegisterPage';
import ForgetPWPage from './../Page/ForgetPWPage';

const routes = [
    {
        path: "/dashboard",
        exact: true,
        main: () => <IndexPage/>
    },
    {
        path: "/",
        exact: true,
        main: () => <LoginPage/>
    },
    {
        path: "/forgetpassword",
        exact: true,
        main: () => <ForgetPWPage/>
    },
    {
        path: "/register",
        exact: true,
        main: () => <RegisterPage/>
    },
    {
        path: "",
        exact: false,
        main: () => <NotFoundPage />
    }
]
export default routes;