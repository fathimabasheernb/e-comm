let cart = JSON.parse(localStorage.getItem("roselleCart")) || [];

const cartItems = document.getElementById("cart-items");
const itemCount = document.getElementById("item-count");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("total");
const checkoutButton = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const orderForm = document.getElementById("order-form");

if (!cartItems || !itemCount || !subtotalElement ||
    !deliveryElement || !totalElement || !checkoutButton) {
    console.error("Cart HTML elements are missing. Check your IDs.");
}

function formatPrice(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
}

function saveCart() {
    localStorage.setItem("roselleCart", JSON.stringify(cart));
    displayCart();
}

function displayCart() {

    cart = JSON.parse(localStorage.getItem("roselleCart")) || [];

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalQuantity = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="flower">❀</div>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any flowers yet.</p>
                <a href="products.html" class="shop-btn">
                    Explore Products
                </a>
            </div>
        `;

    } else {

        cart.forEach((item, index) => {

            const quantity = Number(item.quantity) || 1;
            const price = Number(item.price) || 0;
            const itemTotal = price * quantity;

            subtotal += itemTotal;
            totalQuantity += quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <img src="${item.image}" alt="${item.name}">

                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Beautifully arranged with love ♡</p>

                        <span class="item-price">
                            ${formatPrice(price)}
                        </span>

                        <div class="item-actions">

                            <div class="quantity-box">
                                <button onclick="changeQuantity(${index}, -1)">−</button>
                                <span>${quantity}</span>
                                <button onclick="changeQuantity(${index}, 1)">+</button>
                            </div>

                            <button class="remove-btn"
                                onclick="removeItem(${index})">
                                Remove
                            </button>

                        </div>
                    </div>

                    <div class="item-total">
                        ${formatPrice(itemTotal)}
                    </div>

                </div>
            `;
        });
    }

    let delivery = subtotal === 0 ? 0 : (subtotal >= 1000 ? 0 : 50);
    let total = subtotal + delivery;

    itemCount.textContent = totalQuantity +
        (totalQuantity === 1 ? " Item" : " Items");

    subtotalElement.textContent = formatPrice(subtotal);
    deliveryElement.textContent = formatPrice(delivery);
    totalElement.textContent = formatPrice(total);

    checkoutButton.disabled = cart.length === 0;
}

function changeQuantity(index, amount) {

    cart = JSON.parse(localStorage.getItem("roselleCart")) || [];

    if (!cart[index]) return;

    cart[index].quantity = Number(cart[index].quantity) + amount;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    saveCart();
}

function removeItem(index) {

    cart = JSON.parse(localStorage.getItem("roselleCart")) || [];

    cart.splice(index, 1);

    saveCart();
}

if (checkoutButton && checkoutForm) {

    checkoutButton.addEventListener("click", function() {

        if (cart.length === 0) return;

        checkoutForm.style.display = "block";

        checkoutForm.scrollIntoView({
            behavior: "smooth"
        });

    });
}

if (orderForm) {

    orderForm.addEventListener("submit", function(event) {

        event.preventDefault();

        cart = JSON.parse(localStorage.getItem("roselleCart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const customerName = document.getElementById("customer-name").value.trim();
        const customerPhone = document.getElementById("customer-phone").value.trim();
        const customerAddress = document.getElementById("customer-address").value.trim();
        const customerNote = document.getElementById("customer-note").value.trim();

        let subtotal = 0;
        let orderDetails = "";

        cart.forEach(item => {

            const itemTotal = Number(item.price) * Number(item.quantity);

            subtotal += itemTotal;

            orderDetails +=
                `${item.name} x ${item.quantity} = ${formatPrice(itemTotal)}\n`;
        });

        const delivery = subtotal >= 1000 ? 0 : 50;
        const total = subtotal + delivery;

        const message = `
ROSELLE - NEW ORDER

Customer: ${customerName}
Phone: ${customerPhone}
Address: ${customerAddress}

Products:
${orderDetails}

Subtotal: ${formatPrice(subtotal)}
Delivery: ${formatPrice(delivery)}
Total: ${formatPrice(total)}

Special Instructions: ${customerNote || "None"}
        `;

        console.log(message);

        alert("Order details generated! Check the browser console.");

    });
}

displayCart();

window.addEventListener("pageshow", displayCart);