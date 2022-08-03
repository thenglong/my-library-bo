import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useMutation } from "@tanstack/react-query"

import firebaseService from "services/firebase-service"

const { auth } = firebaseService
const provider = new GoogleAuthProvider()

const signInWithGoogle = () => signInWithPopup(auth, provider)

const useSignInGooglePopup = () => {
  const { isLoading, error, mutateAsync, mutate } =
    useMutation(signInWithGoogle)

  return {
    isLoading,
    error,
    signIn: mutate,
    signInAsync: mutateAsync,
  }
}

export default useSignInGooglePopup
