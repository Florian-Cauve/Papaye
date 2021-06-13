import React, {useState} from "react";
import {register} from "../../helpers/AuthHelpers";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)

    const [confirmPassword, setConfirmPassword] = useState('');

    const confirmRegister = () => {
        if(username !== "" && password !== "" && confirmPassword !== "" && height > 0 && weight > 0 && height < 250 && weight < 250){
            if(password === confirmPassword){
                register(username, password, height, weight).then(r => {
                    document.location.href = "/login";
                })
            }else {
                alert("You didn't confirm your password !");
            }
        }else{
            alert("Your filled data are incorrect");
        }
    }

    return (
    <div className="flex flex-col h-screen flex-1 justify-center items-center">

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
      <div className="flex flex-col bg-yellow-200 w-4/5 rounded-lg p-2 items-center">
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          onChange={event => setUsername(event.target.value)}
          placeholder="Username"/>
          <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          pattern="[0-9]*"
          onChange={event => setHeight(Number(event.target.value))}
          placeholder="Height"/>
          <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="text"
          pattern="[0-9]*"
          onChange={event => setWeight(Number(event.target.value))}
          placeholder="Weight"/>
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="password"
          onChange={event => setPassword(event.target.value)}
          placeholder="Password"/>
        <input
          className="bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *"
          type="password"
          onChange={event => setConfirmPassword(event.target.value)}
          placeholder="Confirm Password"/>
        <div onClick={confirmRegister} className="bg-green-900 w-3/5 rounded-full mt-3 p-2 *">
          <div className="text-white text-center text-2xl">Inscription</div>
        </div>
      </div>
    </div>
  )
}
export default SignUp;