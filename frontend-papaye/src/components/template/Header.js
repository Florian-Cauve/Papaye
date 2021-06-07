import React from "react";
import { SafeAreaView, Image, Text } from "react-native";
import tailwind from "tailwind-rn";


const Header = () => {
	return (

		// Header de l'appli
		<SafeAreaView style={tailwind("w-full h-12 mt-10 flex-row pl-3 items-end mb-10")}>

			{/* logo de Papaye */}
			<Image
	          style={tailwind("h-10 w-5")}
	          source={require("../../../img/papaye_logo.png")}/>
				
			{/* Nom de l'appli */}
			<Text style={tailwind("text-black font-bold text-2xl ml-4")}>PAPAYE</Text>

		</SafeAreaView>
	)
}

export default Header;