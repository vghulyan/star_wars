import loadable from '@loadable/component';
import { Router } from '@remix-run/router';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';

// Lazy load components

const PlanetsLayout = loadable(() => import('../core/planets/PlanetsLayout'));
const PlanetsAll = loadable(() => import('../core/planets/all/PlanetsAll'));
const Planet = loadable(() => import('../core/planets/planet/Planet'));

const NotFoundLazy = loadable(() => import('../404/NotFound'));

const routeList: Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundLazy />,
    children: [
      { index: true, element: <Navigate replace to="planets" /> },
      {
        path: 'planets',
        element: <PlanetsLayout />,
        id: 'swPlanets',
        children: [
          {
            index: true,
            element: <PlanetsAll />
          },
          {
            path: ':planetId',
            element: <Planet />
          }
        ]
      }
    ]
  }
]);

export default routeList;
