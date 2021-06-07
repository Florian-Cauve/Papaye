import React from "react";
import { Text, View, SafeAreaView, Image} from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";

import NavBar from "../../../../frontend-papaye2.0/src/components/NavBar/NavBar";
import Header from "../../../../frontend-papaye2.0/src/components/Header/Header";


const TrainingList = () => {

	const TrainingList = [
		{
			id_program: 1,
			program_name: "Programme jambes intense", //Titre avec char limité
			description: "Programme axé sur les jambes avec un max de squat.", // 50 à 60 char
			image: require("../../../img/sport_program_id1.jpg"),
		},
		{
			id_program: 2,
			program_name: "Cardio jambes",
			description: "25 minutes de pur cardio (munissez vous d'une corde à sauter).",
			image: require("../../../img/sport_program_id2.jpg"),
		}
	]

	return (
		<SafeAreaView style={tailwind("flex-1 items-center")}>

			{/* Include header*/}
			<Header/>

				<View style={tailwind("flex-1 w-full items-center")}>
					
					{/* Title of the page */}
					<Text style={tailwind("text-2xl font-bold text-green-900 mb-10 text-center")}>Mes entraînements</Text>

					{/* Add a program part */}
					<Link style={tailwind("w-11/12 p-2 rounded-lg bg-yellow-100 *")} to="/training_list">

						<View style={tailwind("flex-row items-center")}>
							<View style={tailwind("h-10 w-10 rounded-full bg-white")}>
								<Text style={tailwind("text-4xl text-center")}>+</Text>
							</View>

							<Text style={tailwind("text-lg text-center pl-4 font-bold")}>Ajouter un entraînement</Text>
						</View>

					</Link>

					{/* Part where we can see all programs */}
					<View style={tailwind("w-11/12")}>
						
						{/* Repeat for each program */}
						{TrainingList.map(training => (

							// Create the program shortcut
							<Link to={`/open_training/${training.id_program.toString()}`} style={tailwind("mt-6 w-full bg-yellow-100 * p-3 rounded-lg")} key={`training_${training.id_program.toString()}`}>
								

								<View style={tailwind("flex-row w-full")}>

									{/* Image of the program */}
									<Image
										style={tailwind("w-20 h-20 border-2 rounded mr-4")} 
										source={training.image}/>

									{/* Text part  */}
									<View style={tailwind("flex-1")}>
										
										{/* Title of the program */}
										<Text style={tailwind("font-bold pb-1")}>{training.program_name}</Text>

										{/* Description of the program */}
										<Text style={tailwind("text-justify w-10/12")}>
											{training.description}
										</Text>

									</View>
									
								</View>

							</Link>

						))}

					</View>

				</View>
			
			{/* Includ bottom NavBar */}
			<NavBar part="sport"/>

		</SafeAreaView>
	)
}

export default TrainingList;