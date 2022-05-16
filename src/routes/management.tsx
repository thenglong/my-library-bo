import { lazy } from "react"

import { Navigate, RouteObject } from "react-router-dom"

const Users = lazy(() => import("components/pages/management/Users"))
const SingleUser = lazy(
  () => import("components/pages/management/Users/single")
)
const Books = lazy(() => import("components/pages/management/books"))
const Invoices = lazy(() => import("components/pages/management/Invoices"))
const SingleInvoice = lazy(
  () => import("components/pages/management/Invoices/single")
)
const Products = lazy(() => import("components/pages/management/Products"))
const CreateProduct = lazy(
  () => import("components/pages/management/Products/create")
)
const SingleProduct = lazy(
  () => import("components/pages/management/Products/single")
)

const Shop = lazy(() => import("components/pages/management/Products/shop"))

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
    path: "commerce",
    children: [
      {
        path: "",
        element: <Navigate to="shop" replace />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "products",
        children: [
          {
            path: "",
            element: <Navigate to="list" replace />,
          },
          {
            path: "list",
            element: <Products />,
          },
          {
            path: "create",
            element: <CreateProduct />,
          },
          {
            path: "single",
            children: [
              {
                path: "",
                element: <Navigate to="1" replace />,
              },
              {
                path: ":productId",
                element: <SingleProduct />,
              },
            ],
          },
        ],
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
