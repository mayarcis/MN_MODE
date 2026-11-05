
document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;
    const themeBtn = document.getElementById("themeBtn");
    const langBtn = document.getElementById("langBtn");
    const cartCount = document.getElementById("cartCount");

    let language = localStorage.getItem("language") || "en";
    let theme = localStorage.getItem("theme") || "light";

    // Language
    function applyLanguage() {

        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

        document.querySelectorAll("[data-en][data-ar]").forEach(function (element) {
            element.innerHTML = element.getAttribute("data-" + language);
        });

        langBtn.textContent = language === "en" ? "AR" : "EN";

        document.getElementById("searchInput").placeholder =
            language === "en" ? "Search for products..." : "ابحث عن المنتجات...";

        document.getElementById("newsletterEmail").placeholder =
            language === "en" ? "Enter your email address" : "أدخل بريدك الإلكتروني";
    }

    langBtn.addEventListener("click", function () {

        language = language === "en" ? "ar" : "en";

        localStorage.setItem("language", language);

        applyLanguage();
    });

    // Theme
    function applyTheme() {

        body.classList.toggle("dark-mode", theme === "dark");

        themeBtn.innerHTML = theme === "dark"
            ? '<i class="bi bi-sun"></i>'
            : '<i class="bi bi-moon-stars"></i>';
    }

    themeBtn.addEventListener("click", function () {

        theme = theme === "light" ? "dark" : "light";

        localStorage.setItem("theme", theme);

        applyTheme();
    });

    applyLanguage();
    applyTheme();

    // Slider
    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;

    function showSlide(index) {

        slides[currentSlide].classList.remove("active");

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");

        document.getElementById("slideNumber").textContent =
            "0" + (currentSlide + 1) + " / 0" + slides.length;
    }

    if (slides.length > 0) {

        document.getElementById("nextSlide").addEventListener("click", function () {
            showSlide(currentSlide + 1);
        });

        document.getElementById("prevSlide").addEventListener("click", function () {
            showSlide(currentSlide - 1);
        });

        setInterval(function () {
            showSlide(currentSlide + 1);
        }, 5500);
    }

    // Animation
    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    });

    document.querySelectorAll(".reveal").forEach(function (element) {
        observer.observe(element);
    });

    // Cart
    function updateCartCount() {

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        let count = 0;

        cart.forEach(function (item) {
            count += Number(item.quantity) || 1;
        });

        cartCount.textContent = count;
    }

    document.querySelectorAll(".add-cart").forEach(function (button) {

        button.addEventListener("click", function () {

            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            const id = this.dataset.id;

            const product = cart.find(function (item) {
                return item.id === id;
            });

            if (product) {

                product.quantity++;

            } else {

                cart.push({
                    id: id,
                    name: this.dataset.name,
                    price: Number(this.dataset.price),
                    image: this.dataset.image,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            this.innerHTML = '<i class="bi bi-check2"></i> ADDED';

            const button = this;

            setTimeout(function () {
                button.innerHTML = "ADD TO CART";
                applyLanguage();
            }, 1200);
        });
    });

    updateCartCount();

    // Search
    const searchBtn = document.getElementById("searchBtn");
    const searchPanel = document.getElementById("searchPanel");
    const closeSearch = document.getElementById("closeSearch");
    const searchInput = document.getElementById("searchInput");

    searchBtn.addEventListener("click", function () {
        searchPanel.classList.toggle("active");
        searchInput.focus();
    });

    closeSearch.addEventListener("click", function () {

        searchPanel.classList.remove("active");

        searchInput.value = "";

        document.querySelectorAll(".product-item").forEach(function (item) {
            item.style.display = "";
        });
    });

    searchInput.addEventListener("input", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".product-item").forEach(function (item) {

            const name = item.querySelector(".product-info h5").textContent.toLowerCase();

            item.style.display = name.includes(value) ? "" : "none";
        });
    });

    // Newsletter
    document.getElementById("newsletterForm").addEventListener("submit", function (event) {

        event.preventDefault();

        document.getElementById("newsletterMessage").textContent =
            language === "en"
                ? "Thank you for subscribing!"
                : "شكراً لاشتراكك معنا!";

        this.reset();
    });

    // Back To Top
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});
