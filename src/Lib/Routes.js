import React from 'react';
import IndexPage from '../Page/IndexPage';
import NotFoundPage from '../Page/NotFoundPage';
import LoginPage from './../Page/LoginPage';
import RegisterPage from './../Page/RegisterPage';
import ForgetPWPage from './../Page/ForgetPWPage';
import { toast } from 'react-toastify';

function showToast (type,message) {
    switch(type) {
      case 0 :
        toast.warning(message);
      break;

      case 1 :
        toast.success(message);
      break;

      default:
      break;
    }
  }
const routes = [
    {
        path: "/dashboard",
        exact: false,
        main: ({history}) => <IndexPage history={ history } showToast={ showToast } />
    },
    {
        path: "/",
        exact: true,
        main: ({history}) => <LoginPage history = { history } showToast={ showToast } />
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