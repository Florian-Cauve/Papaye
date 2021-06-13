export interface CreateReceipe {
    name: string,
    description: string,
    duration: string,
    owner: string | null,
    ingredients?: Ingredients[],
    imageURL?: string
}

export interface IUser {
    _id:string,
    username:string,
    imageURL: string,
    password:string,
    height: number,
    weight: number,
}

export interface IReceipe {
    _id: string,
    name: string,
    description: string,
    duration: string,
    owner: string | null,
    ingredients: Ingredients[],
    imageURL: string
}

export const defaultReceipe: IReceipe = {
    _id: "",
    name:"",
    description: "",
    duration: "",
    owner: "",
    ingredients: [],
    imageURL: ""
}

export interface Ingredients {
    name: string,
    quantity: string
}

export interface CreateTraining {
    programName: string,
    description: string,
    owner: string | null,
    pathImage?: string
}

export interface ITraining {
    _id: string,
    programName: string,
    description: string,
    exercises: IExercises[],
    owner: string,
    updatedAt: string,
    pathImage?: string
}

export interface IExercises {
    _id: string, 
    name: string,
    description: string,
    duration: number,
    training: string,
    pathImage: string
}

export const defaultExercise: IExercises = {
    _id: "", 
    name: "",
    description: "",
    duration: 0,
    training: "",
    pathImage: ""
}

export const defaultTraining: ITraining = {
    _id: "0",
    programName: "",
    description: "",
    exercises: [defaultExercise],
    owner: "0",
    updatedAt: "",
    pathImage: ""
}

export interface CreateExercise {
    name: string,
    description: string,
    duration: number | undefined,
    training: string,
    pathImage: string
}

export interface ISocialpost {
    _id: string,
    name: string,
    pseudo: string,
    description: string,
    owner: string | null,
}

export interface CreateSocialpost {
    pseudo: string,
    name: string,
    description: string,
    owner: string | null,
}

export const defaultSocialpost: ISocialpost = {
    _id: "",
    pseudo: "",
    name:"",
    description: "",
    owner: "",
}