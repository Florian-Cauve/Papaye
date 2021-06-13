import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CreateSocialpost } from "../../helpers/interfaces/interfaces"
import { addPost } from "../../helpers/SocialHelpers"
import Header from "../Header/Header"
import {getUserById} from "../../helpers/UserHelpers";


const AddSocialPost = () => {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [userName, setuserName] = useState<string>("")

    useEffect(() => {
        const currentUserId:string | null  = (localStorage.getItem("id") !== "") ? localStorage.getItem("id") : null;
        if(currentUserId !== null){
            getUserById(currentUserId).then(res => 
                setuserName(
                    res.data.username,
                )
            )
        }
    }, [])

    const closePopUp = () => {
        const owner = localStorage.getItem("id");
        const pseudo = userName;
        const socialpost: CreateSocialpost = { pseudo, name, description, owner}
        addPost(socialpost).then(res =>
            document.location.href = "/"
        )
    }

    

    return (
        <section className="flex h-screen w-screen bg-white bg-opacity-50 justify-center items-center absolute top-0 right-0">
            <Header />
            <div className="w-10/12 h-4/5 mt-20 bg-orange-100 rounded-2xl py-4">
                <Link className="absolute top-20 left-4 flex items-center" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <p>Retour</p>
                </Link>
                <form className="flex flex-col h-full overflow-auto">
                    <div className="flex flex-col h-full overflow-auto">
                        <div className="px-4 mb-3 h-1/7">
                            <label htmlFor="name" className="text-sm block font-bold">Titre</label>
                            <input type="text" name="name" value={name} placeholder="name" required onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                        </div>
                        <div className="px-4 mb-3 h-2/7">
                            <label htmlFor="description" className="text-sm  block font-bold m-1">DESCRIPTION</label>
                            <textarea rows={20} name="description" value={description}  placeholder="description" required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 "  ></textarea>
                        </div>
                    </div>
                    <div className="flex justify-around mt-2 h-1/8 py-2">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={closePopUp}>Create</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddSocialPost