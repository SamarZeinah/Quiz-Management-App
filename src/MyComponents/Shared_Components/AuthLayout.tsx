import { Outlet, useLocation } from "react-router-dom"
import AuthImg from "../../assets/authimg.png"
import LogoWhite from "../../assets/Logo-white.png"
const AuthLayout = () => {
  const location=useLocation();
 let title = ""
  switch(location.pathname) {
    case "/forgetpassword":
      title = "Forget Password"
      break
    case "/resetpassword":
      title = "Reset Password"
      break
    case "/changepassword":
      title = "Change Password"
      break
    case "/login":
      title = "Continue your learning journey with QuizWiz!"
      break
    case "/":
      title = "Continue your learning journey with QuizWiz!"
      break
    case "/register":
      title = "Create your account and start using QuizWiz!"
      break
    default:
      title = ""
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0D1321] ">

      {/* content */}
    <div className="w-full md:w-1/2 flex flex-col items-start p-[50px] ">
      {/* logo */}
      <img 
        src={LogoWhite} 
        alt="LogoWhite" 
        className="mb-4 w-[200px] h-[45px]"
      />
      <h1 className="text-2xl font-semibold mb-[35px] text-[#C5D86D] mt-[40px] ">{title}</h1>
      <Outlet/>
    </div>

      {/* img */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-[50px] ">
        <img 
          src={AuthImg}
          alt="login"
          className="rounded-xl w-full h-full max-h-[calc(100vh-100px)] object-contain"
        />
      </div>

    </div>
  )
}

export default AuthLayout
