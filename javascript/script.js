
// Empowering The Nation - script.js
// Handles cart, discounts, and totals

// List of all courses with their fees
const courses = {
  "first-aid": { name: "First Aid", fee: 1500 },
  "sewing": { name: "Sewing", fee: 1500 },
  "landscaping": { name: "Landscaping", fee: 1500 },
  "life-skills": { name: "Life Skills", fee: 1500 },
  "child-minding": { name: "Child Minding", fee: 750 },
  "cooking": { name: "Cooking", fee: 750 },
  "garden-maintenance": { name: "Garden Maintenance", fee: 750 },
};

// Store the cart items
let cart = [];

// Function to add a course to the cart

function addToCart(courseKey) {
  const selectedCourse = courses[courseKey];
  if (!selectedCourse) return;

  // Check if it's already in the cart
  if (!cart.includes(courseKey)) {
    cart.push(courseKey);
    alert(`${selectedCourse.name} added to your cart!`);
  } else {
    alert(`${selectedCourse.name} is already in your cart.`);
  }

  updateCart();
}

// Function to remove a course

function removeFromCart(courseKey) {
  cart = cart.filter((key) => key !== courseKey);
  updateCart();
}

// Function to update the cart UI

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");

  cartItems.innerHTML = "";
  cartSummary.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty. Add a course to begin.</p>";
    return;
  }

  let subtotal = 0;

  // Render each item in cart
  cart.forEach((key) => {
    const item = courses[key];
    subtotal += item.fee;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.style.borderBottom = "1px solid #ddd";
    itemDiv.style.padding = "8px 0";

    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong> - R${item.fee.toFixed(2)}</p>
      <button style="
        background:#b39b00;
        color:#fff;
        border:none;
        padding:4px 10px;
        border-radius:4px;
        cursor:pointer;
      " onclick="removeFromCart('${key}')">Remove</button>
    `;

    cartItems.appendChild(itemDiv);
  });

  // Calculate discount
  let discountRate = 0;
  if (cart.length === 2) discountRate = 0.05;
  else if (cart.length === 3) discountRate = 0.10;
  else if (cart.length >= 4) discountRate = 0.15;

  const discount = subtotal * discountRate;
  const discountedTotal = subtotal - discount;

  // VAT at 15%
  const vat = discountedTotal * 0.15;
  const finalTotal = discountedTotal + vat;

  // Summary section
  cartSummary.innerHTML = `
    <h3>Summary</h3>
    <p><strong>Courses Selected:</strong> ${cart.length}</p>
    <p>Subtotal: R${subtotal.toFixed(2)}</p>
    <p>Discount (${(discountRate * 100).toFixed(0)}%): -R${discount.toFixed(2)}</p>
    <p>VAT (15%): R${vat.toFixed(2)}</p>
    <h4 style="margin-top:10px;color:#004b2e;">Final Total: R${finalTotal.toFixed(2)}</h4>
  `;
}
