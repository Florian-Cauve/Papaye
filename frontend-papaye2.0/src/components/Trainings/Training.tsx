import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { defaultTraining, ITraining, IExercises, CreateExercise } from '../../helpers/interfaces/interfaces'
import { deleteTraining, getTrainingsById, updateTraining } from '../../helpers/TrainingsHelpers'
import { addExercise, deleteExercise } from '../../helpers/ExerciseHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'
import AddPicture from '../Header/AddPicture'

const Training = () => {

    const [training, setTraining] = useState<ITraining>(defaultTraining)
    const [name, setName] = useState<string>("")
    const [description, setDescription]= useState<string>("")
    const [pathImageTraining, setPathImageTraining] = useState<string>("")
    const [pathImage, setPathImage] = useState<string>("")
    const [isDeletePopUpOpen, setDeletePopUpOpen] = useState<boolean>(false)
    const [isAddPopUpOpen, setAddPopUpOpen] = useState<boolean>(false)
    const [isModifyPopUpOpen, setModifyPopUpOpen] = useState<boolean>(false)
    const [duration, setDuration] = useState<string>("")
    const [exerciseName, setExerciseName] = useState<string>("")
    const [exerciseDescription, setExerciseDescription] = useState<string>("")
    const [exerciseDuration, setExerciseDuration] = useState<number>(0)
    const params: { id: string } = useParams()

    useEffect(() => {
        getTrainingsById(params.id)
            .then(res => {
                setTraining(res.data)
                setName(res.data.programName)
                setDescription(res.data.description)
                let totalTime = 0;
                res.data.exercises.forEach((exercise: IExercises) => {
                    totalTime += exercise.duration;
                })
                const minutes = Math.floor(totalTime / 60);
                const secondes = totalTime % 60;
                const duration = minutes.toString() + " : " + secondes.toString()
                setDuration(duration)
            })
    }, [])

    const modifyTraining = () => {
        let _training = training
        _training.programName = name;
        _training.description = description;
        _training.pathImage = pathImageTraining;
        updateTraining(_training).then(res => {
            window.location.reload()
            setModifyPopUpOpen(false)
        })
    }

    const deleteThisTraining = () => {
        deleteTraining(params.id)
            .then(res =>
                document.location.href = "/trainings"
            )
    }

    const addThisExercise = () => {
        let exercise: CreateExercise = { name: exerciseName, description: exerciseDescription, duration: exerciseDuration, training: params.id, pathImage: pathImage }
        console.log(exercise);
        
        addExercise(exercise).then(res => {
            setAddPopUpOpen(false)
            window.location.reload()
            setExerciseName("")
            setExerciseDescription("")
            setExerciseDuration(0)
        })
    }

    const deleteThisExercise = (id: string) => {
        deleteExercise(id).then(res => 
            window.location.reload()
        )
    }

    return (
        <>
            <Header />
            <section className="flex h-screen items-center justify-center">
                <Link className="absolute top-20 left-4 flex items-center" to="/trainings">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <p>Retour</p>
                </Link>
                <div className="h-3/4 w-11/12 mt-3 flex flex-col items-center">
                    {training.pathImage ?
                        <img className="h-24 w-24 rounded-2xl" src={training.pathImage} alt="training" />
                        :
                        <div className="flex bg-gray-200 h-24 w-24 rounded-2xl justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    }
                    <p className="my-3 text-xl font-bold">{training.programName}</p>
                    <Link to={"/do_exercise/" + training._id} className="mb-2 text-white bg-lime-900 px-4 py-2 rounded-2xl">
                        Commencer
                    </Link>
                    <div className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="pl-2">{duration}</p>
                        <div onClick={() => setModifyPopUpOpen(true)} className="focus:outline-none pl-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <button className="focus:outline-none pl-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="focus:outline-none h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                        </button>
                        <button className="focus:outline-none pl-4" onClick={() => setDeletePopUpOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center rounded-2xl overflow-auto mt-2 flex flex-col w-full h-3/4 bg-orange-100 px-1 py-3">
                        <button onClick={() => setAddPopUpOpen(true)} className="flex bg-lime-900 text-white w-9/12 items-center p-1 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <p>Add training</p>
                        </button>
                        {training.exercises.map(exercise =>
                            <div key={exercise._id} className="p-2 flex items-center h-24 bg-white w-11/12 my-2 rounded-2xl">
                                {exercise.pathImage ?
                                    <img className="h-20 w-20 rounded-2xl" src={exercise.pathImage} alt="training" />
                                    :
                                    <div className="flex bg-gray-200 h-20 w-20 rounded-2xl justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                }
                                <div className="h-20 w-8/12 flex flex-col iteams-center overflow-hidden pl-6 text-left">
                                    <div className="flex justify-between font-bold">
                                        <p className="">{exercise.name} - {exercise.duration} sec</p>
                                        <button onClick={() => deleteThisExercise(exercise._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="">{exercise.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {isDeletePopUpOpen && (
                    <section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
                        <div className="h-1/5 bg-white rounded-2xl border-2">
                            <p className="p-2">Etes-vous sûr de supprimer cet entraînement ?</p>
                            <div className="flex justify-around pt-5">
                                <button onClick={deleteThisTraining} className="bg-green-400 rounded-2xl p-4">
                                    Oui
                                </button>
                                <button onClick={() => setDeletePopUpOpen(false)} className="bg-red-400 rounded-2xl p-4">
                                    Non
                                </button>
                            </div>
                        </div>
                    </section>
                )}
                {isAddPopUpOpen && (
                    <section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
                        <div className="h-2/4 bg-white rounded-2xl border-2 w-10/12">
                            <div onClick={() => setAddPopUpOpen(false)} className="m-2 left-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                <p>Retour</p>
                            </div>
                            <form className="flex flex-col h-full overflow-auto">
                                <div className="flex flex-col h-full overflow-auto">
                                    <AddPicture type="exercise" setPathImage={setPathImage}/>
                                    <div className="px-4 mb-3 h-1/7">
                                        <label htmlFor="exerciseName" className="text-sm block font-bold">NAME</label>
                                        <input type="text" name="exerciseName" placeholder="name" required onChange={(e: React.FormEvent<HTMLInputElement>) => setExerciseName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-900 " />
                                    </div>
                                    <div className="px-4 mb-3 h-2/7">
                                        <label htmlFor="exerciseDescription" className="text-sm block font-bold m-1">DESCRIPTION</label>
                                        <textarea name="exerciseDescription" placeholder="description" required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExerciseDescription(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-900 " />
                                    </div>
                                    <div className="px-4 mb-3 h-1/7">
                                        <label htmlFor="duration" className="text-sm block font-bold m-1">DURATION (SEC)</label>
                                        <input type="number" name="duration" placeholder="duration" required onChange={(e: React.FormEvent<HTMLInputElement>) => setExerciseDuration(Number(e.currentTarget.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-green-900 " />
                                    </div>
                                    <div className="flex justify-around mt-2 h-1/8 py-2">
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={addThisExercise}>Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
                {isModifyPopUpOpen && (
                    <section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
                        <div className="h-1/2 bg-white rounded-2xl border-2 w-10/12">
                            <div onClick={() => setModifyPopUpOpen(false)} className="m-2 left-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                <p>Retour</p>
                            </div>
                            <form className="flex flex-col h-full overflow-auto">
                                <div className="flex flex-col h-full overflow-auto">
                                    <AddPicture type="training" setPathImage={setPathImageTraining}/>
                                    <div className="px-4 my-3 h-1/7">
                                        <label htmlFor="exerciseName" className="text-sm block font-bold">NAME</label>
                                        <input type="text" name="exerciseName" value={name} placeholder="name" required onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                    </div>
                                    <div className="px-4 mb-3 h-2/7">
                                        <label htmlFor="exerciseDescription" className="text-sm block font-bold m-1">DESCRIPTION</label>
                                        <textarea name="exerciseDescription" value={description} placeholder="description" required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                    </div>
                                    <div className="flex justify-around mt-2 h-1/8 py-2">
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={modifyTraining}>Modify</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </section>
            <NavBar part="sport" />
        </>
    )
}

export default Training