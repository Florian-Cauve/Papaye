import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { faAngleLeft, faAngleRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { faClock, faEdit } from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { ITraining, defaultTraining } from '../../helpers/interfaces/interfaces';
import { getTrainingsById } from '../../helpers/TrainingsHelpers'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const DoExercise = () => {

	// Gather the id program
	const params: {id:string} = useParams();

	// Initialise constant
    const [training, setTraining] = useState<ITraining>(defaultTraining)
    const [currentExercise, changeExercise] = useState<number>(0);
	const [timer, changeTimer] = useState<{ hours: string, minutes: string, seconds: string }>({ hours : "0", minutes : "0", seconds : "0"})
	const [isChronometerLaunch, changeChronometerState ] = useState<boolean>(false);
	const [ArrayTimeOut, changeTimeOutTable] = useState<NodeJS.Timeout[]>([])
	const [PausePlayButtonIcon, changeIconPausePlay] = useState(faPlay)

	// Initialize useEffect
	useEffect(() => {
        getTrainingsById(params.id).then(res => {
            setTraining(res.data)
        })
    }, [] )

	useEffect(() => {
		changeTimer(initializeChronometer())
	}, [training])

    // Use effect of changeExercise
	useEffect(() => {
		clearAllTimeout()
		if (isChronometerLaunch){
			launchChronometer()
		}
	}, [currentExercise])

	// Use effect of the isChronometerLaunch
	useEffect(() => {
		if (isChronometerLaunch === true){
			changeIconPausePlay(faPause)
		}
		else{
			changeIconPausePlay(faPlay)
		}
	}, [isChronometerLaunch])


	// Function to initialize the chronometer
	function initializeChronometer() {

		console.log(training)

		// Get duration of the exercise
		let initialize:number = training.exercises[currentExercise].duration;
		// let initialize:number = 0; 

		// Calculate hours
		let hours:number = (~~(initialize / 3600));
		initialize -= hours * 3600;

		let hours_ = hours.toString()
		if (hours < 10 ){
			hours_ = "0" + hours_
		}

		// Calculate minutes
		let minutes:number = (~~(initialize / 60));
		initialize -= minutes * 60;
		
		let minutes_ = minutes.toString()
		if (minutes < 10 ){
			minutes_ = "0" + minutes_
		}

		// Calculate seconds
		let seconds:number = initialize;
		
		let seconds_ = seconds.toString()
		if (seconds < 10 ){
			seconds_ = "0" + seconds_
		}

		return {
			hours : hours_,
			minutes : minutes_,
			seconds : seconds_,
		}
	}
	

	// Go to next exercise
	function ChangeExercise(next:number){
		if ( ( (currentExercise + next) <= training.exercises.length - 1) && ( (currentExercise + next) >= 0 ) ){
			changeChronometerState(true)
			changeChronometer(training.exercises[currentExercise + next].duration);
			changeExercise(currentExercise + next);
		}
	}

	// Calculate the remaining time and put it in chronometer values
	function changeChronometer(time_remaining:number){

		// Get duration of the exercise
		let initialize = time_remaining;

		// Calculate hours
		let hours:number = (~~(initialize / 3600));
		initialize -= hours * 3600;

		let hours_ = hours.toString()
		if (hours < 10 ){
			hours_ = "0" + hours_
		}

		// Calculate minutes
		let minutes:number = (~~(initialize / 60));
		initialize -= minutes * 60;
		
		let minutes_ = minutes.toString()
		if (minutes < 10 ){
			minutes_ = "0" + minutes_
		}

		// Calculate seconds
		let seconds:number = initialize;
		
		let seconds_ = seconds.toString()
		if (seconds < 10 ){
			seconds_ = "0" + seconds_
		}

		// console.log(`${time_remaining} --> \thours : ${hours}\tminutes : ${minutes}\tseconds : ${seconds}`)

		changeTimer(
			{
				hours : hours_,
				minutes : minutes_,
				seconds : seconds_,
			}
		)

		if ((hours_ === "00") && (minutes_ === "00") && (seconds_ === "00")){
			ChangeExercise(1)
		}
	}

	// Start the chronometer
	function launchChronometer(){

		const time_remaining:number = parseInt(timer.hours) * 3600 + parseInt(timer.minutes) * 60 + parseInt(timer.seconds)

		for (let seconds = 1; seconds <= time_remaining; seconds++){
			let new_time_out:NodeJS.Timeout = setTimeout(() => {
				changeChronometer(time_remaining - seconds)
			}, 1000 * seconds);

			let newArrayTimeOut:NodeJS.Timeout[] = ArrayTimeOut
			newArrayTimeOut.push(new_time_out)
			changeTimeOutTable(newArrayTimeOut)
		}
		
	}

	function clearAllTimeout(){

		let TimeOutArray:NodeJS.Timeout[] = ArrayTimeOut

		TimeOutArray.forEach((timeOut:NodeJS.Timeout) => {
			clearTimeout(timeOut);
		});

		changeTimeOutTable([]);
	}


	return (

		<section className="flex-1 items-center">

			{/* Include header*/}
			<Header/>

			<div className="flex-1 w-full">

				<div className="flex-1 w-full items-center mb-32">
					
					{/* Return button */}
					<Link to={`/open_training/${params.id}`} className="w-11/12 mb-6">
						<div className="flex-row items-center">
							<FontAwesomeIcon icon={ faAngleLeft }/>
							<label>Retour</label>
						</div>
					</Link>

					<div className="w-10/12 items-center bg-yellow-100 rounded-lg py-10">
						
						{/* Image of the Exercise */}
						<img
							className="h-48 w-48 rounded-full mb-2"
							src= {training.exercises[currentExercise].pathImage}
							/>
						<label className="font-bold text-green-900 mb-10 text-2xl">{training.exercises[currentExercise].name}</label>

						{/* Timer part */}
						<div className="w-3/5 flex-row justify-center items-center pb-6">
							<FontAwesomeIcon icon = {faClock} size="2x" className="text-green-900"/>
							<label className="text-4xl ml-4 text-green-900">{timer.hours}:{timer.minutes}:{timer.seconds}</label>
						</div>

						{/* Timer button */}
						<div className="flex-row w-3/5 justify-between pb-4">
							
							{/* Previous exercise */}
							<div
								className="p-2 bg-green-900 rounded-lg"
								onClick={() => {
									ChangeExercise(-1)
								}}>
								<FontAwesomeIcon icon={ faAngleLeft } size="2x" className="text-white"/>
							</div>

							{/* Play/Pause the exercise */}
							<div
								className="p-2 bg-green-900 rounded-lg"
								onClick={() => {
									if(isChronometerLaunch){
										changeChronometerState(false)
										clearAllTimeout();
									}
									else{
										changeChronometerState(true)
										launchChronometer()
									}
								}}>
								<FontAwesomeIcon icon={PausePlayButtonIcon} size="2x" className="text-white"/>
							</div>

							{/* Next Exercise */}
							<div
								className="p-2 bg-green-900 rounded-lg"
								onClick={() => {
									ChangeExercise(1)
								}}>
								<FontAwesomeIcon icon={ faAngleRight } size="2x" className="text-white"/>
							</div>

						</div>

						{/* Stop the program */}
						<Link
							className="p-2 bg-red-500 rounded"
							to={`/open_training/${params.id}`}>
							<label className="text-xl">Arrêter</label>
						</Link>

					</div>
					

				</div>


			</div>
			
			{/* Includ bottom NavBar */}
			<NavBar part="sport"/>

		</section>
	)
}



export default DoExercise;