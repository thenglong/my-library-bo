import { useCallback, useEffect, useMemo } from "react"

import { onAuthStateChanged, User } from "firebase/auth"

import useLoadingValue from "hooks/use-loading-value"
import firebaseService from "services/firebase-service"

const { auth } = firebaseService

const useFirebaseAuthState = () => {
  const getCurrentUser = useCallback(() => auth.currentUser, [])
  const {
    error,
    isLoading,
    setError,
    setValue: setUser,
    value: user,
  } = useLoadingValue<User | null, Error>(getCurrentUser)

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      async (user) => {
        setUser(user)
      },
      setError
    )
  }, [setError, setUser])

  return useMemo(
    () => ({ error, isLoading: isLoading, user }),
    [error, isLoading, user]
  )
}

export default useFirebaseAuthState
