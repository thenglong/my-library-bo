import { Suspense } from "react"

import { Outlet } from "react-router-dom"

import SuspenseLoader from "components/suspense-loader"

const AuthLayout = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Outlet />
    </Suspense>
  )
}

export default AuthLayout
