import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const isAuth = localStorage.getItem('Authorization')

  return isAuth ? <Outlet /> : <Navigate to='/' />
}
export default PrivateRoute
