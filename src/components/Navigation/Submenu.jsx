import React, { useEffect, useRef, useState } from "react";

import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";

const Submenu  = () => {
  const {
    isSubmenuOpen,
    location,
    page: { page, links },
  } = useGlobalContext();
  const container = useRef(null);
  const [colums,setColumns] = useState('grid-cols-2')
  useEffect(() => {
    setColumns(`col-2`)
    const submenu = container.current;
    const { center, bottom } = location;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if(links.length === 3){
      setColumns('grid-cols-3')
    }
    if(links.length > 3){
      setColumns('grid-cols-4')
    }

  }, [location,links]);
  return (
    <aside
      className={`${isSubmenuOpen ? " bg-white shadow-black absolute top-[4rem] left-[100%] translate-x-[-50%] z-20  p-[2rem] transition-all block" : " bg-white shadow-black absolute top-[4rem] left-[50%] translate-x-[-50%] z-20  p-[2rem] transition-all hidden"}`}
      ref={container}
    >
      <h4>{page}</h4>
      <div className={`grid gap-x-[0.25rem] gap-y-[2rem] grid-cols-2 ${colums}`}>
        {links.map((link,index)=>{
          const {label,icon,url} = link
          return <a className="w-[10rem] capitalize flex items-center" key={index} href={url}>
            <span className="mr-2">{icon}</span>
            {label}
          </a>
        })}
      </div>
    </aside>
  );
};

export default Submenu ;
