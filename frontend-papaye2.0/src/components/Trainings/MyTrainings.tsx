import React, {useState, useEffect} from 'react'
import { Training } from '../../helpers/interfaces/interfaces'
import { getTrainingsFromUser } from '../../helpers/TrainingsHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const MyTrainings = () => {

    const [trainings, setTrainings] = useState<Training[]>([])

    useEffect(() => {
        const currentUserId:string|null  = (localStorage.getItem("id") !== null) ? localStorage.getItem("id") : null ;
        if(currentUserId!=null){
            getTrainingsFromUser(currentUserId)
                .then(res => {
                    console.log(res.data)
                    setTrainings(res.data)
                })
                .catch(err => {
                    console.error("Erreur requete " + err.message +" "+ err.stack)
                })
        }else{
            console.log("User not recognize");
        }   
    }, [])

    return(
        <>
            <Header/>
            <section className="flex h-screen items-center">
                <div className="flex flex-col h-3/4 w-full items-center overflow-auto">
                    <h1 className="text-3xl text-green-900 font-bold">Mes Trainings</h1>
                    <button>

                    </button>
                </div>
            </section>
            <NavBar part="sport"/>
        </>
    )
}

export default MyTrainings