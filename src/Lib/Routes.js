import React from 'react';
import IndexPage from '../Page/IndexPage';
import NotFoundPage from '../Page/NotFoundPage';

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <IndexPage/>
    },
    {
        path: "",
        exact: false,
        main: () => <NotFoundPage />
    }
]
export default routes;