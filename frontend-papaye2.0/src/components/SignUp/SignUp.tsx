import React from "react";
import {Link} from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex-1 justify-center items-center">

      {/* Partie avec le logo et le nom */}
      <div className="w-3/5 h-2/5 items-center">
        <img
          alt=""
          className="h-4/5 w-4/5"
          src={"papaye_logo.png"}
        />
        <div className="text-black font-bold text-4xl">PAPAYE</div>
      </div>

      {/* Partie avec le carré pour les éléments de connexion (username et password) */}
      <div className="bg-yellow-100 w-4/5 rounded-lg p-5 items-center">
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          placeholder="Username"/>
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          placeholder="Email"/>
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="password"
          placeholder="Password"/>
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="password"
          placeholder="Confirm Password"/>
        <Link to="/" className="bg-green-900 w-3/5 rounded-full mt-10 p-2 *">
          <div className="text-white text-center text-2xl">Inscription</div>
        </Link>
      </div>
    </div>
  )
}
export default SignUp;