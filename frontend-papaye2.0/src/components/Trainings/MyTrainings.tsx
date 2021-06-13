import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { CreateTraining, ITraining } from '../../helpers/interfaces/interfaces'
import { addTraining, getTrainingsFromUser } from '../../helpers/TrainingsHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'
import AddPicture from '../Header/AddPicture'

const MyTrainings = () => {

    const [trainings, setTrainings] = useState<ITraining[]>([])
    const [isAddPopUpOpen, setPopUpOpen] = useState<boolean>(false)
    const [programName, setProgramName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [pathImage, setPathImage] = useState<string>("")

    const currentUserId:string|null  = (localStorage.getItem("id") !== null) ? localStorage.getItem("id") : null ;

    useEffect(() => {
        if(currentUserId!=null){
            getTrainingsFromUser(currentUserId)
                .then(res => {
                    setTrainings(res.data)
                })
                .catch(err => {
                    console.error("Erreur requete " + err.message +" "+ err.stack)
                })
        }else{
            console.log("User not recognize");
        }   
    }, [])

    const AddTraining = () => {
        const createTraining: CreateTraining = {programName, description, owner: currentUserId, pathImage}
        console.log(createTraining);
        
        addTraining(createTraining).then(res => {
            setPopUpOpen(false);
            window.location.reload();
        })
    }

    return(
        <>
            <Header />
            <section className="flex h-screen w-screen items-center">
                <div className="flex flex-col h-3/4 w-full items-center overflow-auto">
                    <h1 className="text-3xl text-lime-900 font-bold mb-6">Mes entraînements</h1>
                    <button className="focus:outline-none mb-3 flex items-center py-2 w-11/12 bg-orange-100 rounded-2xl px-4" onClick={() => setPopUpOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="ml-4">Ajouter un entraînement</p>
                    </button>

                    {trainings.map(training =>
                        <Link to={"/training/" + training._id} key={training._id} className="shadow-md p-2 flex items-center h-24 bg-orange-100 w-11/12 my-2 rounded-2xl">
                            {training.pathImage ?
                                <img className="h-20 w-20 rounded-2xl" src={training.pathImage} alt="food" />
                                :
                                <div className="flex bg-gray-200 h-20 w-20 rounded-2xl justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            }
                            <div className="h-20 w-8/12 flex flex-col iteams-center overflow-auto pl-6 text-left">
                                <p className="font-bold">{training.programName}</p>
                                <p className="">{training.description}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </section>
            {isAddPopUpOpen && (
                    <section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
                        <div className="h-2/4 bg-white rounded-2xl border-2 w-10/12">
                            <div onClick={() => setPopUpOpen(false)} className="m-2 left-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                <p>Retour</p>
                            </div>
                            <form className="flex flex-col h-full overflow-auto">
                                <div className="flex flex-col h-full overflow-auto">
                                    <AddPicture type="training" setPathImage={setPathImage}/>
                                    <div className="px-4 my-3 h-1/7">
                                        <label htmlFor="programName" className="text-sm block font-bold">NAME</label>
                                        <input type="text" name="programName" placeholder="name" required onChange={(e: React.FormEvent<HTMLInputElement>) => setProgramName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                    </div>
                                    <div className="px-4 mb-3 h-2/7">
                                        <label htmlFor="exerciseDescription" className="text-sm block font-bold m-1">DESCRIPTION</label>
                                        <textarea name="description" placeholder="description" required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                    </div>
                                    <div className="flex justify-around mt-2 h-1/8 py-2">
                                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={AddTraining}>Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                )
            }
            <NavBar part="sport" />
        </>
    )
}

export default MyTrainings