import React from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";

const HomePage = () => {
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

      {/* Partie avec le carré de connexion et d'inscription */}
      <View style={tailwind("bg-yellow-100 w-4/5 rounded-lg p-5 items-center")}>
        <Link to="/login" style={tailwind("bg-white w-4/5 rounded-full m-3 p-2 *")}>
          <Text style={tailwind("text-black text-center text-2xl")}>Connexion</Text>
        </Link>
        <Link to="/signup" style={tailwind("bg-white w-4/5 rounded-full m-3 p-2 *")}>
          <Text style={tailwind("text-black text-center text-2xl")}>Inscription</Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default HomePage;