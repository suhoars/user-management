import React from 'react';
const UserList = React.lazy(() => import('./views/UserList/index'));
const RegisterUser = React.lazy(() => import('./views/pages/register/Register'));

const routes = [
  { path: '/', exact: true, },
  { path: '/user-list', name: 'UserList', component: UserList },
  { path: '/register', exact: true, name: 'User Details', component: RegisterUser },
  { path: '/user/:id', exact: true, name: 'User Details', component: RegisterUser }
];

export default routes;
