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
import Dashboard from './MyComponents/Dashboard/Dashboard'
import DashboardLayout from './MyComponents/Dashboard/DashboardLayout'
import ProtectedRoute from './MyComponents/Shared_Components/ProtectedRoute'
import { AuthProvider } from './MyComponents/Context/AuthContext'
import Students from './MyComponents/Students/Students'
import Questions from './MyComponents/Questions/Questions'
import Quizzes from './MyComponents/Quizzes/Quizzes'
import Results from './MyComponents/Results/Results'
import GroupsList from './MyComponents/Groups/GroupsList'
import GroupsData from './MyComponents/Groups/GroupsData'

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
},

{
      path: "dashboard",
      element: (
        // <ProtectedRoute>
          <DashboardLayout />
        // </ProtectedRoute>
      ),
      children: [ 
        { path: "", element: <Dashboard /> },
        { path: "students", element: <Students /> },
        { path: "questions", element: <Questions /> },
        { path: "groups", element: <GroupsList/> },
        {path:"new-group",element: <GroupsData/>  },
        {path:"groups-data/:group_id",element: <GroupsData/>  },
        { path: "quizzes", element: <Quizzes /> },
        { path: "results", element: <Results /> },
      ],
    },
  ]);

    
  return (
   <>
   <AuthProvider>
   <Toaster  />
   <RouterProvider router={routes}></RouterProvider>
</AuthProvider>
   </>
  )
}

export default App
