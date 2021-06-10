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

export interface Training {
    _id: string,
    porgramName: string,
    description: string,
    owner: string,
    updatedAt: string,
    pathImage?: string
}