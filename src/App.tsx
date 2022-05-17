import { Backdrop, CircularProgress } from "@mui/material"
import { useRoutes } from "react-router-dom"

import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"
import { getRoutes } from "routes"

function App() {
  const { isLoading, user: firebaseUser, error } = useFirebaseAuthState()
  const routes = getRoutes(!!firebaseUser)
  const router = useRoutes(routes)

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading)
    return (
      <Backdrop open sx={{ bgcolor: "common.white" }}>
        <CircularProgress size={64} disableShrink thickness={3} />
      </Backdrop>
    )

  return router
}

export default App
