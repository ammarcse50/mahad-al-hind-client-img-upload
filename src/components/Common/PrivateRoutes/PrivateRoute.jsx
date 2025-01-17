import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
  //  const navigate = useNavigate()

  //  const from = location.state?.from;

  const { user ,loading} = useAuth();
   if(loading)
   {
    return <div className=" flex justify-center items-center h-screen"><span className="loading loading-ring loading-lg"></span></div> 
   }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"}  replace></Navigate>;
};

export default PrivateRoute;
