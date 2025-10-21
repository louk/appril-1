import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { ExplorePage } from '@/pages/ExplorePage';
import { AppDetailPage } from '@/pages/AppDetailPage';
import { SecondaryMarketPage } from '@/pages/SecondaryMarketPage';
import { DevelopersPage } from '@/pages/DevelopersPage';
import { CompanyPage } from '@/pages/CompanyPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { AccountPage } from '@/pages/AccountPage';
import { Profile } from '@/components/page/account/Profile';
import { MyPurchases } from '@/components/page/account/MyPurchases';
import { PaymentHistory } from '@/components/page/account/PaymentHistory';
import { DeveloperDetailPage } from '@/pages/DeveloperDetailPage';
// Developer Portal Imports
import { DevLayout } from '@/components/layout/DevLayout';
import { DashboardPage } from '@/pages/dev/DashboardPage';
import { ProjectsPage } from '@/pages/dev/ProjectsPage';
import { ProductsPage } from '@/pages/dev/ProductsPage';
import { CreateProjectPage } from '@/pages/dev/CreateProjectPage';
import { CreateProductPage } from '@/pages/dev/CreateProductPage';
import { TeamsPage } from '@/pages/dev/TeamsPage';
import { CouponsPage } from '@/pages/dev/CouponsPage';
import { DocsPage } from '@/pages/dev/DocsPage';
import { ApiDocs } from '@/components/page/dev/docs/ApiDocs';
import { GuidesDocs } from '@/components/page/dev/docs/GuidesDocs';
import { DevAccountPage } from '@/pages/dev/DevAccountPage';
const router = createBrowserRouter([
  // User Portal Routes
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/app/:slug",
    element: <AppDetailPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/market",
    element: <SecondaryMarketPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/developers",
    element: <DevelopersPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/developers/:id",
    element: <DeveloperDetailPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/company/:page",
    element: <CompanyPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/account",
    element: <AccountPage />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/account/profile" replace /> },
      { path: "profile", element: <Profile /> },
      { path: "purchases", element: <MyPurchases /> },
      { path: "history", element: <PaymentHistory /> },
    ],
  },
  // Developer Portal Routes
  {
    path: "/dev",
    element: <DevLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/dev/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/new", element: <CreateProjectPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/new", element: <CreateProductPage /> },
      { path: "teams", element: <TeamsPage /> },
      { path: "coupons", element: <CouponsPage /> },
      {
        path: "docs",
        element: <DocsPage />,
        children: [
          { index: true, element: <Navigate to="/dev/docs/api" replace /> },
          { path: "api", element: <ApiDocs /> },
          { path: "guides", element: <GuidesDocs /> },
        ],
      },
      { path: "account", element: <DevAccountPage /> },
    ]
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)