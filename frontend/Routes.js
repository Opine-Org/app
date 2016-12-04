import React from 'react';

import { helper, AuthorizationComponent } from 'universal-route';

import B from './components/B.js';
import A from './components/A.js';
import AdminRegister from './components/admin/Register.js';
import AdminLogin from './components/admin/Login.js';

const Routes = {
    '/':                    B,
    '/authorization':       [AuthorizationComponent, 'authorization'],
    '/page/:name':          A,
    '/product':             B,
    '/cart':                A,
    '/checkout':            B,
    '/receipt':             A,
    '/admin':               B,
    '/admin/login':         [AdminLogin, 'adminForm'],
    '/admin/logout':        B,
    '/admin/register':      [AdminRegister, 'adminForm'],
    '/admin/products':      A,
    '/admin/product/:id':   B
};

export default helper.prepare(Routes);
