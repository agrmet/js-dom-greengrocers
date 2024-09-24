const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: "fruit"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: "vegetable"
    }
  ],
  cart: []
};

let cartIndex = 0
const cartItemList = document.querySelector(".cart--item-list")
const storeItemList = document.querySelector(".store--item-list")
function handleCartQuantityAddClick(item) {
  const index = state.cart.indexOf(item)
  state.cart[index].quantity++
  updateCartItemUI(state.cart[index]);
  
}
function handleCartQuantityRemoveClick(item) {
  if (!item) {
    console.error("Item is undefined");
    return;
  }

  const index = state.cart.indexOf(item)

  if (state.cart[index].quantity > 1) {
    state.cart[index].quantity -= 1
    updateCartItemUI(state.cart[index])
  } else {
    state.cart[index].quantity -= 1
    updateCartItemUI(state.cart[index])
    state.cart.splice(index, 1)
  }
}

function handleItemClick(item) {
  const index = state.cart.indexOf(item)
  if (index !== -1) {
    state.cart[index].quantity++
    console.log(state.cart[index]);
    
    updateCartItemUI(state.cart[index]);
  } else {
    item.quantity = 1
    state.cart.push(item)
    addToCartItemUI(item)
  }
}

function updateCartItemUI(item) {
  const cartItemElement = cartItemList.querySelector(`[data-id="${item.id}"]`);

  if (cartItemElement) {
    const quantitySpan = cartItemElement.querySelector(".quantity-text");
    if (item.quantity === 0) {
      cartItemElement.remove()
    }
    quantitySpan.textContent = item.quantity;
  }
}


function addToCartItemUI(item) {
  el = document.createElement("li")
  img = document.createElement("img")
  p = document.createElement("p")
  removeButton = document.createElement("button")
  span = document.createElement("span")
  addButton = document.createElement("button")
  
  img.setAttribute("class", "cart--item-icon")
  img.setAttribute("src", `./assets/icons/${item.id}.svg`)
  img.setAttribute("alt", item.name)

  p.textContent = item.name

  removeButton.setAttribute("class", "quantity-btn remove-btn center")
  removeButton.textContent = "-"
  removeButton.addEventListener("click", () =>{
    handleCartQuantityRemoveClick(item)
  })

  span.setAttribute("class", "quantity-text center")
  span.textContent = item.quantity

  addButton.setAttribute("class", "quantity-btn add-btn center")
  addButton.textContent = "+"
  addButton.addEventListener("click", () => {
    handleCartQuantityAddClick(item)
  })

  el.setAttribute("data-id", item.id)
  el.appendChild(img)
  el.appendChild(p)
  el.appendChild(removeButton)
  el.appendChild(span)
  el.appendChild(addButton)

  cartItemList.appendChild(el)
}

function renderGroceries() {
  state.items.map((item) => {
    console.log(item)
    el = document.createElement("li")
    div = document.createElement("div")
    button = document.createElement("button")
    img = document.createElement("img")

    div.setAttribute("class", "store--item-icon") 
    
    img.setAttribute("src", `./assets/icons/${item.id}.svg`)
    img.setAttribute("alt", item.name)

    div.appendChild(img)

    button.textContent = "Add To Cart"
    button.addEventListener("click", () => {
      handleItemClick(item)
    })

    el.appendChild(div)
    el.appendChild(button)

    storeItemList.appendChild(el)
  })
}
renderGroceries();