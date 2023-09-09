import { lazy } from 'react';


import DefaultLayout from './layout/DefaultLayout'
import Header from '@/Header';
import Home  from '@pages/Home'
import Upload  from '@pages/Upload'
import Chat from '@pages/Chat'
import Profile from './pages/Profile/Profile';

const routes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/chat',
        component: Chat,
        layout: DefaultLayout

    },
    {
        path: '/upload',
        component: Upload,
        layout: DefaultLayout,
    },
    {
        path: '/profile',
        component: Profile,
        layout: DefaultLayout,
    }
 
   
];

export { routes };
