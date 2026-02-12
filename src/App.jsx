import './App.css';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Pages/Login/Login';
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail';
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import PaymentGateway from './Pages/Components/PaymentGateway/PaymentGateway';
import AdminDashboard from './Pages/Dashboard/AdminDashboard/Dashboard';
import Profile from './Pages/Dashboard/UserDashboard/Profile/Profile';
import UserDashboard from "./Pages/Dashboard/UserDashboard/Dashboard/Dashboard";
import SubscriptionForm from './Pages/Components/Subscriptions/SubscriptionForm';

import BrowseJournals from './Pages/Dashboard/UserDashboard/BrowseJournals/BrowseJournals';
import UserLayout from './UserLayout';
import Subscriptions from './Pages/Dashboard/UserDashboard/Subscriptions/Subscriptions';
import Support from './Pages/Dashboard/UserDashboard/Support/Support';
import Payments from './Pages/Dashboard/UserDashboard/Payments/Payments';
import Settings from './Pages/Dashboard/UserDashboard/Settings/Settings';

const router = createBrowserRouter([
  
  {
  path: "/userdashboard",
  element: (
    <SignedIn>
      <UserLayout/>
    </SignedIn>
  ),
  children: [
    { index: true, element: <UserDashboard /> },
    { path: "browse", element: <BrowseJournals /> },
    { path: "subscriptions", element: <Subscriptions /> },
    { path: "payments", element: <Payments /> },
    { path: "profile", element: <Profile /> },
    { path: "settings", element: <Settings /> },
    { path: "support", element: <Support /> },
  ],
},{
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