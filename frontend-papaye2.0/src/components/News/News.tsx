import React from "react";

import Header from "../Header/Header";
import NavBar from "../Header/NavBar";



const News = () => {
	return (
		<div className="flex-1 items-center">

			{/* Inclure le header */}
			<Header/>

			<div className="w-5/6 h-20 border-2">
				{/* Ajouter une publication */}
			</div>
			
			{/* Inclure la barre de navigation */}
			<NavBar part="home"/>

		</div>
	)
}

export default News;