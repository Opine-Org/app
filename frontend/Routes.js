import React from 'react';

import { helper, AuthorizationComponent } from 'universal-route';

import B from './components/B.js';
import A from './components/A.js';

// general components
import Logout from './components/Logout.js';

// admin components
import AdminRegister from './components/admin/Register.js';
import AdminLogin from './components/admin/Login.js';
import Dashboard from './components/admin/Dashboard.js';

const Routes = {
    '/':                    B,
    '/authorization':       [AuthorizationComponent, 'authorization'],
    '/page/:name':          A,
    '/product':             B,
    '/cart':                A,
    '/checkout':            B,
    '/receipt':             A,
    '/logout':              Logout,
    '/admin':               Dashboard,
    '/admin/login':         [AdminLogin, 'adminForm'],
    '/admin/register':      [AdminRegister, 'adminForm'],
    '/admin/products':      A,
    '/admin/product/:id':   B
};

export default helper.prepare(Routes);
