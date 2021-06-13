import { useState } from "react"
import { Link } from "react-router-dom"
import { CreateReceipe, Ingredients } from "../../helpers/interfaces/interfaces"
import { addReceipe } from "../../helpers/ReciepesHelpers"
import AddPicture from "../Header/AddPicture"
import Header from "../Header/Header"

const AddReceipe = () => {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [duration, setDuration] = useState<string>("")
    const [pathImage, setPathImage] = useState<string>("")
    const [ingredients, setIngredients] = useState<Ingredients[]>([])
    const [ingredientName, setIngredientName] = useState<string>("")
    const [ingredientQuantity, setIngredientQuantity] = useState<string>("")

    const addIngredient = () => {
        const ingredient: Ingredients[] = [{ name: ingredientName, quantity: ingredientQuantity }];
        setIngredientName("")
        setIngredientQuantity("")
        setIngredients(ingredients.concat(ingredient))
    }

    const deleteIngredient = (index: number) => {
        let array: Ingredients[] = ingredients;
        array.splice(index, 1);
        setIngredients(array);
    }

    const closePopUp = () => {
        const owner = localStorage.getItem("id");
        const receipe: CreateReceipe = { name, description, duration, owner, ingredients, imageURL: pathImage }
        addReceipe(receipe).then(res =>
            document.location.href = "/receipes"
        )
    }

    return (
        <section className="flex h-screen w-screen bg-white bg-opacity-50 justify-center items-center absolute top-0 right-0">
            <Header />
            <div className="w-10/12 h-4/5 mt-20 bg-orange-100 rounded-2xl py-4">
                <Link className="absolute top-20 left-4 flex items-center" to="/receipes">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <p>Retour</p>
                </Link>
                <form className="flex flex-col h-full overflow-auto">
                    <div className="flex flex-col h-full overflow-auto">
                        <AddPicture type="receipe" setPathImage={setPathImage}/>
                        <div className="px-4 my-3 h-1/7">
                            <label htmlFor="name" className="text-sm block font-bold">NAME</label>
                            <input type="text" name="name" value={name} placeholder="name" required onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                        </div>
                        <div className="px-4 mb-3 h-2/7">
                            <label htmlFor="description" className="text-sm block font-bold m-1">DESCRIPTION</label>
                            <textarea name="description" value={description} placeholder="description" required onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                        </div>
                        <div className="px-4 mb-3 h-1/7">
                            <label htmlFor="duration" className="text-sm block font-bold m-1">DURATION</label>
                            <input type="number" name="duration" value={duration} placeholder="duration" required onChange={(e: React.FormEvent<HTMLInputElement>) => setDuration(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                        </div>
                        <div className="px-4 mb-4 h-1/7">
                            <label htmlFor="ingredientName" className="text-sm block font-bold m-1 pb-2">INGREDIENT NAME</label>
                            <input type="text" name="ingredientName" value={ingredientName} placeholder="Ingredient name" onChange={(e: React.FormEvent<HTMLInputElement>) => setIngredientName(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                        </div>
                        <div className="px-4 pb-4 mb-4 h-1/7">
                            <label htmlFor="ingredientQuantity" className="text-sm block font-bold m-1 pb-2">INGREDIENT QUANTITY</label>
                            <input type="text" name="ingredientQuantity" value={ingredientQuantity} placeholder="Ingredient quantity" onChange={(e: React.FormEvent<HTMLInputElement>) => setIngredientQuantity(e.currentTarget.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-lime-900 " />
                        </div>
                        <div onClick={addIngredient} className="h-1/7 my-2 mx-16 rounded-2xl bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                            Add ingredient
                        </div>
                        <div className="flex overflow-auto px-2">
                            {ingredients.map((ingredient, index) =>
                                <div key={index} className="flex mb-3 mx-1 border-2 border-gray-200 rounded-2xl bg-lime-900 items-center text-white">
                                    <p className="whitespace-nowrap px-4 py-1 ">{ingredient.name} - {ingredient.quantity}</p>
                                    <div onClick={() => deleteIngredient(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            )}
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

export default AddReceipe