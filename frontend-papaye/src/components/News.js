import React from "react";
import { Text, View, SafeAreaView, Image} from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";

import NavBar from "./NavBar.js";
import Header from "./Header.js";


const News = () => {
	return (
		<SafeAreaView style={tailwind("flex-1 items-center")}>

			{/* Inclure le header */}
			<Header/>

				<View style={tailwind("w-5/6 h-20 border-2")}>
					{/* Ajouter une publication */}
				</View>
			
			{/* Inclure la barre de navigation */}
			<NavBar/>

		</SafeAreaView>
	)
}

export default News;