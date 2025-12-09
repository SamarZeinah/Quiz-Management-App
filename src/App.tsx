import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './MyComponents/Shared_Components/AuthLayout'
import Login from './MyComponents/Authentication/Login'
import Register from './MyComponents/Authentication/Register'
import ForgetPassword from './MyComponents/Authentication/ForgetPassword'
import ResetPassword from './MyComponents/Authentication/ResetPassword'
import ChangePassword from './MyComponents/Authentication/ChangePassword'
import NotFound from './MyComponents/Shared_Components/NotFound'
import { Toaster } from './components/ui/toaster'

function App() {
 const routes=createBrowserRouter([
{
  path:"",
  element:<AuthLayout/>,
  errorElement:<NotFound/>,
  children:[
    {path:"",element:<Login/>},
    {path:"/login",element:<Login/>},
    {path:"/register",element:<Register/>},
    {path:"/forgetpassword",element:<ForgetPassword/>},
    {path:"/resetpassword",element:<ResetPassword/>},
    {path:"/changepassword",element:<ChangePassword/>}

  ]
}
    ])
  return (
   <>
   <Toaster  />
   <RouterProvider router={routes}></RouterProvider>

   </>
  )
}

export default App
