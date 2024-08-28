import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import PrivateRoute from './PrivateRouter';

// Define the routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/admin-dashboard',
        element: (
          <PrivateRoute
            allowedRoles={['ADMIN']}
            element={<Home />}
          />
        ),
      },
      {
        path: '/user-dashboard',
        element: (
          <PrivateRoute
            allowedRoles={['USER', 'ADMIN']}
            element={<Home />}
          />
        ),
      },
      {
        path: '/unauthorized',
        element: <div>Unauthorized Access</div>, // Optional: Create a dedicated Unauthorized component
      },
    ],
  },
]);

export default router;
