export interface CreateReceipe {
    name: string,
    description: string,
    duration: string,
    owner: string | null,
    ingredients?: Ingredients[],
    imageURL?: string
}

export interface Receipe {
    id: string,
    name: string,
    description: string,
    duration: string,
    owner: string,
    ingredients: {
        name: string,
        quantity: string
    },
    imageURL: string
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
    id: string,
    porgramName: string,
    description: string,
    owner: string,
    updatedAt: string,
    pathImage?: string
}