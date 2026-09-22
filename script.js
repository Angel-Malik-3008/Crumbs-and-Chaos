
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

  // Open cart automatically
  document.getElementById("cartPanel").classList.add("open");
}


// Update cart
function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

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


  // Display cart
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

          <span>${item.quantity}</span>

          <button onclick="changeQuantity(${index}, 1)">
            +
          </button>

        </div>

      </div>
    `;

  }).join("");
}


// Change quantity
function changeQuantity(index, change) {

  cart[index].quantity += change;

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

let fortuneAttempts = 0;

const fortuneOverlay = document.getElementById("fortuneOverlay");

const fortuneScreen = document.getElementById("fortuneScreen");
const blockedMessage = document.getElementById("blockedMessage");

const fortuneValue = document.getElementById("fortuneValue");
const fortuneBar = document.getElementById("fortuneBar");
const fortuneMessage = document.getElementById("fortuneMessage");

const tryAgain = document.getElementById("tryAgain");
const giveUp = document.getElementById("giveUp");
const backToShop = document.getElementById("backToShop");


// =========================
// FORTUNE MESSAGES
// =========================

const fortuneMessages = [

  {
    min: 90,
    messages: [
      "The universe is cautiously optimistic.",
      "Your future looks suspiciously delicious.",
      "The bakery gods have noticed you.",
      "Something good might happen. Maybe."
    ]
  },

  {
    min: 75,
    messages: [
      "A croissant believes in you.",
      "Your luck is holding together like a fresh pastry.",
      "The universe has given you a polite nod.",
      "Things are going surprisingly okay."
    ]
  },

  {
    min: 60,
    messages: [
      "Your future smells faintly of butter.",
      "The bakery approves of your decisions.",
      "You may survive another fortune attempt.",
      "Luck is still on speaking terms with you."
    ]
  },

  {
    min: 45,
    messages: [
      "The universe is becoming suspicious.",
      "Your fortune is getting slightly burnt.",
      "A cookie somewhere is judging you.",
      "Things are becoming unnecessarily dramatic."
    ]
  },

  {
    min: 30,
    messages: [
      "Your luck has entered its flop era.",
      "The baguette has stopped believing in you.",
      "The universe is slowly closing the bakery door.",
      "You probably shouldn't have pressed that button."
    ]
  },

  {
    min: 15,
    messages: [
      "This is getting concerning.",
      "Your fortune is hanging on by a crumb.",
      "The bakery gods are whispering.",
      "One more bad decision might do it."
    ]
  },

  {
    min: 1,
    messages: [
      "Your luck is basically a breadcrumb.",
      "The universe is preparing the rejection letter.",
      "Your fortune has seen better days.",
      "You are dangerously close to being bakery-banned."
    ]
  }

];


// Pick random message
function getFortuneMessage() {

  const category = fortuneMessages.find(
    category => fortune >= category.min
  );

  if (!category) {
    return "The universe has completely given up.";
  }

  const randomIndex = Math.floor(
    Math.random() * category.messages.length
  );

  return category.messages[randomIndex];
}


// =========================
// OPEN FORTUNE
// =========================

function openFortune() {

  fortuneOverlay.classList.add("show");

  fortuneScreen.style.display = "block";
  blockedMessage.style.display = "none";

  fortune = 100;
  fortuneAttempts = 0;

  // FIRST BUTTON TEXT
  tryAgain.textContent = "🔮 Try Your Fortune";

  updateFortune();
}


// =========================
// UPDATE FORTUNE
// =========================

function updateFortune() {

  fortuneValue.textContent = `Fortune: ${fortune}%`;

  fortuneBar.style.width = `${fortune}%`;

  fortuneMessage.textContent = getFortuneMessage();


  // Fortune bar colours

  if (fortune >= 70) {

    fortuneBar.style.background = "#7bc96f";

  } else if (fortune >= 40) {

    fortuneBar.style.background = "#f0b44d";

  } else {

    fortuneBar.style.background = "#d9534f";

  }
}


// =========================
// TRY FORTUNE
// =========================


tryAgain.addEventListener("click", function () {

  fortuneAttempts++;

  // =========================
  // COOKIE ANIMATION
  // =========================

  const cookie = document.querySelector(".cookie");

  cookie.classList.remove("magic");

  // Restart animation every click
  void cookie.offsetWidth;

  cookie.classList.add("magic");


  // =========================
  // RANDOM FORTUNE EVENT
  // =========================

  const randomEvent = Math.random();


  // 🍀 LUCKY EVENT
  // 12% chance
  if (randomEvent < 0.12) {

    fortune += 7;

    if (fortune > 100) {
      fortune = 100;
    }

    fortuneMessage.textContent =
      "🍀 LUCKY! A mysterious force has blessed your pastry. +7%";

  }


  // 💀 UNLUCKY EVENT
  // Next 8% chance
  else if (randomEvent < 0.20) {

    fortune -= 12;

    if (fortune < 0) {
      fortune = 0;
    }

    fortuneMessage.textContent =
      "💀 UNLUCKY! You looked at the baguette incorrectly. -12%";

  }


  // 🥐 NORMAL RESULT
  // Remaining 80%
  else {

    // Slow decrease: 5–8%
    const loss =
      Math.floor(Math.random() * 4) + 5;

    fortune -= loss;

    if (fortune < 0) {
      fortune = 0;
    }

  }


  // =========================
  // CHANGE BUTTON TEXT
  // =========================

  if (fortuneAttempts === 1) {

    tryAgain.textContent = "🔮 Try Again";

  }


  // =========================
  // UPDATE DISPLAY
  // =========================

  updateFortune();


  // =========================
  // KEEP SPECIAL MESSAGE
  // =========================

  /*
    updateFortune() normally replaces
    fortuneMessage with a normal message.

    So if a special event happened,
    put the special message back after
    updating the percentage.
  */

  if (randomEvent < 0.12) {

    fortuneMessage.textContent =
      "🍀 LUCKY! A mysterious force has blessed your pastry. +7%";

  }

  else if (randomEvent < 0.20) {

    fortuneMessage.textContent =
      "💀 UNLUCKY! You looked at the baguette incorrectly. -12%";

  }


  // =========================
  // LOW FORTUNE WARNING
  // =========================

  if (fortune <= 20 && fortune > 0) {

    fortuneMessage.textContent =
      "⚠️ Your fortune is hanging on by a single crumb.";

  }


  // =========================
  // FORTUNE REACHES ZERO
  // =========================

  if (fortune <= 0) {

    tryAgain.disabled = true;

    setTimeout(function () {

      fortuneScreen.style.display = "none";

      blockedMessage.style.display = "block";

    }, 900);

  }

});


  // =========================
  // BLOCK AT ZERO
  // =========================

  if (fortune <= 0) {

    tryAgain.disabled = true;

    setTimeout(function () {

      fortuneScreen.style.display = "none";
      blockedMessage.style.display = "block";

    }, 900);

  }

});



// =========================
// GIVE UP
// =========================

giveUp.addEventListener("click", function () {

  fortuneOverlay.classList.remove("show");

});



// =========================
// RETURN TO SHOP
// =========================

backToShop.addEventListener("click", function () {

  fortuneOverlay.classList.remove("show");

});


// =========================
// CHECKOUT
// =========================

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {

  // Prevent empty checkout
  if (cart.length === 0) {

    alert(
      "Your cart is empty! Add something delicious first."
    );

    return;
  }


  // Close cart
  cartPanel.classList.remove("open");


  // Start fortune
  openFortune();

});


// =========================
// INITIALIZE
// =========================

updateCart();
