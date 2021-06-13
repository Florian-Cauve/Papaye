import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IReceipe } from '../../helpers/interfaces/interfaces'
import { getReceipesFromUser } from '../../helpers/ReciepesHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const MyReceipes = () => {

    const [receipes, setReceipes] = useState<IReceipe[]>([])

    useEffect(() => {
        const currentUserId: string | null = (localStorage.getItem("id") !== null) ? localStorage.getItem("id") : null;
        if (currentUserId != null) {
            getReceipesFromUser(currentUserId)
                .then(res => {
                    setReceipes(res.data)
                })
                .catch(err => {
                    console.error("Erreur requete " + err.message + " " + err.stack)
                })
        } else {
            console.log("User not recognize");
        }
    }, [])

    const AddReceipe = () => {
        document.location.href = "/addReceipe";
    }

    return (
        <>
            <Header />
            <section className="flex h-screen w-screen items-center">
                <div className="flex flex-col w-full h-3/4 items-center overflow-auto">
                    <h1 className="text-3xl text-lime-900 font-bold mb-6">Mes recettes</h1>
                    <button className="mb-3 flex items-center py-2 w-11/12 bg-orange-100 rounded-2xl px-4" onClick={AddReceipe}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="ml-4">Ajouter une recette</p>
                    </button>

                    {receipes.map(receipe =>
                        <Link to={"/receipe/" + receipe._id} key={receipe._id} className="shadow-md p-2 flex items-center h-24 bg-orange-100 w-11/12 my-2 rounded-2xl">
                            {receipe.imageURL ?
                                <img className="h-20 w-20 rounded-2xl" src={receipe.imageURL} alt="food" />
                                :
                                <div className="flex bg-gray-200 h-20 w-20 rounded-2xl justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            }
                            <div className="h-20 w-8/12 flex flex-col iteams-center overflow-hidden pl-6 text-left">
                                <p className="font-bold">{receipe.name}</p>
                                <p className="">{receipe.description}</p>
                            </div>
                        </Link>
                    )}
                </div>
            </section>
            <NavBar part="food" />
        </>
    )
}

export default MyReceipes