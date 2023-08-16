import { lazy } from 'react';


import DefaultLayout from './layout/DefaultLayout'
import Home  from '@pages/Home'
import Upload  from '@pages/Upload'


const routes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/upload',
        component: Upload,
        layout: DefaultLayout,
    },
   
];

export { routes };
