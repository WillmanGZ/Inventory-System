//Inventory
let products = [];

//DOM elements
const productList = document.getElementById("product-list");
const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product-button");
const editProductButton = document.getElementById("edit-product-button");

//Id of current product we're editing
let productId = null;

// Function to render the product list
function renderProducts() {
  productList.innerHTML = `
    <h2>Product List</h2>
    `;
  products.forEach((product, index) => {
    const productItem = document.createElement("article");
    productItem.className = "product-item";
    productItem.innerHTML = `
            <div class="product-info">
                <span class="product-name">${product.name}</span>
                <span class="product-price">Unit Price: $${product.price.toFixed(
                  2
                )}</span>
            </div>
            <div class="product-actions">
                <button onclick="editProduct(${index})" class="edit-button">Edit</button>
                <button onclick="deleteProduct(${index})" class="delete-button">Delete</button>
            </div>
        `;
    productList.appendChild(productItem);
  });
}

// Function to add a new product
function addProduct(event) {
  event.preventDefault();
  const id = products.length + 1;
  const name = productNameInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  let productExists = false;
  products.forEach((product) => {
    if (name.toLowerCase() == product.name.toLowerCase()) {
      productExists = true;
    }
  });

  if (productExists) {
    alert("This product already exist.");
    return;
  }

  if (name && !isNaN(price)) {
    products.push({ id: id, name: name, price: price });
    renderProducts();
    productNameInput.value = "";
    productPriceInput.value = "";
  } else {
    alert("Please fill in all fields with valid data.");
  }
}

// Function to edit a product
function editProduct(index) {
  const product = products[index];
  productId = product.id;
  productNameInput.value = product.name;
  productPriceInput.value = product.price;

  //Switch buttons
  editProductButton.style.display = "block";
  addProductButton.style.display = "none";
}

editProductButton.addEventListener("click", (event) => {
  event.preventDefault();
  productName = productNameInput.value;
  productPrice = productPriceInput.value;

  products[productId - 1] = {
    id: productId,
    name: productName.trim(),
    price: parseFloat(productPrice),
  };

  //Switch buttons
  editProductButton.style.display = "none";
  addProductButton.style.display = "block";

  //
  productNameInput.value = "";
  productPriceInput.value = "";
  renderProducts();
});

// Function to delete a product
function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
}
