let cart = JSON.parse(localStorage.getItem("roselleCart")) || [];

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);

    cartCount.textContent = totalItems;

}

function filterProducts(category, button) {

    const products = document.querySelectorAll(".product-card");

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    products.forEach(product => {

        const productCategory = product.dataset.category;

        if (category === "all" || productCategory === category) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}

document.addEventListener("click", function(event) {

    const button = event.target.closest(".cart-btn");

    if (!button) return;

    event.preventDefault();

    const card = button.closest(".product-card");

    if (!card) return;

    const name = card.querySelector("h3").textContent.trim();

    const price = Number(
        card.querySelector(".price-row h4")
            .textContent.replace(/[^0-9.]/g, "")
    );

    const image = card.querySelector(".product-image img").src;

    const product = {

        id: name.toLowerCase().replace(/\s+/g, "-"),

        name: name,

        price: price,

        image: image,

        quantity: 1

    };

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push(product);

    }

    localStorage.setItem("roselleCart", JSON.stringify(cart));

    updateCartCount();

    const originalText = button.textContent;

    button.textContent = "Added ✓";

    button.classList.add("added");

    setTimeout(() => {

        button.textContent = originalText;

        button.classList.remove("added");

    }, 1200);


    console.log("Updated Roselle Cart:", cart);

});

updateCartCount();

window.addEventListener("pageshow", updateCartCount);