import React from "react";

const Header = () => {
    return (

        // Header de l'appli
        <div className="flex w-full h-12 mt-4 pl-3 items-end mb-4 absolute top-0 right-0">

            {/* logo de Papaye */}
            <img
                alt=""
                className="h-15 w-10"
                src={"papaye_logo.png"}/>

            {/* Nom de l'appli */}
            <div className="text-black font-bold tahoma text-xl ml-4">PAPAYE</div>

        </div>
    )
}

export default Header;