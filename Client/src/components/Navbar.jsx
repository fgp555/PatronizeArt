import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <nav>
      <div className="bg-white  flex justify-between py-3 mt-0 px-10 rounded-sm">
        <h1 className="text-2xl ml-16 text-black font-bold">PatreonizeArt</h1>
        <div className="flex gap-x-6">
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
        </div>
      </div>
    </nav>
      
    </>
  );
};

export default Navbar;
