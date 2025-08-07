import React from 'react'
import { UserProfile } from '../features/user/components/UserProfile'
import UserNavbar from '../features/navigation/components/UserNavbar'

export const UserProfilePage = () => {
  return (
    <>
    <UserNavbar/>
    <UserProfile/>
    </>
  )
}
