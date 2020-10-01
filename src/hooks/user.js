import { useEffect, useState } from 'react'
import { fuego } from '@nandorojo/swr-firestore'
import { mapUserData } from '../utils/firebase'

export function useUser () {
  const currentUser = fuego.auth().currentUser
  const [isSignedIn, setSignedIn] = useState(!!currentUser)
  const [user, setUser] = useState(currentUser ? mapUserData(currentUser) : null)

  useEffect(() => {
    let unsubscribe = fuego.auth().onAuthStateChanged(user => {
      setSignedIn(!!user)
      setUser(mapUserData(user || {}))
    })
    return unsubscribe
  }, [])

  const logout = async () => {
    return fuego.auth().signOut()
      .then(() => {
        // Sign-out successful
        setSignedIn(false)
        setUser(null)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return { isSignedIn, user, logout }
}