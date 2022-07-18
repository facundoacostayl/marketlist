import {Navigate, Outlet} from 'react-router-dom';
import {User} from 'firebase/auth';

type Props = {
    isLoggedIn: User | null | string
}

export const PublicRoutes: React.FC<Props> = ({isLoggedIn}) => {
  return (
    !isLoggedIn ? <Outlet/> : <Navigate to="/"/>
  )
}
