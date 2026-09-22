// =========================
// CART
// =========================

let cart = [];


// Add product to cart
function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  // Open cart after adding
  document.getElementById("cartPanel").classList.add("open");
}


// Update cart display
function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  // Calculate total quantity
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartCount.textContent = totalItems;
  cartTotal.textContent = totalPrice;


  // Empty cart
  if (cart.length === 0) {

    cartItems.innerHTML = `
      <p>Your cart is empty.</p>
    `;

    return;
  }


  // Display cart items
  cartItems.innerHTML = cart.map((item, index) => {

    return `
      <div class="cart-item">

        <div>
          <strong>${item.name}</strong>
          <br>
          ₹${item.price} × ${item.quantity}
        </div>

        <div>

          <button onclick="changeQuantity(${index}, -1)">
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button onclick="changeQuantity(${index}, 1)">
            +
          </button>

        </div>

      </div>
    `;

  }).join("");
}


// Change item quantity
function changeQuantity(index, change) {

  cart[index].quantity += change;

  // Remove item if quantity reaches zero
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// =========================
// CART PANEL
// =========================

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");


// Open cart
cartButton.addEventListener("click", function () {

  cartPanel.classList.add("open");

});


// Close cart
closeCart.addEventListener("click", function () {

  cartPanel.classList.remove("open");

});


// =========================
// FORTUNE SYSTEM
// =========================

let fortune = 100;

const fortuneOverlay = document.getElementById("fortuneOverlay");
const fortuneScreen = document.getElementById("fortuneScreen");
const blockedMessage = document.getElementById("blockedMessage");

const fortuneValue = document.getElementById("fortuneValue");
const fortuneBar = document.getElementById("fortuneBar");
const fortuneMessage = document.getElementById("fortuneMessage");

const tryAgain = document.getElementById("tryAgain");
const giveUp = document.getElementById("giveUp");
const backToShop = document.getElementById("backToShop");


// Fortune messages
const fortunes = [

  {
    message: "Your future looks suspiciously average.",
    min: 70
  },

  {
    message: "A delicious future awaits you.",
    min: 50
  },

  {
    message: "The universe is mildly concerned.",
    min: 30
  },

  {
    message: "Your croissant may be judging you.",
    min: 15
  },

  {
    message: "The bakery gods have abandoned you.",
    min: 0
  }

];


// Open fortune modal
function openFortune() {

  fortuneOverlay.classList.add("show");

  fortuneScreen.style.display = "block";
  blockedMessage.style.display = "none";

  fortune = 100;

  updateFortune();

}


// Update fortune display
function updateFortune() {

  fortuneValue.textContent = `Fortune: ${fortune}%`;

  fortuneBar.style.width = `${fortune}%`;


  // Change bar colour
  if (fortune >= 70) {

    fortuneBar.style.background = "#7bc96f";

  } else if (fortune >= 40) {

    fortuneBar.style.background = "#f0b44d";

  } else {

    fortuneBar.style.background = "#d9534f";

  }


  // Find appropriate message
  const selectedFortune = fortunes.find(
    item => fortune >= item.min
  );

  fortuneMessage.textContent = selectedFortune.message;

}


// Try fortune again
tryAgain.addEventListener("click", function () {

  // Randomly reduce fortune
  const loss = Math.floor(Math.random() * 26) + 10;

  fortune -= loss;

  if (fortune < 0) {
    fortune = 0;
  }

  updateFortune();


  // Block checkout when fortune reaches zero
  if (fortune === 0) {

    setTimeout(() => {

      fortuneScreen.style.display = "none";
      blockedMessage.style.display = "block";

    }, 700);

  }

});


// Give up
giveUp.addEventListener("click", function () {

  fortuneOverlay.classList.remove("show");

});


// Return to bakery
backToShop.addEventListener("click", function () {

  fortuneOverlay.classList.remove("show");

});


// =========================
// CHECKOUT
// =========================

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {

  // Don't allow checkout with empty cart
  if (cart.length === 0) {

    alert("Your cart is empty! Add something delicious first.");

    return;
  }


  // Close cart
  cartPanel.classList.remove("open");


  // Open fortune test
  openFortune();

});


// =========================
// INITIAL STATE
// =========================

updateCart();
