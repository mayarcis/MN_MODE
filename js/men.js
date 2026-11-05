let savedProducts = JSON.parse(localStorage.getItem("wishlist")) || [];

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(savedProducts));
}

function updateWishlistCount() {
    let count = document.getElementById("wishlistCount");

    if (count) {
        count.textContent = savedProducts.length;
    }
}

function updateHeartButtons() {
    document.querySelectorAll(".shirt-favorite").forEach(button => {
        let id = button.dataset.id;
        let icon = button.querySelector("i");

        if (savedProducts.some(product => product.id === id)) {
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

document.querySelectorAll(".shirt-favorite").forEach(button => {
    button.addEventListener("click", function () {
        let id = this.dataset.id;
        let card = this.closest(".shirt-card");

        let product = {
            id: id,
            name: card.querySelector("h4").textContent,
            price: card.querySelector(".shirt-price").textContent,
            image: card.querySelector(".main-image").src
        };

        let index = savedProducts.findIndex(item => item.id === id);

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

updateHeartButtons();
updateWishlistCount();