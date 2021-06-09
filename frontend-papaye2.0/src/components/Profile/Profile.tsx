import React, {useState, useEffect} from 'react'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getUserById} from "../../helpers/UserHelpers";

interface IUser{
    username:string,
    imageURL: string,
    height: number,
    weight: number,
    creatingDate: string,
    // isLoading: boolean
}

const Profile = () => {
    const [userInfos, setuserInfos] = useState<IUser>({
        creatingDate: "",
        height: 0,
        imageURL: "",
        username: "",
        weight: 0
    })

    useEffect(() => {
        const currentUserId:string | null  = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
        if(currentUserId !== null){
            getUserById(currentUserId).then(res => {
                setuserInfos({
                    username:res.data.username,
                    imageURL: res.data.imageURL,
                    height: res.data.height,
                    weight: res.data.weight,
                    creatingDate: res.data.createdAt,
                })
            })
        }

    })

    return(
        <>
            <Header/>
            <div className="h-screen flex flex-col">
                <Link to="/news" className="ml-3 flex flex-row">
                    <FontAwesomeIcon icon={ faAngleLeft } size="2x"/>
                    <div className="text-lg ml-2 text-black-900 font-bold">Retour</div>
                </Link>
                <img className="rounded-full h-40 w-40" alt="" src={userInfos.imageURL}/>
            </div>
            <NavBar part="account"/>
        </>
    )
}

export default Profile