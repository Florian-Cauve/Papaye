export interface CreateReceipe {
    name: string,
    description: string,
    duration: number,
    owner: string,
    ingredients?: {
        name: string,
        quantity: string
    },
    imageURL?: string
}

export interface Receipe {
    id: string,
    name: string,
    description: string,
    duration: number,
    owner: string,
    ingredients: {
        name: string,
        quantity: string
    },
    imageURL: string
}