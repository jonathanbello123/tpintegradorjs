const ProductsContainer = document.querySelector(".card-container");
const cartContainer = document.querySelector(".cart-container");
const categoriesContainer = document.querySelector(".categories");
const total = document.querySelector(".total");
const categoriesList = document.querySelectorAll(".category");
const showMoreBtn = document.querySelector(".btn-load");
const buyBtn = document.querySelector(".btn-buy");
const cartBubble = document.querySelector(".cart-bubble");
const cartBtn = document.querySelector(".cart-label");
const menuBtn = document.querySelector(".menu-label");
const cartMenu = document.querySelector(".cart");
const barsMenu = document.querySelector(".nav-list");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");


let cart = JSON.parse(localStorage.getItem('cart')) || [];



const createTemplate = (card) => {
    const { id, name, beneficio, bid, cardIMG, nivel } = card;
    return `<div class="card">
      <img class="img-product" src='${cardIMG}' alt="${name}">
      <div class="products-info">
          <h3 class="tittle-card">${name} <span class="Card-span">${nivel}</span></h3>
          <h4 class="beneficios">${beneficio}</h4>
          <div class="precio-btn">
              <div class="container-precio">
                  <span class="precio">Precio: </span><span class="precio">${bid}</span>
              </div>
              <button class="btn-add"
              data-id='${id}'
              data-name='${name}'
              data-bid='${bid}'
              data-img='${cardIMG}'>Añadir</button>
              
              </div>
          </div>
      </div>
  </div>`;
};



const renderCards = (cardList) => {

    ProductsContainer.innerHTML += cardList.map(createTemplate).join("");
};

const isLastIndexOf = () => {
    return appState.currentCardsIndex === appState.cardsLimit - 1
}

const showMoreCards = () => {
    appState.currentCardsIndex += 1
    let { cards, currentCardsIndex } = appState
    renderCards(cards[currentCardsIndex])
    if (isLastIndexOf()) {
        showMoreBtn.classList.add("hidden")
    }
}
const setShowMoreVisibility = () => {
    if (!appState.activeFilter) {
        showMoreBtn.classList.remove("hidden")
        return;
    }
    showMoreBtn.classList.add("hidden")
}




const changeBtnActiveState = (selectedCategory) => {
    const categories = [...categoriesList]
    categories.forEach((categorybtn) => {
        if (categorybtn.dataset.category !== selectedCategory) {
            categorybtn.classList.remove('active')
            return
        }
        categorybtn.classList.add('active')
    })
}




const changeFilterState = (btn) => {
    appState.activeFilter = btn.dataset.category
    changeBtnActiveState(appState.activeFilter)
    setShowMoreVisibility(appState.activeFilter)
}



const isInactiveFilter = (element) => {
    return (
        element.classList.contains('category') &&
        !element.classList.contains('active')
    );
};


const applyFilter = (event) => {
    const { target } = event;
    if (!isInactiveFilter(target)) return;
    ProductsContainer.innerHTML = '';
    changeFilterState(target)
    if (appState.activeFilter) {
        renderFilteredCards()
        appState.currentCardsIndex = 0
        return
    }
    renderCards(appState.cards[0])

}



const renderFilteredCards = () => {
    const filteredCards = productsData.filter(
        (card) => card.category === appState.activeFilter
    )
    renderCards(filteredCards)
}



const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu")
    if (cartMenu.classList.contains('open-cart')) {
        cartMenu.classList.remove('open-cart')
        return
    }
    overlay.classList.toggle('show-overlay')
}


const toggleCart = () => {
    cartMenu.classList.toggle("open-cart")
    if (barsMenu.classList.contains('open-menu')) {
        barsMenu.classList.remove('open-menu')

        return
    }
    overlay.classList.toggle('show-overlay')
}




const closeOnClick = (e) => {
    if (!e.target.classList.contains('nav-list')) return
    barsMenu.classList.remove('open-menu')
    overlay.classList.remove('show-overlay')
}




const closeOnScroll = () => {
    if (
        !barsMenu.classList.remove('open-menu') &&
        !cartMenu.classList.remove('open-cart')
    )
        return
    barsMenu.classList.remove('open-menu')
    !cartMenu.classList.remove('open-cart')
    overlay.classList.remove('show-overlay')
}

const closeOnOverlayClick = () => {
    barsMenu.classList.remove('open-menu');
    cartMenu.classList.remove('open-cart');
    overlay.classList.remove('show-overlay');
};



