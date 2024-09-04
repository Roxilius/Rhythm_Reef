import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/Home';
import PrivateRoute from './PrivateRouter';
import Products from '@/pages/Products';
import Profile from '@/pages/Profile';
import CartPage from '@/pages/CartPage';

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
        path: '/products',
        element: <Products />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute
            allowedRoles={['ADMIN', 'USER']}
            element={<Profile />}
          />
        ),
      },
      {
        path: '/cart',
        element: (
          <PrivateRoute
            allowedRoles={['ADMIN', 'USER']}
            element={<CartPage />}
          />
        ),
      },
      {
        path: '/unauthorized',
        element: <div>Unauthorized Access</div>,
      },
    ],
  },
]);

export default router;
