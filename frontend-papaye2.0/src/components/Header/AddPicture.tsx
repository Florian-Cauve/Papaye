import React from "react";
import { useState } from 'react'

interface IProps {
	type: string;
	setPathImage : (pathImage:string) => void;
}

const AddPicture = (props: IProps) => {

	const [isModalOpened, setModalState] = useState<boolean>(false)
	const [imagesList, setImagesList] = useState<string[]>([])

	const selected_folder: {[index: string]: any} = {
		"training" : require.context("../../images/training/", false, /\.(png|jpe?g|svg)$/),
		"receipe" : require.context("../../images/receipe/", false, /\.(png|jpe?g|svg)$/),
		"exercise" : require.context("../../images/exercise/", false, /\.(png|jpe?g|svg)$/),
	}

	function importAll(r:any) {
		return r.keys().map(r);
	}

	async function loadImages() {

		let listImagesLocal:string[] = [];
		const images = importAll(selected_folder[props.type]);
		let name:string;
		await images.map((module:any) => (
			listImagesLocal.push(module.default.toString())
		))
		setImagesList(listImagesLocal)
		setModalState(true)

	}

	function selectAnImage(selectedImage:string){
		props.setPathImage(selectedImage)
		setModalState(false)
	}




	return (

		<>

		<div className="text-white bg-lime-900 w-min p-3 rounded-lg mx-auto"
			onClick = {() => {
				loadImages()
			}}>
			<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
		</div>

		{isModalOpened && (
			<section className="absolute top-0 right-0 w-screen flex h-screen items-center justify-center bg-white bg-opacity-50">
				<div className="h-3/5 w-11/12 p-4 bg-orange-100 rounded-2xl overflow-auto">
					<div className="my-4 text-xl font-bold text-lime-900">Selectionnez votre image :</div>
					<div className="flex flex-wrap justify-around">
						{imagesList.map((src:string) => (
							<img src={src} className="w-2/5 object-contain rounded-full m-1" onClick={() => selectAnImage(src)}/>
						))}
					</div>
					<div className="py-2 px-4 text-white mx-auto mt-6 bg-red-400 w-min rounded-2xl" onClick={() => setModalState(false)}>Annuler</div>
				</div>

			</section>
		)}

		</>
		
	)
}

export default AddPicture;