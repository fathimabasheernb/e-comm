function openProduct(page) {

    window.location.href = page;

}

function filterProducts(category, button) {

            let products = document.querySelectorAll(".product-card");

            let buttons = document.querySelectorAll(".filter-btn");

            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            products.forEach(product => {

                if (category === "all" || product.dataset.category === category) {

                    product.style.display = "block";

                }

                else {

                    product.style.display = "none";

                }

            });

        }
