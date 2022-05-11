import { lazy } from "react"

import { Navigate, Outlet, RouteObject } from "react-router-dom"

import AppLayout from "components/layout/app-layout/app-layout"
import AuthLayout from "components/layout/auth-layout"
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "constants/routes-constants"

const LoginPage = lazy(() => import("components/pages/login-page"))

export const getRoutes = (isAuth: boolean): RouteObject[] => {
  return [
    {
      path: "*",
      element: <Navigate to={isAuth ? APP_PREFIX_PATH : AUTH_PREFIX_PATH} />,
    },

    {
      path: APP_PREFIX_PATH,
      element: isAuth ? <AppLayout /> : <Navigate to={AUTH_PREFIX_PATH} />,
      children: [
        {
          path: "app",
          element: <Outlet />,
          children: [
            {
              path: "",
              element: <Navigate to="" />,
            },
          ],
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
