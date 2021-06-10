import {useState} from "react";
import {authenticate} from "../../helpers/AuthHelpers";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const auth = () => {
    if (username !== "" && password !== "") {
      authenticate(username, password).then(res => {
        localStorage.setItem("id", res.data.id);
        document.location.href = "/news";
      }).catch(err => {
        console.error("Erreur requete " + err.message +" "+ err.stack)
      })
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">

      {/* Partie avec le logo et le nom */}
      <div className="flex flex-col w-3/5 h-2/5 items-center">
        <img
          alt=""
          className="h-4/5 w-4/5"
          src={"papaye_logo.png"}
        />
        <div className="text-black font-bold text-4xl">PAPAYE</div>
      </div>

      {/* Partie avec le carré pour les éléments de connexion (username et password) */}
      <form className="flex flex-col bg-yellow-200 w-4/5 rounded-lg p-5 items-center">
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          onChange={event => setUsername(event.target.value)}
          placeholder="Username" />
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="password"
          onChange={event => setPassword(event.target.value)}
          placeholder="Password" />
        <div onClick={auth} className="bg-green-900 w-3/5 rounded-full mt-10 p-2 *">
          <button type="button" className="text-white text-center text-2xl">Connexion</button>
        </div>
      </form>
    </div>
  )
}

export default Login;