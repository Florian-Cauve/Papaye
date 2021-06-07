import React from "react";
import { useParams } from "react-router";
import { Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faShareAlt, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons'

import NavBar from "../../../../frontend-papaye2.0/src/components/NavBar/NavBar";
import Header from "../../../../frontend-papaye2.0/src/components/Header/Header";



const OpenTraining = () => {

	const Params = useParams();

	const training = {

		id_program: 1,
		program_name: "Programme jambes intense",
		description: "Programme axé sur les jambes avec un max de squat.",
		image: require("../../../img/sport_program_id1.jpg"),
		duration : 45,
		exercises : [
			{
				id_exercise : 1,
				exercise_name : "Squat",
				image : require("../../../img/sport_exercise_id1.jpg"),
				time : 30
			},
			{
				id_exercise : 2,
				exercise_name : "Fentes",
				image : require("../../../img/sport_exercise_id2.jpeg"),
				time : 30
			},
			{
				id_exercise : 3,
				exercise_name : "Jumping jack",
				image : require("../../../img/sport_exercise_id1.jpg"),
				time : 30
			},
		]

	}

	return (
		<SafeAreaView style={tailwind("flex-1 items-center")}>

			{/* Include header*/}
			<Header/>

			<ScrollView style={tailwind("flex-1 w-full")}>

				<View style={tailwind("flex-1 w-full items-center mb-32")}>
					
					{/* Return button */}
					<Link to="/training_list" style={tailwind("w-11/12")}>
						<View style={tailwind("flex-row items-center")}>
							<FontAwesomeIcon icon={ faAngleLeft }/>
							<Text>Retour</Text>
						</View>
					</Link>

					{/* Image of the program */}
					<Image
						style={tailwind("h-32 w-32 rounded mb-6")}
						source={training.image}/>

					{/* Title of the program */}
					<Text style={tailwind("font-bold mb-10")}>{training.program_name}</Text>

					{/* Start Button */}
					<Link to={`/do_exercise/${Params.id_program}`} style={tailwind("p-2 bg-green-900 rounded-lg mb-4")}>
						<Text style={tailwind("text-white text-xl")}>Commencer</Text>
					</Link>

					{/* Icon pannel */}
					<View style={tailwind("flex-row items-center justify-between w-2/5 mb-10")}>

						{/* Duration of the program */}
						<View style={tailwind("flex-row items-end")}>
							<FontAwesomeIcon icon={ faClock } size= {20} />
							<Text style={tailwind("text-xs")}>{training.duration}</Text>
						</View>

						{/* Edit part */}
						<View>
							<FontAwesomeIcon icon={ faEdit } size= {20} />
						</View>

						{/* Share part */}
						<View>
							<FontAwesomeIcon icon={ faShareAlt } size= {20} />
						</View>

					</View>

					{/* List of Exercise */}
					<View style={tailwind("w-11/12 bg-yellow-100 p-4 rounded-lg pb-8 items-center")}>
						
						{/* List all exercises */}
						{training.exercises.map(exercise => (
							<View key={`exercise_${exercise.id_exercise}`} style={tailwind("w-11/12 bg-white p-2 rounded-lg mt-4")}>
								<View style={tailwind("flex-row")}>
									{/* Image of the exercise */}
									<Image
										style={tailwind("w-20 h-20 rounded-full")}
										source={exercise.image}/>
									{/* Title and duration of the exercise */}
									<View style={tailwind("pl-4")}>
										<Text style={tailwind("font-bold text-xl")}>{exercise.exercise_name}</Text>
										<View style={tailwind("flex-row pt-1 items-end")}>
											<FontAwesomeIcon icon={ faHourglassHalf } size = { 25 } />
											<Text>{exercise.time}</Text>
										</View>
										
									</View>
								</View>
							</View>
						))}

					</View>

				</View>

			</ScrollView>
			
			{/* Includ bottom NavBar */}
			<NavBar part="sport"/>

		</SafeAreaView>
	)
}

export default OpenTraining;