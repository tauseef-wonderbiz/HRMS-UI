import { Navigate, Outlet } from 'react-router-dom'

const UnauthenticatedRoute = () => {
  const isAuth = localStorage.getItem('Authorization')

  return !isAuth ? <Outlet /> : <Navigate to='/employeelist' />
}
export default UnauthenticatedRoute
