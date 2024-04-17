import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
const Navbar = () => {
  const {Authorized,setAuthorized,setUser} = useContext(AuthContext);

  const logouthandler = ()=>{
      setAuthorized(false);
      setUser(null);
  }

  return (
    <>
    <nav>
      <div className="bg-white  flex justify-between py-3 mt-0 px-10 rounded-sm ">
        <h1 className="text-2xl ml-16 text-black font-bold">PatreonizeArt</h1>
        <div className="flex gap-x-6">
        {Authorized ? (<>
          <button
            onClick={logouthandler}
            className="bg-blue-700 hover:bg-gray-500 text-white rounded-3xl text-base px-4 py-1"
          >
            Cerrar Session
          </button>
          <Link
            exact="true"
            to="/register"
            className="bg-blue-700  hover:bg-gray-500 border text-white  rounded-3xl text-base px-4 py-1"
          >
            Registrarse
          </Link>

        </>):(<>
        
        
          <Link
            exact="true"
            to="/login"
            className="bg-blue-700 hover:bg-gray-500 text-white rounded-3xl text-base px-4 py-1"
          >
            Iniciar sesión
          </Link>
          <Link
            exact="true"
            to="/register"
            className="bg-blue-700  hover:bg-gray-500 border text-white  rounded-3xl text-base px-4 py-1"
          >
            Registrarse
          </Link>
        </>)}
        
        
        </div>
      </div>
    </nav>
      
    </>
  );
};

export default Navbar;
