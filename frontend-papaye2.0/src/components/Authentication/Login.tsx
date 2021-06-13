import { useState } from "react";
import { Link } from "react-router-dom";
import { authenticate } from "../../helpers/AuthHelpers";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = () => {
    if (username !== "" && password !== "") {
      authenticate(username, password).then(res => {
        if (res.data.id !== undefined) {
          localStorage.setItem("id", res.data.id);
          document.location.href = "/";
        } else {
          localStorage.removeItem("id")
          setPassword('')
          alert("Username or password may be wrong !");
        }
      }).catch(err => {
        console.error("Erreur requete " + err.message + " " + err.stack)
      })
    }else{
      alert("Please fill all the fields !");
    }
  }

  return (

    <div className="flex flex-col h-screen justify-center items-center">
      <Link className="absolute top-4 left-4 flex items-center" to={"/"}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <p>Retour</p>
      </Link>
      {/* Logo and name part */}
      <div className="flex flex-col w-3/5 h-2/5 items-center">
        <img
          alt=""
          className="h-4/5 w-4/5"
          src={"papaye_logo.png"}
        />
        <div className="text-black font-bold text-4xl">PAPAYE</div>
      </div>

      {/* Connexion elements part (username et password) */}
      <form className="flex flex-col bg-orange-100 w-4/5 rounded-2xl p-5 items-center">
        <input
          className="focus:outline-none bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
          placeholder="Username" />
        <input
          className="focus:outline-none bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="Password" />
        <div onClick={auth} className="bg-lime-900 w-3/5 rounded-full mt-10 p-2 *">
          <button type="button" className="focus:outline-none text-white text-center text-2xl">Connexion</button>
        </div>
      </form>
    </div>
  )
}

export default Login;