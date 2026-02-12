import './App.css';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login/Login';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import PaymentGateway from './Pages/Components/PaymentGateway/PaymentGateway';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/Dashboard';

import UserDashboard from "./Pages/Dashboard/UserDashboard/Dashboard/Dashboard";
import SubscriptionForm from './Pages/Components/Subscriptions/SubscriptionForm';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <SignedIn>
          <UserDashboard />
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <SubscriptionForm/>
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  {
  path: "/reset-password",
  element: <ResetPassword />,
  },

  {
    path: '/Admindashboard',
    element: (
      <SignedIn>
        <AdminDashboard />
      </SignedIn>
    ),
  },

  {
    path: '/userdashboard',
    element: (
      <SignedIn>
        <UserDashboard />
      </SignedIn>
    ),
    
   },
   {
      path: "/payment-gateway",
      element: <PaymentGateway />
  },

]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;