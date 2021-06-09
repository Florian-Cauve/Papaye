import {useState, useEffect} from 'react'
import { Receipe } from '../../helpers/interfaces/interfaces'
import { getReceipesFromUser } from '../../helpers/ReciepesHelpers'
import Header from '../Header/Header'
import NavBar from '../Header/NavBar'

const MyReceipes = () => {

    const [receipes, setReceipes] = useState<Receipe[]>([])

    useEffect(() => {
        const currentUserId:string|null  = (localStorage.getItem("id") !== null) ? localStorage.getItem("id") : null ;
        if(currentUserId!=null){
            getReceipesFromUser(currentUserId)
                .then(res => {
                    console.log(res.data)
                    setReceipes(res.data)
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
            <div className="h-screen flex flex-col">
                <h1 className="text-3xl text-green-900 font-bold">Mes recettes</h1>
                <button>

                </button>
            </div>
            <NavBar part="food"/>
        </>
    )
}

export default MyReceipes