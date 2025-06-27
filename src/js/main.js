import Swal from "sweetalert2";

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

//Alerts
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

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
    Toast.fire({
      icon: "warning",
      title: "This product already exist.",
    });
    return;
  }

  if (name && !isNaN(price)) {
    products.push({ id: id, name: name, price: price });
    renderProducts();
    productNameInput.value = "";
    productPriceInput.value = "";
    Toast.fire({
      icon: "success",
      title: "Product were added",
    });
  } else {
    Toast.fire({
      icon: "warning",
      title: "Please fill in all fields with valid data.",
    });
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
  const productName = productNameInput.value.trim();
  const productPrice = parseFloat(productPriceInput.value);

  products[productId - 1] = {
    id: productId,
    name: productName,
    price: productPrice,
  };

  //Switch buttons
  editProductButton.style.display = "none";
  addProductButton.style.display = "block";

  //
  productNameInput.value = "";
  productPriceInput.value = "";
  renderProducts();
  Toast.fire({
    icon: "success",
    title: "Product were modified successfully!",
  });
});

// Function to delete a product
function deleteProduct(index) {
  products.splice(index, 1);
  renderProducts();
  Toast.fire({
    icon: "success",
    title: "Product were deleted successfully!",
  });
}

//Expose functions to use them in HTML
window.addProduct = addProduct;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
