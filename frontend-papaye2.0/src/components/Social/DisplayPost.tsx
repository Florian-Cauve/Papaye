import { useState, useEffect } from 'react'
import { ISocialpost } from '../../helpers/interfaces/interfaces'
import { getAllPost } from '../../helpers/SocialHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'


const MySocialNetwork = () => {

    const [socialposts, setSocialPost] = useState<ISocialpost[]>([])
    const currentUserId: string | null = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;

    useEffect(() => {
        getAllPost()
            .then(res => setSocialPost(res.data))
            .catch(err => {
                console.error("Erreur requete " + err.message + " " + err.stack)
            })
    }
        , [])

    const AddPost = () => {
        document.location.href = "/addPost";
    }

    function refreshPage() {
        window.location.reload();
    }

    return (
        <>
            <Header />
            <section className="flex h-screen w-screen items-center">
                <div className="flex flex-col w-full h-3/4 items-center overflow-auto">
                    <h1 className="text-3xl text-green-900 font-bold mb-6">Mon réseau Social</h1>
                    <button className="focus:outline-none mb-3 flex items-center py-2 w-11/12 bg-lime-900 rounded-2xl px-4" onClick={AddPost}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="ml-4 text-white">Ajouter un post</p>
                    </button>


                    <button className="focus:outline-none mb-3 flex items-center py-2 bg-orange-100 rounded-2xl px-8" onClick={refreshPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="bg-white rounded-full p-1 h-7 w-7" viewBox="0 0 24 24">
                            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 
                            3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 
                            0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
                        </svg>
                    </button>

                    {socialposts.map(socialpost =>

                        <div key={socialpost._id} className=" flex-col h-29 text-left w-11/12 my-2">
                            <p className="pl-4">Publié par : {socialpost.pseudo}</p>
                            {socialpost.owner === currentUserId ? <div className="shadow-md flex items-center py-2 h-max bg-coolGray-100 w-full my-2 rounded-2xl">
                                <div className=" w-8/12 flex flex-col iteams-center overflow-hidden pl-6 text-left">
                                    <p className="font-bold">{socialpost.name}</p>
                                    <p className="">{socialpost.description}</p>
                                </div>
                            </div> :
                                <div className="shadow-md flex items-center py-2 h-max bg-orange-100 w-full my-2 rounded-2xl">
                                    <div className=" w-8/12 flex flex-col iteams-center overflow-hidden pl-6 text-left">
                                        <p className="font-bold">{socialpost.name}</p>
                                        <p className="">{socialpost.description}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </section>
            <NavBar part="home" />
        </>
    )
}

export default MySocialNetwork