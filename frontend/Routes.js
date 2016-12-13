import React from 'react';

import { helper, AuthorizationComponent } from 'universal-route';

// general components
import HomePage from './components/HomePage.js';
import Logout from './components/Logout.js';

// admin components
import AdminRegister from './components/admin/Register.js';
import AdminLogin from './components/admin/Login.js';
import Dashboard from './components/admin/Dashboard.js';

const Routes = {
    '/':                    HomePage,
    '/logout':              Logout,
    '/authorization':       [AuthorizationComponent, 'authorization'],
    '/admin':               [Dashboard, 'adminDashboard'],
    '/admin/login':         [AdminLogin, 'adminForm'],
    '/admin/register':      [AdminRegister, 'adminForm']
};

export default helper.prepare(Routes);
