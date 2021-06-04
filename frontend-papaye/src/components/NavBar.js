import React from "react";
import { SafeAreaView } from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSearch, faDumbbell, faAppleAlt, faUser } from '@fortawesome/free-solid-svg-icons'


const NavBar = () => {
	return (

		// Barre de navigation de l'appli
		<SafeAreaView style={tailwind("w-full flex-row justify-between absolute bottom-0 absolute border-t-2 border-green-900 bg-white")}>

			{/* Bouton home/ fil d'actualité */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faHome } style={tailwind("text-green-900")} size = { 32 }/>
			</Link>

			{/* Bouton pour les recherches */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faSearch } style={tailwind("text-green-900")} size = { 32 }/>
			</Link>

			{/* Bouton pour la partie sport */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faDumbbell } style={tailwind("text-green-900")} size = { 32 }/>
			</Link>

			{/* Bouton pour la partie nourriture */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faAppleAlt } style={tailwind("text-green-900")} size = { 32 }/>
			</Link>

			{/* Bouton pour voir son compte */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faUser } style={tailwind("text-green-900")} size = { 32 }/>
			</Link>

		</SafeAreaView>
	)
}

export default NavBar;