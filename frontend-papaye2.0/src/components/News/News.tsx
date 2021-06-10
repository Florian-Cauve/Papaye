import React from "react";

import Header from "../Header/Header";
import NavBar from "../Header/NavBar";



const News = () => {
	return (
		<div className="flex-1 items-center">

			{/* Inclure le header */}
			<Header/>

			<section className="flex h-screen items-center">
				<div className="flex flex-col h-3/4 w-full items-center overflow-auto">

				{/* Ajouter une publication */}
				</div>
			</section>
			
			{/* Inclure la barre de navigation */}
			<NavBar part="home"/>

		</div>
	)
}

export default News;