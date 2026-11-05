let savedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];

let wishlistGrid = document.getElementById("wishlistGrid");
let emptyWishlist = document.getElementById("emptyWishlist");

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(savedProducts));
}

function displayWishlist() {
    wishlistGrid.innerHTML = "";

    document.getElementById("wishlistCount").textContent = savedProducts.length;

    if (savedProducts.length === 0) {
        emptyWishlist.style.display = "block";
        return;
    }

    emptyWishlist.style.display = "none";

    savedProducts.forEach(product => {
        let col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-4";

        let card = document.createElement("div");
        card.className = "wishlist-card";

        let img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        let info = document.createElement("div");
        info.className = "wishlist-info";

        let name = document.createElement("h4");
        name.textContent = product.name;

        let price = document.createElement("p");
        price.textContent = product.price;

        let edit = document.createElement("button");
        edit.textContent = "Update";
        edit.className = "update-btn";

        edit.addEventListener("click", function () {
            updateProduct(product.id);
        });

        let remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.className = "delete-btn";

        remove.addEventListener("click", function () {
            deleteProduct(product.id);
        });

        info.append(name, price, edit, remove);
        card.append(img, info);
        col.appendChild(card);
        wishlistGrid.appendChild(col);
    });
}

function deleteProduct(id) {
    savedProducts = savedProducts.filter(product => product.id !== id);

    saveWishlist();
    displayWishlist();
}

function updateProduct(id) {
    let product = savedProducts.find(item => item.id === id);

    let newName = prompt("Enter new product name:", product.name);

    if (newName === null || newName.trim() === "") {
        return;
    }

    let newPrice = prompt("Enter new product price:", product.price);

    if (newPrice === null || newPrice.trim() === "") {
        return;
    }

    product.name = newName.trim();
    product.price = newPrice.trim();

    saveWishlist();
    displayWishlist();
}

displayWishlist();