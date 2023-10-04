import React, { useState, useContext } from 'react'
import sublinks from './data'

const AppContext = React.createContext()

export const AppProvider =({children}) =>{
    const [isSideBarOpen,setIsSidebarOpen] = useState(false)
    const [isSubmenuOpen,setIsSubmenuOpen] = useState(false)
    const [location,setlocation] = useState({})
    const [page,setPage] = useState({page:'',links:[]})

    const openSidebar = ()=>{
        setIsSidebarOpen(true)
        console.log(isSideBarOpen);
    }
    const closeSidebar = ()=>{
        setIsSidebarOpen(false)
    }

    const openSubmenu = (text,coordinate)=>{
        const page = sublinks.find((link)=>link.page === text)
        setPage(page)
        setlocation(coordinate)
        setIsSubmenuOpen(true)
    }
    const closeSubmenu = ()=>{
        setIsSubmenuOpen(false)
    }
    return <AppContext.Provider value={{isSubmenuOpen,openSidebar,isSideBarOpen,closeSidebar,openSubmenu,closeSubmenu,location,page}}>
        
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = ()=>{
    return useContext(AppContext)
}