import React from "react";

import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "./context";
import sublinks from "./data";
import './nav.css'

const SideBar = () => {
  const { isSideBarOpen, closeSidebar } = useGlobalContext();
  return (
    <aside
      className={`${isSideBarOpen ? "fixed top-0 left-0 w-full h-screen grid place-items-center z-[200] scale-1 transition duration-150 ease-linear bg-black-50" : "fixed top-5 left-0 w-full h-screen  place-items-center z-[-1] scale-0 transition duration-150 ease-linear bg-black opacity-[0.5] hidden"}`}
    >
      <div className="w-[95vw] h-[100vh] max-w-[1170px] rounded-[0.25rem] bg-white relative px-[2rem] py-[4rem]">
        <button className="text-[2rem] bg-transparent border-transparent text-gray-900 absolute top-[1rem] right-[1rem] cursor-pointer" onClick={closeSidebar}><FaTimes/></button>
        <div className="sidebar-links">
          {sublinks.map((item,index)=>{
            const {links,page} = item
            return <article key={index} className={`${index >0 ? 'mt-10':'mt-0'}`}>
              <h4 className="text-xl font-bold uppercase">{page}</h4>
              <div className="grid grid-cols-2 m-5">
                {links.map((link,index)=>{
                  const {url,icon,label} = link
                  return <a className="text-gray-950 capitalize gap-1 flex items-center text-md" href={url} key={index}>
                    {icon}
                    {label}
                  </a>
                })}
              </div>
            </article>
          })}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
