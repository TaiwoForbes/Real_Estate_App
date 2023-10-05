import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useGlobalContext } from "./context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaHome, FaBars } from "react-icons/fa";

const Header = () => {
  const [pageState, setpageState] = useState("Sign In");
  const navigate = useNavigate();

  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext();
  const displaySubmenu = (e) => {
    const page = e.target.textContent;
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;

    openSubmenu(page, { center, bottom });
  };

  const handleSubMenu = (e) => {
    if (!e.target.classList.contains("link-btn")) {
      closeSubmenu();
    }
  };

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setpageState("Profile");
      } else {
        setpageState("Sign In");
      }
    });
  }, [auth]);

  const location = useLocation();
  const pathMatchRoutes = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };
  return (
    <>
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-3 max-w-7xl mx-auto ">
          <div className="lg:hidden">
            <button className="btn toggle-btn" onClick={openSidebar}>
              <FaBars />
            </button>
          </div>
          <Link to="/">
            <div className="flex items-center justify-center text-green-500 font-bold text-xl cursor-pointer">
              +<FaHome />
              <h1>AddHomes</h1>
            </div>
          </Link>

          <div className="hidden lg:block">
            <ul className="flex space-x-10 ">
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoutes("/") && "text-blac k border-b-red-500"
                }`}
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoutes("/offers") && "text-black border-b-red-500"
                }`}
                onClick={() => {
                  navigate("/offers");
                }}
                onMouseOver={displaySubmenu}
              >
                Offers
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoutes("/offers") && "text-black border-b-red-500"
                }`}
                onClick={() => {
                  navigate("/offers");
                }}
                onMouseOver={displaySubmenu}
              >
                Buy
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoutes("/offers") && "text-black border-b-red-500"
                }`}
                onClick={() => {
                  navigate("/offers");
                }}
                onMouseOver={displaySubmenu}
              >
                Rent
              </li>
            </ul>
          </div>

          <div
            className={`cursor-pointer py-3 text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${
              (pathMatchRoutes("/sign-in") || pathMatchRoutes("/profile")) &&
              "text-black border-b-red-500"
            }`}
            onClick={() => {
              navigate("/profile");
            }}
          >
            {pageState}
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
