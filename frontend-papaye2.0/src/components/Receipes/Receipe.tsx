import React from 'react'
import react, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { defaultReceipe, IReceipe } from '../../helpers/interfaces/interfaces'
import { getReceipesById } from '../../helpers/ReciepesHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const Receipe = () => {

    const [receipe, setReceipe] = useState<IReceipe>(defaultReceipe)
    const params: { id: string } = useParams()

    useEffect(() => {
        console.log(params.id)
        getReceipesById(params.id)
            .then(res => {
                setReceipe(res.data)
                console.log(res.data)
            })
    }, [])

    return (
        <>
            <Header />
            <section className="flex h-screen items-center justify-center">
                <Link className="absolute top-20 left-4 flex items-center" to="/receipes">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <p>Retour</p>
                </Link>
                <div className="h-3/4 w-11/12 flex flex-col items-center">
                    {receipe.imageURL ?
                        <img className="h-24 w-24 rounded-2xl" src={receipe.imageURL} alt="food" />
                        :
                        <div className="flex bg-gray-200 h-24 w-24 rounded-2xl justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    }
                    <p className="my-3 text-xl font-bold">{receipe.name}</p>
                    <div className="flex items-center w-1/2 justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>{receipe.duration}</p>
                        <Link to={"update/" + receipe._id} className="pl-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </Link>
                        <button className="pl-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col w-full h-1/3">
                        <p className="px-8 my-1 text-left text-green-900 font-bold">Igrédients</p>
                        <div className="h-full p-2 bg-yellow-200 rounded-2xl flex flex-col items-center overflow-auto">
                            {receipe.ingredients.map((ingredient, index) =>
                                <div key={index} className="flex p-1 my-1 w-11/12 justify-between rounded-xl bg-white">
                                    <p className="px-3">{ingredient.name}</p>
                                    <p className="px-3">{ingredient.quantity}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col w-full h-1/3">
                        <p className="px-8 my-1 text-left text-green-900 font-bold">Recette</p>
                        <div className="flex bg-yellow-200 p-5 my-1 w-full h-full justify-between rounded-xl bg-white">
                            <p className="bg-white p-4 rounded-2xl w-full text-left overflow-auto">{receipe.description}</p>
                        </div>
                    </div>

                </div>
            </section>
            <NavBar part="food" />
        </>
    )
}

export default Receipe;