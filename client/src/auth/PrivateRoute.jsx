import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const PrivateRoute = () => {
  const user = useSelector(state => state.auth.user)
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`https://task-manager-kymn.onrender.com/auth/tokencheck`, {
        method: 'POST',
        body: JSON.stringify({ token: cookies.token }),
        headers: { 'Content-Type': 'application/json' },
      })
  
      if (!response.ok) {
        if (response.status === 400) console.log('Missing credentials')
        else if (response.status === 404)
          console.log('Invalid email and/or password')
        else console.log('Something went wrong...')
      } else {
        const data = await response.json()
        console.log({data});
        // setCookie("token", data)
        // dispatch(setAuth(data))
        // navigate('/')
      }
  
    } catch (error) {
      console.log(error)
    }

  }

  // console.log(cookies.token);

  return (
    <Outlet /> 
  )

  // if(!cookies.token){
  //   return <Navigate to="/login" />
  // }
  // return (
  //   <Outlet /> 
  // )
}

export default PrivateRoute