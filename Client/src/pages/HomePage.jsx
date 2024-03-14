import { Link } from "react-router-dom";

const Welcome= () => {
    return (
      <>
     <div className="flex justify-center h-screen align-middle ">
        <main className="grid min-h-screen place-items-center w-full  justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center rounded-md border-solid border-2 ">
        <p className=" font-semibold text-blue-600 text-5xl">Bienvenido</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-500 sm:text-5xl">Registrate o Ingresa</h1>
        <p className="mt-6 text-base leading-7 text-gray-500">Esperamos Tengas una excelente Experiencia</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link to={"/login"} className="bg-blue-700 hover:bg-gray-500 text-white rounded-3xl px-4 py-2">
        Iniciar sesión</Link> 
        <Link  to={"/register"} className="bg-blue-700 hover:bg-gray-500 text-white rounded-3xl px-4 py-2">
        Registrarse
        </Link>
       
        </div>
      </div>
    </main>
      </div>
      </>
      
      
    );
  };
  
  export default Welcome;
  