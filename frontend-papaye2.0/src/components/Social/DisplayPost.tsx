import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ISocialpost } from '../../helpers/interfaces/interfaces'
import { getAllPost } from '../../helpers/SocialHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const MyReceipes = () => {

    const [receipes, setReceipes] = useState<ISocialpost[]>([])

    useEffect(() => {
        getAllPost()
                .then(res => {
                    setReceipes(res.data)
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
            <section className="flex h-screen items-center">
                <div className="flex flex-col h-3/4 items-center overflow-auto">
                    
                </div>
            </section>
            <NavBar part="food" />
        </>
    )
}

export default MyReceipes