import React from "react";
import { SafeAreaView } from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSearch, faDumbbell, faAppleAlt, faUser } from '@fortawesome/free-solid-svg-icons'



const NavBar = (props) => {

	const selectedPart = {
		"home" : tailwind("text-green-900"),
		"search" : tailwind("text-green-900"),
		"sport" : tailwind("text-green-900"),
		"food" : tailwind("text-green-900"),
		"account" : tailwind("text-green-900"),
	}

	selectedPart[props.part] = tailwind("text-red-400");

	return (

		// Barre de navigation de l'appli
		<SafeAreaView style={tailwind("w-full flex-row justify-between absolute bottom-0 absolute border-t-2 border-green-900 bg-white")}>

			{/* Bouton home/ fil d'actualité */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faHome } style={selectedPart.home} size = { 32 }/>
			</Link>

			{/* Bouton pour les recherches */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faSearch } style={selectedPart.search} size = { 32 }/>
			</Link>

			{/* Bouton pour la partie sport */}
			<Link to="/training" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faDumbbell } style={selectedPart.sport} size = { 32 }/>
			</Link>

			{/* Bouton pour la partie nourriture */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faAppleAlt } style={selectedPart.food} size = { 32 }/>
			</Link>

			{/* Bouton pour voir son compte */}
			<Link to="/news" style={tailwind("flex-1 items-center py-4")}>
				<FontAwesomeIcon icon={ faUser } style={selectedPart.account} size = { 32 }/>
			</Link>

		</SafeAreaView>
	)
}

export default NavBar;