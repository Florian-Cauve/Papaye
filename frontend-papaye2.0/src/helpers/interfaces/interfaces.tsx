export interface CreateReceipe {
    name: string,
    description: string,
    duration: string,
    owner: string | null,
    ingredients?: Ingredients[],
    imageURL?: string
}

export interface IUser {
    username:string,
    imageURL: string,
    height: number,
    weight: number,
    creatingDate: string,
    isLoading: boolean
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
    porgramName: string,
    description: string,
    owner: string,
    updatedAt: string,
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

export const defaultTraining: ITraining = {
    _id: "0",
    programName: "",
    description: "",
    exercises: [],
    owner: "0",
    updatedAt: "",
    pathImage: ""
}

export interface IExercises {
    _id: string,
    name: string,
    description: string,
    duration: number,
    training: string,
    pathImage: string
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
    description: string,
    owner: string | null,
}

export interface CreateSocialpost {
    name: string,
    description: string,
    owner: string | null,
}

export const defaultSocialpost: ISocialpost = {
    _id: "",
    name:"",
    description: "",
    owner: "",
}