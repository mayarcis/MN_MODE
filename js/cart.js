
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    let cartCount = document.getElementById("cartCount");

    if (cartCount) {
        let count = 0;

        cart.forEach(function(product) {
            count += product.quantity || 1;
        });

        cartCount.textContent = count;
    }
}

function displayCart() {
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("totalPrice");

    if (!cartItems || !totalPrice) {
        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart3 fs-1"></i>
                <h5 class="mt-3">Your cart is empty!</h5>
                <a href="men.html" class="btn btn-dark mt-3">Continue Shopping</a>
            </div>
        `;

        totalPrice.textContent = "0.00";

        saveCart();
        updateCartCount();

        return;
    }

    cart.forEach(function(product, index) {

        let quantity = product.quantity || 1;
        let price = Number(product.price);

        total += price * quantity;

        cartItems.innerHTML += `
            <div class="card mb-3 p-3">
                <div class="row align-items-center">

                    <div class="col-md-2">
                        <img src="${product.image}" class="img-fluid" alt="${product.name}">
                    </div>

                    <div class="col-md-7">
                        <h5>${product.name}</h5>
                        <p class="mb-1">Price: JD ${price.toFixed(2)}</p>
                        <p class="mb-1">Size: ${product.size || "Not selected"}</p>
                        <p class="mb-1">Color: ${product.color || "Not selected"}</p>

                        <div class="d-flex align-items-center gap-2 mt-2">
                            <button class="btn btn-outline-dark decrease-btn" data-index="${index}">-</button>

                            <span>${quantity}</span>

                            <button class="btn btn-outline-dark increase-btn" data-index="${index}">+</button>
                        </div>
                    </div>

                    <div class="col-md-3 text-end">
                        <p class="fw-bold">JD ${(price * quantity).toFixed(2)}</p>

                        <button class="btn btn-danger delete-btn" data-index="${index}">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>

                </div>
            </div>
        `;
    });

    totalPrice.textContent = total.toFixed(2);

    saveCart();
    updateCartCount();

    document.querySelectorAll(".increase-btn").forEach(function(button) {
        button.addEventListener("click", function() {
            let index = Number(this.dataset.index);

            cart[index].quantity++;

            saveCart();
            displayCart();
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(function(button) {
        button.addEventListener("click", function() {
            let index = Number(this.dataset.index);

            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }

            saveCart();
            displayCart();
        });
    });

    document.querySelectorAll(".delete-btn").forEach(function(button) {
        button.addEventListener("click", function() {
            let index = Number(this.dataset.index);

            cart.splice(index, 1);

            saveCart();
            displayCart();
        });
    });
}

let checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function() {

        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for shopping!");

            cart = [];

            saveCart();
            displayCart();
        }

    });
}

displayCart();
