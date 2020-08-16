import React from 'react';
import IndexPage from '../Page/IndexPage';
import NotFoundPage from '../Page/NotFoundPage';
import LoginPage from './../Page/LoginPage';
import RegisterPage from './../Page/RegisterPage';
import ForgetPWPage from './../Page/ForgetPWPage';

const routes = [
    {
        path: "/dashboard",
        exact: false,
        main: ({history}) => <IndexPage history={ history }  />
    },
    {
        path: "/",
        exact: true,
        main: ({history}) => <LoginPage history = { history } />
    },
    {
        path: "/forgetpassword",
        exact: false,
        main: ({history}) => <ForgetPWPage history={ history }/>
    },
    {
        path: "/register",
        exact: false,
        main: ({history}) => <RegisterPage history = { history } />
    },
    {
        path: "",
        exact: false,
        main: () => <NotFoundPage />
    }
]
export default routes;