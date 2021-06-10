import React from "react";
import logo from '../../images/papaye_logo.png'

const Header = () => {
    return (

        // Header de l'appli
        <div className="flex w-full h-12 mt-4 pl-3 items-end mb-4 absolute top-0 right-0">

            {/* logo de Papaye */}
            <img
                alt="logo"
                className="h-15 w-10"
                src={logo}/>

            {/* Nom de l'appli */}
            <div className="text-black font-bold tahoma text-xl ml-4">PAPAYE</div>

        </div>
    )
}

export default Header;