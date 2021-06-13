import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center">

      {/* Partie avec le logo et le nom */}
      <div className="flex flex-col w-3/5 h-2/5 items-center">
        <img
            alt=""
            className="h-4/5 w-4/5"
            src={"papaye_logo.png"}/>
        <div className="text-black font-bold text-4xl">PAPAYE</div>
      </div>

      {/* Partie avec le carré de connexion et d'inscription */}
      <div className="flex flex-col bg-orange-100 w-4/5 rounded-lg p-5 items-center">
        <Link to="/login" className="bg-white w-4/5 rounded-full m-3 p-2 *">
          <div className="text-black text-center text-2xl">Connexion</div>
        </Link>
        <Link to="/signup" className="bg-white w-4/5 rounded-full m-3 p-2 *">
          <div className="text-black text-center text-2xl">Inscription</div>
        </Link>
      </div>
    </div>
  )
}

export default HomePage;