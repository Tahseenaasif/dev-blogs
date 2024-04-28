import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'
export default function OnlyAdminPrivateRoute() {
  const { currentuser } = useSelector((state) => state.user);
  return currentuser && currentuser.isAdmin=='true' ?<Outlet/>:<Navigate to='/sign-in'/>;
  
}
