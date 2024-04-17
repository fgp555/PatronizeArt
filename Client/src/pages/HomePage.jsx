
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigation = useNavigate();    
  const {Authorized,setAuthorized, setLoggedIn,setUser} = useContext(AuthContext);
  
  const clientID =
    "413068305228-4prm49plvd4d3csv1pf3cp3lvd4mlu80.apps.googleusercontent.com";
  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  useEffect(() => {
    if (Authorized) navigation("/dashboard")
  }, [Authorized]);
  const onSuccess = async (response) => {
    try {
      // Envía los datos del usuario al backend utilizando una solicitud HTTP POST
      const res = await fetch('http://localhost:3000/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setAuthorized(true);
        setLoggedIn(true)
        setUser(data)
      } else {
        // Maneja errores de la respuesta del backend
        console.error('Error al enviar datos del usuario al backend');
      }
    } catch (error) {
      // Maneja errores de la solicitud HTTP
      console.error('Error al enviar la solicitud al backend:', error);
    }
  };
  const onFailure = () => {
    console.log("Hubo un error");
  };
  return (
    <>
      <div className="flex">
        <div className="bg-blue-700 h-screen w-full flex items-center justify-center">
          <div className="">
            <h1 className=" font-semibold  text-white text-5xl">Bienvenido</h1>
            <h2 className="mt-4 tracking-tight text-white text-5xl">
              Registrate o Ingresa
            </h2>
            <p className="mt-6 text-base leading-7 text-white">
              Esperamos Tengas una excelente Experiencia
            </p>
          </div>
        </div>
        <main className="flex min-h-screen place-items-center w-full  justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center rounded-md border-solid  ">
            <div className="mt-10 flex items-center justify-center gap-x-6">
            
              <form>
                <input
                  type="email"
                  className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="email"
                ></input>

                <input
                  type="password"
                  className="w-full bg-blue-700 text-white px-4 py-2 rounded-md my-2"
                  placeholder="password"
                ></input>

                <div className="flex justify-between py-5">
                  <button
                    type="submit"
                    className="bg-blue-700 hover:bg-gray-500 text-white rounded-3xl px-4 py-2"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="bg-blue-700 hover:bg-gray-500 text-white rounded-3xl px-4 py-2"
                   
                  >
                    Register here
                  </button>
                  
                  <div className="btn" >
                    <GoogleLogin
                      clientId={clientID}
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_policy"}
                    ></GoogleLogin>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Welcome;
