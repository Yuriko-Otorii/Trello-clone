import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from "react-cookie";


const PrivateRoute = () => {
  const user = useSelector(state => state.auth.user)

  if(!user){
    return <Navigate to="/login" />
  }
  return (
      <Outlet /> 
  )
}

export default PrivateRoute