import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ISocialpost } from '../../helpers/interfaces/interfaces'
import { getAllPost } from '../../helpers/SocialHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const MySocialNetwork = () => {

    const [socialposts, setSocialPost] = useState<ISocialpost[]>([])

    useEffect(() => {
        getAllPost()
                .then(res => {
                    setSocialPost(res.data)
                    console.log(res.data);
                                        
                })
                .catch(err => {
                    console.error("Erreur requete " + err.message + " " + err.stack)
                })
        } 
    , [])

    const AddPost = () => {
        document.location.href = "/addPost";
    }

    return (
        <>
            <Header />
            <section className="flex h-screen w-screen items-center">
                <div className="flex flex-col w-full h-3/4 items-center overflow-auto">
                    <h1 className="text-3xl text-green-900 font-bold mb-6">Mon réseau Social</h1>
                    <button className="mb-3 flex items-center py-2 w-11/12 bg-yellow-200 rounded-2xl px-4" onClick={AddPost}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="ml-4">Ajouter un post</p>
                    </button>

                    {socialposts.map(socialpost =>
                        <div className="shadow-md p-2 flex items-center h-24 bg-yellow-200 w-11/12 my-2 rounded-2xl">
                            <div className="h-20 w-8/12 flex flex-col iteams-center overflow-hidden pl-6 text-left">
                                <p className="font-bold">{socialpost.name}</p>
                                <p className="">{socialpost.description}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <NavBar part="home" />
        </>
    )
}

export default MySocialNetwork