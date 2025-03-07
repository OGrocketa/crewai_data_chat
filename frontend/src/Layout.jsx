import {Outlet} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <div>
        <Outlet/>
        <ToastContainer/>
    </div>
  )
}

export default Layout