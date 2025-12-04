import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex">

            <div className="w-full md:w-1/2 flex items-center justify-center p-10">
             <Outlet/>
            </div>
             <div className="w-1/2 bg-gray-100 hidden md:flex  justify-center">
              <img 
                src="https://images.unsplash.com/photo-1557683316-973673baf926"
                alt="login"
                className=" rounded-xl shadow-lg"
              />
            </div>
    </div>
    
  )
}

export default AuthLayout
