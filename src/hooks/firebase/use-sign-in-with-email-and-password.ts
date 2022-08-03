import {
  signInWithEmailAndPassword,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth"
import { useMutation } from "@tanstack/react-query"

import firebaseService from "services/firebase-service"

const { auth } = firebaseService

const doSignInWithEmailAndPassword = async ({
  email,
  password,
  staySignedIn = true,
}: {
  email: string
  password: string
  staySignedIn?: boolean
}) => {
  const persistence = staySignedIn
    ? browserLocalPersistence
    : browserSessionPersistence
  await auth.setPersistence(persistence)
  return signInWithEmailAndPassword(auth, email, password)
}

const useSignInWithEmailAndPassword = () => {
  const { error, isLoading, mutate, mutateAsync } = useMutation(
    doSignInWithEmailAndPassword
  )

  return {
    error,
    isLoading,
    signIn: mutate,
    signInAsync: mutateAsync,
  }
}

export default useSignInWithEmailAndPassword
