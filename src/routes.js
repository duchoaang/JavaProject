import { lazy } from 'react';


const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const Home = lazy(() => import('@pages/Home'));


const routes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    }
   
];

export { routes };
