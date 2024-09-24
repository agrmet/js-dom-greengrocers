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
    updateTotal()

    updateTotal()

  } else {
    item.quantity = 1
    state.cart.push(item)
    addToCartItemUI(item)
    updateTotal()

  }
}

function updateTotal() {
  const total = document.querySelector('.total-number')
  if (!total) {
    console.log("Total not found");
    return
  }

  let sum = 0

  for (let index = 0; index < state.cart.length; index++) {
    const element = state.cart[index]
    sum += element.price * element.quantity
  }
  console.log(sum);
  
  total.textContent = `£${sum}`
}

function updateCartItemUI(item) {
  const cartItemElement = cartItemList.querySelector(`[data-id="${item.id}"]`)
  updateTotal()

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
  img = createImageElement(item);
  removeButton = removeButtonElement(item);
  p = document.createElement("p")
  addButton = createAddButtonElement(item);
  span = document.createElement("span")
  
  p.textContent = item.name
  
  span.setAttribute("class", "quantity-text center")
  span.textContent = item.quantity
  
  el.setAttribute("data-id", item.id)
  el.appendChild(img)
  el.appendChild(p)
  el.appendChild(removeButton)
  el.appendChild(span)
  el.appendChild(addButton)

  cartItemList.appendChild(el)
}

function createAddButtonElement(item) {
  addButton = document.createElement("button");
  addButton.setAttribute("class", "quantity-btn add-btn center");
  addButton.textContent = "+";
  addButton.addEventListener("click", () => {
    handleCartQuantityAddClick(item);
  });
  return addButton
}

function createImageElement(item) {
  img = document.createElement("img");
  img.setAttribute("class", "cart--item-icon");
  img.setAttribute("src", `./assets/icons/${item.id}.svg`);
  img.setAttribute("alt", item.name);
  return img
}

function removeButtonElement(item) {
  removeButton = document.createElement("button");
  removeButton.setAttribute("class", "quantity-btn remove-btn center");
  removeButton.textContent = "-";
  removeButton.addEventListener("click", () => {
    handleCartQuantityRemoveClick(item);
  });
  return removeButton
}

function renderGroceries() {
  storeItemList.innerHTML = '';
  const filterInput = document.getElementById("filterInput").value.toLowerCase();

  const sortValue = document.getElementById("sortOptions").value
 
  const filteredItems = state.items.filter((item) => item.type.includes(filterInput))

  switch (sortValue) {
    case 'asc':
      filteredItems.sort((item1, item2) => item1.name.localeCompare(item2.name))
      console.log("Ascending");
      break;

    case 'desc':
      filteredItems.sort((item1, item2) => item2.name.localeCompare(item1.name))
      console.log("Descending");
      break;

    case 'price':
      filteredItems.sort((item1, item2) => item1.price - item2.price)
      console.log("Price");
      break;

    default:
      break;
  }
  
  filteredItems.map((item) => {
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
document.getElementById('sortOptions').addEventListener('change', () => {
  renderGroceries()
})
renderGroceries();