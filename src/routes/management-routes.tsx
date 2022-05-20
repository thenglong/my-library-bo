import { lazy } from "react"

import { Navigate, RouteObject } from "react-router-dom"

const Users = lazy(() => import("components/pages/management/users"))
const SingleUser = lazy(() => import("components/pages/management/users/single"))
const Books = lazy(() => import("components/pages/management/books/book-page"))
const Invoices = lazy(() => import("components/pages/management/invoices"))
const SingleInvoice = lazy(() => import("components/pages/management/invoices/single"))

const managementRoutes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="users" replace />,
  },
  {
    path: "users",
    children: [
      {
        path: "",
        element: <Navigate to="list" replace />,
      },
      {
        path: "list",
        element: <Users />,
      },
      {
        path: "single",
        children: [
          {
            path: "",
            element: <Navigate to="1" replace />,
          },
          {
            path: ":userId",
            element: <SingleUser />,
          },
        ],
      },
    ],
  },
  {
    path: "books",
    children: [
      {
        path: "",
        element: <Navigate to="list" replace />,
      },
      {
        path: "list",
        element: <Books />,
      },
    ],
  },
  {
    path: "invoices",
    children: [
      {
        path: "",
        element: <Navigate to="list" replace />,
      },
      {
        path: "list",
        element: <Invoices />,
      },
      {
        path: "single",
        children: [
          {
            path: "",
            element: <Navigate to="1" replace />,
          },
          {
            path: ":invoiceId",
            element: <SingleInvoice />,
          },
        ],
      },
    ],
  },
]

export default managementRoutes
