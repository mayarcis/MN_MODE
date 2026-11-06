let savedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];
let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(savedProducts));
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
}

function updateWishlistCount() {
    let count = document.getElementById("wishlistCount");

    if (count) {
        count.textContent = savedProducts.length;
    }
}

function updateCartCount() {
    let count = document.getElementById("cartCount");

    if (count) {
        let total = 0;

        cartProducts.forEach(product => {
            total += Number(product.quantity) || 1;
        });

        count.textContent = total;
    }
}

function getProductCard(button) {
    return button.closest(
        ".shirt-card, .jacket-card, .casual-card, .accessories-card, .dresses-card"
    );
}

function getProductItem(card) {
    return card.closest(
        ".shirt-item, .jacket-item, .casual-item, .accessories-item, .dresses-item"
    );
}

function getProductData(card) {
    let item = getProductItem(card);

    let favorite = card.querySelector(
        ".shirt-favorite, .jacket-favorite, .casual-favorite, .accessories-favorite, .dresses-favorite"
    );

    let image = card.querySelector(".main-image");
    let name = card.querySelector("h4");
    let price = item.dataset.price;

    let category = Array.from(item.classList).find(className =>
        className.endsWith("-item")
    );

    let sizeElement = card.querySelector(
        ".shirt-size, .jacket-size, .casual-size, .dresses-size"
    );

    let selectedColor = card.querySelector(".selected-color");

    let productId = favorite ? favorite.dataset.id : "";

    return {
        id: category + "-" + productId + "-" + image.getAttribute("src"),
        name: name.textContent.trim(),
        price: Number(price),
        image: image.src,
        size: sizeElement ? sizeElement.value : "",
        color: selectedColor ? selectedColor.dataset.color : ""
    };
}

// Wishlist

function updateHeartButtons() {
    document.querySelectorAll(
        ".shirt-favorite, .jacket-favorite, .casual-favorite, .accessories-favorite, .dresses-favorite"
    ).forEach(button => {
        let card = getProductCard(button);
        let product = getProductData(card);
        let icon = button.querySelector("i");

        let exists = savedProducts.some(item => item.id === product.id);

        if (exists) {
            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");
            button.style.color = "#c0392b";
        } else {
            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");
            button.style.color = "";
        }
    });
}

document.querySelectorAll(
    ".shirt-favorite, .jacket-favorite, .casual-favorite, .accessories-favorite, .dresses-favorite"
).forEach(button => {
    button.addEventListener("click", function () {
        let card = getProductCard(this);
        let product = getProductData(card);

        let index = savedProducts.findIndex(item => item.id === product.id);

        if (index === -1) {
            savedProducts.push(product);
        } else {
            savedProducts.splice(index, 1);
        }

        saveWishlist();
        updateHeartButtons();
        updateWishlistCount();
    });
});

// Color Selection

document.querySelectorAll(
    ".shirt-colors, .jacket-colors, .casual-colors, .dresses-colors, .accessories-colors"
).forEach(colorGroup => {
    colorGroup.querySelectorAll(".color-option").forEach(color => {
        color.addEventListener("click", function () {
            colorGroup.querySelectorAll(".color-option").forEach(option => {
                option.classList.remove("selected-color");
            });

            this.classList.add("selected-color");
        });
    });
});

// Add To Cart

document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
        let card = getProductCard(this);

        if (!card) {
            return;
        }

        let product = getProductData(card);

        let sizeElement = card.querySelector(
            ".shirt-size, .jacket-size, .casual-size, .dresses-size"
        );

        let colorGroup = card.querySelector(
            ".shirt-colors, .jacket-colors, .casual-colors, .dresses-colors, .accessories-colors"
        );

        if (sizeElement && product.size === "") {
            alert("Please choose a size first!");
            return;
        }

        if (colorGroup && product.color === "") {
            alert("Please choose a color!");
            return;
        }

        product.quantity = 1;

        let existingProduct = cartProducts.find(item =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cartProducts.push(product);
        }

        saveCart();
        updateCartCount();

        alert("Product added to cart successfully!");
    });
});

// Update Counts

updateHeartButtons();
updateWishlistCount();
updateCartCount();