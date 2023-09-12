const productsData = [
    {
        id: 1,
        name: "Musculacion",
        nivel: "inicial",
        beneficio: "Rutina",
        bid: 4500,
        category: "Musculacion",
        cardIMG: "/assets/Products/card-hombre.png",

    },
    {
        id: 2,
        name: "Funcional",
        nivel: "inicial",
        beneficio: "Rutina",
        bid: 4500,
        category: "Funcional",
        cardIMG: "/assets/Products/mujer-card.png",

    },
    {
        id: 3,
        name: "Personalizado",
        nivel: "inicial",
        beneficio: "Rutina",
        bid: 4500,
        category: "Personalizados",
        cardIMG: "/assets/Products/perso-card.png",

    },
    {
        id: 4,
        name: "Musculacion",
        nivel: "Avanzado",
        beneficio: "Rutina-Dieta",
        bid: 7000,
        category: "Musculacion",
        cardIMG: "/assets/Products/card-hombre.png",

    },
    {
        id: 5,
        name: "Funcional",
        nivel: "Avanzado",
        beneficio: "Rutina-Dieta",
        bid: 7000,
        category: "Funcional",
        cardIMG: "/assets//Products/mujer-card.png",

    },
    {
        id: 6,
        name: "Personalizado",
        nivel: "Avanzado",
        beneficio: "Rutina-Dieta",
        bid: 7000,
        category: "Personalizados",
        cardIMG: "/assets/Products/perso-card.png",

    },
    {
        id: 7,
        name: "Musculacion",
        nivel: "Premium",
        beneficio: "Rutina-Dieta-otra actividad",
        bid: 10000,
        category: "Musculacion",
        cardIMG: "/assets/Products/card-hombre.png"

    },
    {
        id: 8,
        name: "Funcional",
        nivel: "Premium",
        beneficio: "Rutina-Dieta-otra actividad",
        bid: 10000,
        category: "Funcional",
        cardIMG: "/assets/Products/mujer-card.png",

    },
    {
        id: 9,
        name: "Personalizados",
        nivel: "Premium",
        beneficio: "Rutina-Dieta-otra actividad",
        bid: 10000,
        category: "Personalizados",
        cardIMG: "/assets/Products/perso-card.png",

    },

]


const divideCardsInParts = (size) => {
    let cardList = []
    for (let i = 0; i < productsData.length; i += size) {
        cardList.push(productsData.slice(i, i + size))

    }
    return cardList
}


const appState = {
    cards: divideCardsInParts(6),
    currentCardsIndex: 0,
    cardsLimit: divideCardsInParts(6).length,
    activeFilter: null
}

