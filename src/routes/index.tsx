import { lazy } from "react"

import { Navigate, Outlet, RouteObject } from "react-router-dom"

import AppLayout from "components/layout/app-layout"
import AuthLayout from "components/layout/auth-layout"
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "constants/routes-constants"
import managementRoutes from "routes/management-routes"

const LoginPage = lazy(() => import("components/pages/sign-in-page/sign-in-page"))

export const getRoutes = (isAuth: boolean): RouteObject[] => {
  return [
    {
      path: "*",
      element: <Navigate to={isAuth ? APP_PREFIX_PATH : AUTH_PREFIX_PATH} />,
    },

    {
      path: "app",
      element: isAuth ? <AppLayout /> : <Navigate to={AUTH_PREFIX_PATH} />,
      children: [
        {
          path: "",
          element: <Navigate to="management" replace />,
        },
        {
          path: "management",
          element: <Outlet />,
          children: managementRoutes,
        },
      ],
    },

    // auth
    {
      path: AUTH_PREFIX_PATH,
      element: isAuth ? <Navigate to={APP_PREFIX_PATH} /> : <AuthLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="sign-in" />,
        },
        {
          path: `${AUTH_PREFIX_PATH}/sign-in`,
          element: <LoginPage />,
        },
        {
          path: "*",
          element: "404", // TODO
        },
      ],
    },
  ]
}
