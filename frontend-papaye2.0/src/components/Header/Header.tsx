import React from "react";

const Header = () => {
    return (

        // Header de l'appli
        <div className="flex w-full h-12 mt-10 pl-3 items-end mb-10">

            {/* logo de Papaye */}
            <img
                alt=""
                className="h-17 w-12"
                src={"papaye_logo.png"}/>

            {/* Nom de l'appli */}
            <div className="text-black font-bold tahoma text-2xl ml-4">PAPAYE</div>

        </div>
    )
}

export default Header;