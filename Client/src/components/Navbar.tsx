import { useNavigate } from "react-router-dom"
function Navbar() {
  const navigate = useNavigate ();
  return (
    <>
      <div className="mb-2">
        <nav className=" border-gray-200 ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href=""
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Spinix
              </span>
           </a>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-none dark:bg-none md:dark:bg-none dark:border-none">
                <li>
                  <div
                      onClick={() => navigate("/SignUp")}
                   className="block py-2 px-3 text-white rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 dark:hover:bg-gray-700 dark:hover:text-blue-500"
                  >
                    Register
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate("/Login")}
                    className="block py-2 px-3 text-white rounded cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </div>
                </li>
                <li>
                  <div
                   className="block py-2 px-3 text-white hover:text-blue-500 cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:hover:bg-gray-700 "
                   onClick={()=> navigate("/Ai_planer")}
                >
                   <span className="text-xs absolute top-5 text-orange-500 right-[112px] animate-pulse">new</span>Ai trip Planner
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    
    </>
  )
}

export default Navbar
