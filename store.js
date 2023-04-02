// Define the list of products
const products = [
  { id: 1, name: "Laptop", price: 599.00 },
  { id: 2, name: "Smartphone", price: 699.00 },
  { id: 3, name: "HeadPhone", price: 299.00 },
  { id: 4, name: "Appleswatch", price: 159.00 }
];

// Get the "Add to cart" buttons
const buttonAdd = document.querySelectorAll(".button-add");

// Get the "Purchase" button
const buttonPurchase = document.querySelector("#button-by");

// Get the receipt element
const receipt = document.querySelector("#receipt");

// Create an empty array to store the products in the cart
let cartProducts = [];

// Add event listeners to the "Add to cart" buttons
buttonAdd.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the ID of the selected product
    const id = event.target.dataset.id;

    // Find the corresponding product in the product list
    const product = products.find((p) => p.id == id);

    // Add the product to the cart
    cartProducts.push(product);

    // Update the shopping cart
    updateCart();
  });
});

// Add an event listener to the "Purchase" button
buttonPurchase.addEventListener("click", () => {
  if (cartProducts.length > 0) {
    generateReceipt();
  } else {
    alert("Your cart is empty!");
  }
});

// Function to update the shopping cart
function updateCart() {
  const cart = document.querySelector("#cart");

  // Clear the shopping cart
  cart.innerHTML = "";

  // Show the count of products in the cart
  const cartCount = document.createElement("p");
  cartCount.innerText = "Products in the cart: " + cartProducts.length;
  cart.appendChild(cartCount);

  // Show the products in the cart
  cartProducts.forEach((product) => {
    const li = document.createElement("li");
    li.innerText = product.name + " - $" + product.price;

    // Add a "Remove" button next to each product in the cart
    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = " Remove";
    buttonDelete.addEventListener("click", () => {
      const index = cartProducts.indexOf(product);
      cartProducts.splice(index, 1);
      updateCart(); // Update shopping cart after deleting a product
    });
    li.appendChild(buttonDelete);

    cart.appendChild(li);
  });
}

// Function to generate the receipt
function generateReceipt() {
  // Calculate the total purchase
  const total = cartProducts.reduce((accumulator, product) => accumulator + product.price, 0);

  // Clear the receipt
  receipt.innerHTML = "";

  // Show the products on the receipt
  cartProducts.forEach((product) => {
    const liProduct = document.createElement("li");
    liProduct.innerText = product.name + " - $" + product.price;
    receipt.appendChild(liProduct);
  });

  // Show the total on the receipt
  const liTotal = document.createElement("li");
  liTotal.innerText = "Total: $" + total;
  receipt.appendChild(liTotal);

  // Clear the cart
  cartProducts = [];

  // Show a success message
  alert("Purchase successful!");

  // Update the shopping cart
  updateCart(); 

  // Set the cartItems and cartCount to 0
  const cartItems = document.querySelector("#cart-items");
  cartItems.innerHTML = "";
  const cartCount = document.querySelector("#cart-count");
  cartCount.innerText = "0";

  // Show the "empty" message if the cart is empty
  const cartEmptyMessage = document.querySelector("#cart-empty-message");
  cartEmptyMessage.style.display = "block";
}




