import { Backdrop, CircularProgress } from "@mui/material"
import { useRoutes } from "react-router-dom"

import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"
import { getRoutes } from "utils/routes"

function App() {
  const { isLoading, user: firebaseUser, error } = useFirebaseAuthState()
  const routes = getRoutes(!!firebaseUser)
  const router = useRoutes(routes)

  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading)
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    )

  return router
}

export default App
