import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, TextInput } from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";
import { authenticate } from "../../helpers/UserHelpers";

const Login = () => {
  const [username, setUserEmail] = useState('')
  const [password, setPassword] = useState('')

  const auth = () => {
    if (username !== "" && password !== "") {
      // UserHelpers.authenticate(username, password).then(res => {
      //     // console.log(res)
      // }).catch(err => {
      //     console.log(err)
      // })
      authenticate().then(r => console.log(r))
    }
  }

  return (
    <SafeAreaView style={tailwind("flex-1 justify-center items-center")}>

      {/* Partie avec le logo et le nom */}
      <View style={tailwind("w-3/5 h-2/5 items-center")}>
        <Image
          style={tailwind("h-4/5 w-4/5")}
          source={require("../../../img/papaye_logo.png")}
        />
        <Text style={tailwind("text-black font-bold text-4xl")}>PAPAYE</Text>
      </View>

      {/* Partie avec le carré pour les éléments de connexion (username et password) */}
      <View style={tailwind("bg-yellow-100 w-4/5 rounded-lg p-5 items-center")}>
        <TextInput
          style={tailwind("bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *")}
          type="text"
          onChangeText={e => setUserEmail(e)}
          placeholder="Username" />
        <TextInput
          style={tailwind("bg-white w-4/5 rounded-full my-3 px-4 py-2 text-2xl *")}
          secureTextEntry={true}
          type="text"
          onChangeText={e => setPassword(e)}
          placeholder="Password" />
        <Link onPress={auth} style={tailwind("bg-green-900 w-3/5 rounded-full mt-10 p-2 *")}>
          <Text style={tailwind("text-white text-center text-2xl")}>Connexion</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default Login;