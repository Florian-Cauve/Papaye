import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, Image, ScrollView, TouchableHighlight } from "react-native";
import tailwind from "tailwind-rn";
import { Link } from "react-router-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons'

import NavBar from "../template/NavBar";
import Header from "../template/Header";



const DoExercise = () => {

	// Exercise List
	const exercise = [
		{
			id_exercise : 1,
			exercise_name : "Squat",
			image : require("../../../img/sport_exercise_id1.jpg"),
			time : 6
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

	// Function to initialize the chronometer
	function initializeChronometer() {

		// Get duration of the exercise
		let initialize = exercise[currentExercise].time;

		// Calculate hours
		let hours = (~~(initialize / 3600)).toString();
		initialize -= hours * 3600;
		if (hours.length < 2 ){
			hours = "0" + hours
		}

		// Calculate minutes
		let minutes = (~~(initialize / 60)).toString();
		initialize -= minutes * 60;
		if (minutes.length < 2 ){
			minutes = "0" + minutes
		}

		// Calculate seconds
		let seconds = initialize.toString();
		if (seconds.length < 2 ){
			seconds = "0" + seconds
		}

		return {
			hours : hours,
			minutes : minutes,
			seconds : seconds,
		}
	}

	// Current Exercise
	const [currentExercise, changeExercise] = useState(0);

	// Use effect of changeExercise
	useEffect(() => {
		clearAllTimeout()
		if (isChronometerLaunch){
			console.log("Exercice launched !")
			launchChronometer()
		}
	}, [currentExercise])

	// Chronometer values
	const [timer, changeTimer] = useState(initializeChronometer())

	// Used to know if the chronometer is running
	const [ isChronometerLaunch, changeChronometerState ] = useState(false);

	useEffect(() => {

		if (isChronometerLaunch === true){
			changeIconPausePlay(faPause)
		}
		else{
			changeIconPausePlay(faPlay)
		}

	}, [isChronometerLaunch])

	// Store all timeout
	const [ ArrayTimeOut, changeTimeOutTable ] = useState([])

	// Icon of the pause/play button
	const [PausePlayButton, changeIconPausePlay] = useState(faPlay)

	

	// Go to next exercise
	function ChangeExercise(next){
		if ( ( (currentExercise + next) <= exercise.length - 1) && ( (currentExercise + next) >= 0 ) ){
			changeChronometerState(true)
			changeChronometer(exercise[currentExercise + next].time);
			changeExercise(currentExercise + next);
		}
	}

	// Calculate the remaining time and put it in chronometer values
	function changeChronometer(time_remaining){

		// Get duration of the exercise
		let initialize = time_remaining;

		// Calculate hours
		let hours = (~~(initialize / 3600)).toString();
		initialize -= hours * 3600;
		if (hours.length < 2 ){
			hours = "0" + hours
		}

		// Calculate minutes
		let minutes = (~~(initialize / 60)).toString();
		initialize -= minutes * 60;
		if (minutes.length < 2 ){
			minutes = "0" + minutes
		}

		// Calculate seconds
		let seconds = initialize.toString();
		if (seconds.length < 2 ){
			seconds = "0" + seconds
		}

		// console.log(`${time_remaining} --> \thours : ${hours}\tminutes : ${minutes}\tseconds : ${seconds}`)

		changeTimer(
			{
				hours : hours.toString(),
				minutes : minutes.toString(),
				seconds : seconds.toString(),
			}
		)

		console.log(hours, minutes, seconds)
		if ((hours === "00") && (minutes === "00") && (seconds === "00")){
			ChangeExercise(1)
		}
	}

	// Start the chronometer
	function launchChronometer(){

		const time_remaining = parseInt(timer.hours) * 3600 + parseInt(timer.minutes) * 60 + parseInt(timer.seconds)

		for (let seconds = 1; seconds <= time_remaining; seconds++){
			let new_time_out = setTimeout(() => {
				changeChronometer(time_remaining - seconds)
			}, 1000 * seconds);

			let newArrayTimeOut = ArrayTimeOut
			newArrayTimeOut.push(new_time_out)
			changeTimeOutTable(newArrayTimeOut)
		}
		
	}

	function TextToSeconds(seconds){
		return time_remaining = parseInt(timer.hours) * 3600 + parseInt(timer.minutes) * 60 + parseInt(timer.seconds)
	}

	function clearAllTimeout(){

		for (timeOut of ArrayTimeOut){
			clearTimeout(timeOut);
		}
		changeTimeOutTable([])

	}


	return (

		<SafeAreaView style={tailwind("flex-1 items-center")}>

			{/* Include header*/}
			<Header/>

			<ScrollView style={tailwind("flex-1 w-full")}>

				<View style={tailwind("flex-1 w-full items-center mb-32")}>
					
					{/* Return button */}
					<Link to="/open_training" style={tailwind("w-11/12 mb-6")}>
						<View style={tailwind("flex-row items-center")}>
							<FontAwesomeIcon icon={ faAngleLeft }/>
							<Text>Retour</Text>
						</View>
					</Link>

					<View style={tailwind("w-10/12 items-center bg-yellow-100 rounded-lg py-10")}>
						
						{/* Image of the Exercise */}
						<Image
							style={tailwind("h-48 w-48 rounded-full mb-2")}
							source={exercise[currentExercise].image}
							/>
						<Text style={tailwind("font-bold text-green-900 mb-10 text-2xl")}>{exercise[currentExercise].exercise_name}</Text>

						{/* Timer part */}
						<View style={tailwind("w-3/5 flex-row justify-center items-center pb-6")}>
							<FontAwesomeIcon icon = {faClock} size={45} style={tailwind("text-green-900")}/>
							<Text style={tailwind("text-4xl ml-4 text-green-900")}>{timer.hours}:{timer.minutes}:{timer.seconds}</Text>
						</View>

						{/* Timer button */}
						<View style={tailwind("flex-row w-3/5 justify-between pb-4")}>
							
							{/* Previous exercise */}
							<TouchableHighlight
								style={tailwind("p-2 bg-green-900 rounded")}
								onPress={() => {
									ChangeExercise(-1)
								}}>
								<FontAwesomeIcon icon={ faAngleLeft } size={25} style={tailwind("text-white")}/>
							</TouchableHighlight>

							{/* Play/Pause the exercise */}
							<TouchableHighlight
								style={tailwind("p-2 bg-green-900 rounded")}
								onPress={() => {
									if(isChronometerLaunch){
										changeChronometerState(false)
										clearAllTimeout();
									}
									else{
										changeChronometerState(true)
										launchChronometer()
									}
								}}>
								<FontAwesomeIcon icon={PausePlayButton} size={25} style={tailwind("text-white")}/>
							</TouchableHighlight>

							{/* Next Exercise */}
							<TouchableHighlight
								style={tailwind("p-2 bg-green-900 rounded")}
								onPress={() => {
									ChangeExercise(1)
								}}>
								<FontAwesomeIcon icon={ faAngleRight } size={25} style={tailwind("text-white")}/>
							</TouchableHighlight>

						</View>

						{/* Stop the program */}
						<Link
							style={tailwind("p-2 bg-red-500 rounded")}
							to="/open_training">
							<Text style={tailwind("text-xl")}>Arrêter</Text>
						</Link>

					</View>
					

				</View>


			</ScrollView>
			
			{/* Includ bottom NavBar */}
			<NavBar part="sport"/>

		</SafeAreaView>
	)
}



export default DoExercise;