alert("JavaScript is working!");
/* ========================================
SHOPPING CART
======================================== */

let cart = [];

let fortune = 100;

let attempts = 0;

let fortuneTimer;

/* ========================================
FORTUNE MESSAGES
======================================== */

const badFortunes = [

"Bad news. Your luck has expired approximately 4 seconds ago.",

"The cookie has examined your future and immediately looked away.",

"You were going to be lucky. Then you clicked this button.",

"Your fortune is currently unavailable. Please try again never.",

"A mysterious force has misplaced your good luck.",

"The universe says: absolutely not.",

"Your future contains disappointment and possibly another cookie.",

"Congratulations! You have successfully become less lucky.",

"Your lucky number is 404. Fortune not found.",

"The stars have reviewed your request. They declined.",

"Your chances of buying this cake are decreasing rapidly.",

"Please remain calm. Your fortune is getting worse."

];

/* ========================================
ADD ITEM TO CART
======================================== */

function addToCart(name, price) {

cart.push({
name: name,
price: price
});

updateCart();

}

/* ========================================
REMOVE ITEM FROM CART
======================================== */

function removeFromCart(index) {

cart.splice(index, 1);

updateCart();

}

/* ========================================
UPDATE CART
======================================== */

function updateCart() {

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const cartTotal =
document.getElementById("cartTotal");

/* Update number of items */

cartCount.textContent = cart.length;

/* If cart is empty */

if (cart.length === 0) {

cartItems.innerHTML =
  "<p>Your cart is empty.</p>";

cartTotal.textContent = "0";

return;


}

/* Calculate total */

let total = 0;

/* Clear existing cart */

cartItems.innerHTML = "";

/* Add every item */

cart.forEach((item, index) => {

total += item.price;


const div =
  document.createElement("div");


div.className = "cart-item";


div.innerHTML = `

  <div>

    <strong>
      ${item.name}
    </strong>

    <br>

    ₹${item.price}

  </div>


  <div
    class="remove"
    onclick="removeFromCart(${index})"
  >

    Remove

  </div>

`;


cartItems.appendChild(div);


});

/* Update total */

cartTotal.textContent = total;

}

/* ========================================
OPEN CART
======================================== */

document
.getElementById("cartButton")
.addEventListener("click", () => {

document
  .getElementById("cartPanel")
  .classList.add("open");


});

/* ========================================
CLOSE CART
======================================== */

document
.getElementById("closeCart")
.addEventListener("click", () => {

document
  .getElementById("cartPanel")
  .classList.remove("open");


});

/* ========================================
CHECKOUT
======================================== */

document
.getElementById("checkoutBtn")
.addEventListener("click", () => {

/* Check if cart is empty */

if (cart.length === 0) {

  alert("Your cart is empty.");

  return;

}


/* Close cart */

document
  .getElementById("cartPanel")
  .classList.remove("open");


/* Open fortune test */

openFortune();


});

/* ========================================
OPEN FORTUNE WINDOW
======================================== */

function openFortune() {

const overlay =
document.getElementById("fortuneOverlay");

const fortuneScreen =
document.getElementById("fortuneScreen");

const blockedMessage =
document.getElementById("blockedMessage");

/* Show overlay */

overlay.classList.add("show");

/* Show normal fortune screen */

fortuneScreen.style.display = "block";

/* Hide blocked message */

blockedMessage.style.display = "none";

/* Start fortune countdown */

startFortuneDecay();

}

/* ========================================
FORTUNE DECAY
======================================== */

function startFortuneDecay() {

/* Stop any previous timer */

clearInterval(fortuneTimer);

/* Start new timer */

fortuneTimer = setInterval(() => {

fortune -= 1;


/* Prevent negative fortune */

if (fortune <= 0) {

  fortune = 0;

  clearInterval(fortuneTimer);

}


/* Update screen */

updateFortune();


}, 1000);

}

/* ========================================
UPDATE FORTUNE DISPLAY
======================================== */

function updateFortune() {

const bar =
document.getElementById("fortuneBar");

const value =
document.getElementById("fortuneValue");

/* Update percentage text */

value.textContent =
Fortune: ${fortune}%;

/* Update progress bar */

bar.style.width =
fortune + "%";

/* Change bar color */

if (fortune > 60) {

bar.style.background =
  "#4caf50";


}

else if (fortune > 30) {

bar.style.background =
  "#ff9800";


}

else {

bar.style.background =
  "#d32f2f";


}

}

/* ========================================
TRY AGAIN BUTTON
======================================== */

document
.getElementById("tryAgain")
.addEventListener("click", () => {

/* Increase attempt count */

attempts++;


/* Every attempt reduces fortune */

fortune -= 10;


/* Prevent negative fortune */

if (fortune < 0) {

  fortune = 0;

}


/* Select random bad fortune */

const randomIndex =
  Math.floor(
    Math.random() *
    badFortunes.length
  );


/* Display random message */

document
  .getElementById("fortuneMessage")
  .textContent =
  badFortunes[randomIndex];


/* Update fortune */

updateFortune();


/*
  After 5 attempts,
  checkout becomes blocked.
*/

if (attempts >= 5) {

  showBlocked();

}


});

/* ========================================
BLOCK CHECKOUT
======================================== */

function showBlocked() {

/* Stop fortune timer */

clearInterval(fortuneTimer);

/* Hide fortune screen */

document
.getElementById("fortuneScreen")
.style.display = "none";

/* Show blocked message */

document
.getElementById("blockedMessage")
.style.display = "block";

}

/* ========================================
LEAVE FORTUNE
======================================== */

document
.getElementById("giveUp")
.addEventListener("click", () => {

/* Stop timer */

clearInterval(fortuneTimer);


/* Close fortune window */

document
  .getElementById("fortuneOverlay")
  .classList.remove("show");


});

/* ========================================
RETURN TO BAKERY
======================================== */

document
.getElementById("backToShop")
.addEventListener("click", () => {

/* Close fortune window */

document
  .getElementById("fortuneOverlay")
  .classList.remove("show");


});
