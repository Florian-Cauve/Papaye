import React, {useState, useEffect} from 'react'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getUserById} from "../../helpers/UserHelpers";
import Moment from "moment";
import {IUser} from "../../helpers/interfaces/interfaces";

const Profile = () => {
    Moment.locale("fr")
    const [userInfos, setuserInfos] = useState<IUser>({
        creatingDate: "",
        height: 0,
        imageURL: "",
        username: "",
        weight: 0,
        isLoading: true
    })

    useEffect(() => {
        const currentUserId:string | null  = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
        if(currentUserId !== null){
            getUserById(currentUserId).then(async res => {
                await setuserInfos({
                    username:res.data.username,
                    imageURL: res.data.imageURL,
                    height: res.data.height,
                    weight: res.data.weight,
                    creatingDate: Moment(res.data.createdAt).format("d MMM YYYY"),
                    isLoading:false
                })
            })
        }
    }, [])

    const unlogging = () => {
        localStorage.removeItem("id")
        document.location.href = "/";
    }

    

    return(
        (userInfos.isLoading ? (
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
                        <div className="flex items-start w-11/12 flex-row">
                            <Link to="/news" className="flex mb-3 flex-row">
                                <FontAwesomeIcon icon={faAngleLeft} size="2x"/>
                                <div className="text-lg ml-2 text-black-900 font-bold">Retour</div>
                            </Link>
                        </div>
                        <div>
                            <img className="rounded-full h-40 w-40" alt="" src={userInfos.imageURL}/>
                        </div>
                        <div className="text-xl mt-2 font-bold">{userInfos.username}</div>
                        <button onClick={unlogging} className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                            Deconnexion
                        </button>
                        <div className="flex flex-row mt-6 items-start w-11/12 h-12">
                            <div className="flex flex-col p-1 items-start bg-yellow-100 w-9/12 h-full rounded">
                                <div className="text-xs font-bold">Inscript depuis le {userInfos.creatingDate}</div>
                                <div className="flex mt-1 flex-row">
                                    <div className="text-xs font-bold">Taille : {userInfos.height} cm</div>
                                    <div className="text-xs ml-16 font-bold">Poids : {userInfos.weight} kg</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <NavBar part="account"/>
            </>
            )
        )
    )
}

export default Profile