const createCartProductTemplate = (cartProduct) => {
    const { id, name, bid, img, quantity } = cartProduct
    return `<div class="cart-item">
    <img class="img-cart" src='${img}' alt=" ${name} "/>
    <div class="item-info">
        <h3 class="item-tittle">${name} </h3>
        <p class="item-bid">precio:<span class="item-price">${bid} </span></p>

    </div>
    <div class="item-handler">
        <span class="quantity-handler down" data-id= ${id} >-</span>
        <span class="item-quantity">${quantity} </span>
        <span class="quantity-handler up" data-id=${id} >+</span>
    </div>
</div>`
}



const renderCart = () => {
    if (!cart.length) {
        cartContainer.innerHTML = "No hay productos en el carrito"
        return
    }
    cartContainer.innerHTML = cart.map(createCartProductTemplate).join(" ");
}

const getCartTotal = () => {
    return cart.reduce(
        (accumulator, current) =>
            accumulator + Number(current.bid) * current.quantity,
        0
    );
};

const showCartTotal = () => {
    total.innerHTML = `${getCartTotal().toFixed(2)} pesos`;
};


const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0)
}


const disableBtn = (btn) => {
    if (!cart.length) {
        btn.classList.add("disabled")
    } else {
        btn.classList.remove("disabled")
    }
}

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}


const updateCartState = () => {
    saveCart()
    renderCart()
    showCartTotal()
    disableBtn(buyBtn)
    disableBtn(deleteBtn)
    renderCartBubble()
}
const createProductData = ({ id, name, bid, img }) => {
    return {
        id,
        name,
        bid,
        img
    }
}

const isExistingCartProduct = (card) => {
    return cart.find((item) => item.id === card.id)
}

const addUnitiToProduct = (card) => {
    cart = cart.map((cartProduct) => cartProduct.id === card.id
        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
        : cartProduct);
}

const createCartProduct = (card) => {
    cart = [...cart, { ...card, quantity: 1 }]
}


const showSuccesModal = (msg) => {
    successModal.classList.add("active-modal")
    successModal.textContent = msg
    setTimeout(() => {
        successModal.classList.remove("active-modal")
    }, 1500)
}


const addProduct = (e) => {
    if (!e.target.classList.contains("btn-add")) return;
    const card = createProductData(e.target.dataset)
    if (isExistingCartProduct(card)) {
        addUnitiToProduct(card)
        showSuccesModal("se agrego una unidad del producto al carrito")
    } else {
        createCartProduct(card)
        showSuccesModal("el producto se ha agregado al carrito")
    }
    updateCartState()

}

const handlePlusBtnEvent = (id) => {
    const ExistingCartProduct = cart.find((item) => item.id === id)
    addUnitiToProduct(ExistingCartProduct)
}

const handleMinusBtnEvent = (id) => {
    const ExistingCartProduct = cart.find((item) => item.id === id)
    if (ExistingCartProduct.quantity === 1) {
        if (window.confirm("¿desea eliminar el producto del carrito?")) {
            removeProductsFromCart(ExistingCartProduct)
        }
        return
    }

    subtractProductUnit(ExistingCartProduct)


}

const removeProductsFromCart = (card) => {
    cart = cart.filter((item) => item.id !== card.id)
    updateCartState()
}




const subtractProductUnit = (card) => {
    cart = cart.map((item) => {
        return item.id === card.id ?
            { ...item, quantity: Number(item.quantity) - 1 }
            : item
    })
}

const handlerQuantity = (e) => {
    if (e.target.classList.contains("down")) {
        handleMinusBtnEvent(e.target.dataset.id)
    } else if (e.target.classList.contains("up")) {
        handlePlusBtnEvent(e.target.dataset.id)
    }
    updateCartState()
}

const resetCartItem = () => {
    cart = []
    updateCartState()
}

const completeCartAction = (confirmMsg, succesMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
        resetCartItem()
        alert(succesMsg)
    }
}


const completeBuy = () => {
    completeCartAction("¿Desea completar su compra?", "¡Gracias por su compra!")
}


const deleteCart = () => {
    completeCartAction("¿Desea vaciar el carrito?", "¡No hay productos en el carrito!")
}



const init = () => {
    renderCards(appState.cards[0]);
    showMoreBtn.addEventListener("click", showMoreCards)
    categoriesContainer.addEventListener("click", applyFilter);
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", closeOnScroll)
    barsMenu.addEventListener("click", closeOnClick)
    overlay.addEventListener("click", closeOnOverlayClick)
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", showCartTotal)
    ProductsContainer.addEventListener("click", addProduct)
    cartContainer.addEventListener("click", handlerQuantity)
    buyBtn.addEventListener("click", completeBuy)
    deleteBtn.addEventListener("click", deleteCart)
    disableBtn(buyBtn)
    disableBtn(deleteBtn)
    renderCartBubble(cart)
}


init()






