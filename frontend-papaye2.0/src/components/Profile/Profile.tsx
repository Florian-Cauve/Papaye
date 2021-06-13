import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getUserById, updateUser } from "../../helpers/UserHelpers";
import Moment from "moment";
import { ISocialpost, IUser } from "../../helpers/interfaces/interfaces";
import { getSocialpostsFromUser } from "../../helpers/SocialHelpers";

const Profile = () => {
    Moment.locale("fr")
    const [username, setUserName] = useState("")
    const [newUsername, setNewUserName] = useState("")
    const [creatingDate, setCreatingDate] = useState("")
    const [password, setPassword] = useState("")
    const [height, setHeight] = useState(0)
    const [newHeight, setnewHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [newWeight, setnewWeight] = useState(0)
    const [imageURL, setImageURL] = useState("")
    const [newImageURL, setnewImageURL] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdatePopUpOpen, setUpdatePopUpOpen] = useState<boolean>(false)
    const currentUserId: string | null = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
    const [socialposts, setSocialPost] = useState<ISocialpost[]>([])



    useEffect(() => {
        if (currentUserId !== null) {
            getUserById(currentUserId).then(async res => {
                setUserName(res.data.username)
                setNewUserName(res.data.username)
                setCreatingDate(Moment(res.data.createdAt).format("DD MMM YYYY"))
                setPassword(res.data.password)
                setHeight(res.data.height)
                setnewHeight(res.data.height)
                setWeight(res.data.weight)
                setnewWeight(res.data.weight)
                setImageURL(res.data.imageURL)
                setnewImageURL(res.data.imageURL)
                setIsLoading(false)
            }).catch(err => {
                console.error("Erreur requete " + err.message + " " + err.stack)
            })
            getSocialpostsFromUser(currentUserId)
                .then(res => {
                    setSocialPost(res.data)
                })
                .catch(err => {
                    console.error("Erreur requete " + err.message + " " + err.stack)
                })
        }
    }, [])

    const unlogging = () => {
        localStorage.removeItem("id")
        document.location.href = "/";
    }

    const modifyUser = () => {
        if (newUsername !== "" && newHeight > 0 && newWeight > 0 && newHeight < 250 && newWeight < 250 && currentUserId !== null) {
            const newUser: IUser = {
                _id: currentUserId,
                password: password,
                height: newHeight,
                imageURL: newImageURL,
                username: newUsername,
                weight: newWeight
            }
            updateUser(newUser).then(r => {
                console.log("Done !")
                document.location.reload()

            })
        } else {
            alert("Les données ne sont pas dans le bon format, veuillez réessayer !")
        }
    }

    const addDefault = (ev: any) => {
        ev.target.src = "error_pp.png"
        ev.target.className = "h-40 w-40"
    }

    return (
        (isLoading ? (
            <>
                <Header />
                <section className="flex h-screen items-center">
                    <div className="flex flex-row h-3/4 w-full items-center overflow-auto">
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        </span>
                    </div>
                </section>
                <NavBar part="account" />
            </>
        )
            : (
                <>
                    <Header />
                    <section className="flex h-screen items-center">
                        <div className="flex flex-col h-3/4 w-full items-center overflow-auto">
                            <div className="flex justify-end items-center w-11/12 flex-row mb-3">
                                <div className="pl-4 " onClick={() => setUpdatePopUpOpen(true)}>
                                    <FontAwesomeIcon icon={faEdit} className="h-6 w-6" size="2x" />
                                </div>
                            </div>
                            {imageURL ? (
                                <div>
                                    <img className="rounded-full h-40 w-40" alt="" onError={addDefault} src={imageURL} />
                                </div>
                            ) :
                                <svg xmlns="http://www.w3.org/2000/svg" className="rounded-full h-40 w-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                            <div className="flex flex-row">
                                <div className="text-xl mt-2 font-bold">{username}</div>
                                <button onClick={unlogging} className="mt-2 text-red-400 font-bold py-1 px-2 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-row mt-6 items-center justify-center w-11/12 h-16">
                                <div className="flex flex-col p-4 items-center justify-center bg-orange-100 w-9/12 h-full text-left rounded-2xl">
                                    <div className="w-full text-sm font-bold">Inscript depuis le {creatingDate}</div>
                                    <div className="w-full flex mt-1 flex-row">
                                        <div className="text-sm font-bold">Taille : {height} cm</div>
                                        <div className="text-sm ml-1 font-bold"> -  Poids : {weight} kg</div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl text-lime-900 mt-2 font-bold">Mes posts :</div>
                            {(socialposts.length > 0 ?
                                socialposts.map(socialpost =>
                                    <div key={socialpost._id} className=" flex-col h-29 text-left w-11/12 my-2">
                                        <div className="shadow-md flex items-center py-2 h-max bg-orange-100 w-full my-1 rounded-2xl">
                                            <div className=" w-8/12 flex flex-col iteams-center overflow-hidden pl-6 text-left">
                                                <p className="font-bold">{socialpost.name}</p>
                                                <p className="">{socialpost.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <div className="text-3xl mt-24 text-gray-300 font-bold">Aucun post</div>
                                    </div>

                                )
                            )}
                        </div>
                        {isUpdatePopUpOpen && (
                            <section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
                                <div className="h-2/4 bg-orange-100 rounded-2xl border-2 w-10/12">
                                    <div onClick={() => setUpdatePopUpOpen(false)} className="m-2 left-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <p>Retour</p>
                                    </div>
                                    <form className="flex flex-col h-full overflow-auto">
                                        <div className="flex flex-col h-full overflow-auto">
                                            <div className="px-4 mb-3 h-1/7">
                                                <label htmlFor="userName" className="text-sm block font-bold">Username : </label>
                                                <input type="text" name="userName" value={newUsername} placeholder={`Avant: ${username}`} required
                                                    onChange={(e: React.FormEvent<HTMLInputElement>) => setNewUserName(e.currentTarget.value)}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                            </div>
                                            <div className="px-4 mb-3 h-2/7">
                                                <label htmlFor="imageURL"
                                                    className="text-sm block font-bold m-1">Image (URL) : </label>
                                                <input type="text" value={newImageURL} name="height" placeholder={`Avant: ${(imageURL === undefined ? "Aucune" : imageURL)}`} onChange={(e: React.FormEvent<HTMLInputElement>) => setnewImageURL(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                            </div>
                                            <div className="px-4 mb-3 h-2/7">
                                                <label htmlFor="height"
                                                    className="text-sm block font-bold m-1">Height : </label>
                                                <input type="text" pattern="[0-9]*" value={newHeight} name="height" placeholder={`Avant: ${height}`} onChange={(e: React.FormEvent<HTMLInputElement>) => setnewHeight(Number(e.currentTarget.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                            </div>
                                            <div className="px-4 mb-3 h-2/7">
                                                <label htmlFor="weight"
                                                    className="text-sm block font-bold m-1">Weight : </label>
                                                <input type="text" pattern="[0-9]*" value={newWeight} name="weight" placeholder={`Avant: ${weight}`} onChange={(e: React.FormEvent<HTMLInputElement>) => setnewWeight(Number(e.currentTarget.value))} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                                            </div>
                                            <div className="flex justify-around mt-2 h-1/8 py-2">
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="button" onClick={modifyUser}>Confirmer
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        )}

                    </section>
                    <NavBar part="account" />
                </>
            )
        )
    )
}

export default Profile