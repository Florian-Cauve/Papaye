import React, {useState, useEffect} from 'react'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getUserById, updateUser} from "../../helpers/UserHelpers";
import Moment from "moment";
import {IUser} from "../../helpers/interfaces/interfaces";

const Profile = () => {
    Moment.locale("fr")
    const [username, setUserName] = useState("")
    const [newUsername, setNewUserName] = useState("")
    const [creatingDate, setCreatingDate] = useState("")
    const [height, setHeight] = useState(0)
    const [newHeight, setnewHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [newWeight, setnewWeight] = useState(0)
    const [imageURL, setImageURL] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdatePopUpOpen, setUpdatePopUpOpen] = useState<boolean>(false)
    const currentUserId:string | null  = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;


    useEffect(() => {
        if(currentUserId !== null){
            getUserById(currentUserId).then(async res => {
                setUserName(res.data.username)
                setNewUserName(res.data.username)
                setCreatingDate(Moment(res.data.createdAt).format("d MMM YYYY"))
                setHeight(res.data.height)
                setnewHeight(res.data.height)
                setWeight(res.data.weight)
                setnewWeight(res.data.weight)
                setImageURL(res.data.imageURL)
                setIsLoading(false)
            })
        }
    }, [])

    const unlogging = () => {
        localStorage.removeItem("id")
        document.location.href = "/";
    }

    const modifyUser = () => {
        if(newUsername !== "" && newHeight > 0 && newWeight > 0 && currentUserId !== null){
            const newUser:IUser = {
                _id: currentUserId,
                height: newHeight,
                username: newUsername,
                weight: newWeight
            }
            updateUser(newUser).then(r => {
                console.log("Done !")
                document.location.reload()

            })
        }else{
            alert("Les données ne sont pas dans le bon format, veuillez réessayer !")
        }
    }

    return(
        (isLoading ? (
                    <>
                        <Header/>
                        <section className="flex h-screen items-center">
                            <div className="flex flex-row h-3/4 w-full items-center overflow-auto">
                                <span className="flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                                </span>
                            </div>
                        </section>
                        <NavBar part="account"/>
                    </>
            )
            :(
            <>
                <Header/>
                <section className="flex h-screen items-center">
                    <div className="flex flex-col h-3/4 w-full items-center overflow-auto">
                        <div className="flex justify-between items-center w-11/12 flex-row">
                            <Link to="/news" className="flex mb-3 flex-row">
                                <FontAwesomeIcon icon={faAngleLeft} size="2x"/>
                                <div className="text-lg ml-2 text-black-900 font-bold">Retour</div>
                            </Link>
                            <div className="pl-4" onClick={() => setUpdatePopUpOpen(true)}>
                                <FontAwesomeIcon icon={faEdit} className="h-6 w-6" size="2x"/>
                            </div>
                        </div>
                        <div>
                            <img className="rounded-full h-40 w-40" alt="" src={imageURL}/>
                        </div>
                        <div className="text-xl mt-2 font-bold">{username}</div>
                        <button onClick={unlogging} className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                            Deconnexion
                        </button>
                        <div className="flex flex-row mt-6 items-start w-11/12 h-12">
                            <div className="flex flex-col p-1 items-start bg-yellow-100 w-9/12 h-full rounded">
                                <div className="text-xs font-bold">Inscript depuis le {creatingDate}</div>
                                <div className="flex mt-1 flex-row">
                                    <div className="text-xs font-bold">Taille : {height} cm</div>
                                    <div className="text-xs ml-16 font-bold">Poids : {weight} kg</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isUpdatePopUpOpen && (
                        <section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
                            <div className="h-2/4 bg-white rounded-2xl border-2 w-10/12">
                                <div onClick={() => setUpdatePopUpOpen(false)} className="m-2 left-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 19l-7-7 7-7"/>
                                    </svg>
                                    <p>Retour</p>
                                </div>
                                <form className="flex flex-col h-full overflow-auto">
                                    <div className="flex flex-col h-full overflow-auto">
                                        <div className="px-4 mb-3 h-1/7">
                                            <label htmlFor="userName" className="text-sm block font-bold">Username : </label>
                                            <input type="text" name="userName" value={newUsername} placeholder={`Avant: ${username}`} required
                                                   onChange={(e: React.FormEvent<HTMLInputElement>) => setNewUserName(e.currentTarget.value)}
                                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "/>
                                        </div>
                                        <div className="px-4 mb-3 h-2/7">
                                            <label htmlFor="height"
                                                   className="text-sm block font-bold m-1">Height : </label>
                                            <input type="text" pattern="[0-9]*" value={newHeight} name="height" placeholder={`Avant: ${height}`} onChange={(e: React.FormEvent<HTMLInputElement>) => setnewHeight(Number(e.currentTarget.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "/>
                                        </div>
                                        <div className="px-4 mb-3 h-2/7">
                                            <label htmlFor="weight"
                                                   className="text-sm block font-bold m-1">Weight : </label>
                                            <input type="text" pattern="[0-9]*" value={newWeight} name="weight" placeholder={`Avant: ${weight}`} onChange={(e: React.FormEvent<HTMLInputElement>) => setnewWeight(Number(e.currentTarget.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 "/>
                                        </div>
                                        <div className="flex justify-around mt-2 h-1/8 py-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                type="button" onClick={modifyUser}>Modify
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    )}
                </section>
                <NavBar part="account"/>
            </>
            )
        )
    )
}

export default Profile