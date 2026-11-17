const products = {

    1: {
        name: "Blush Romance",
        category: "ROSE COLLECTION",
        price: 140,
        image: "pro.jpg",
        description: "An elegant pink and red rose bouquet wrapped with love. A beautiful choice for expressing affection and making special moments unforgettable."
    },

    2: {
        name: "Pure Elegance",
        category: "ROSE COLLECTION",
        price: 170,
        image: "pro2.jpg",
        description: "Beautiful fresh red roses arranged elegantly for your special moments. A timeless bouquet filled with beauty and charm."
    },

    3: {
        name: "Garden Dreams",
        category: "MIXED COLLECTION",
        price: 120,
        image: "bo4.jpg",
        description: "A colourful collection of fresh seasonal flowers. Perfect for birthdays, celebrations and spreading happiness."
    },

    4: {
        name: "Forever Bloom",
        category: "TULIP COLLECTION",
        price: 219,
        image: "tu.jpg",
        description: "Premium tulips arranged beautifully for your loved ones. A lovely combination of elegance and natural beauty."
    },

    5: {
        name: "Sweet Blush",
        category: "ROSE COLLECTION",
        price: 159,
        image: "bo2.jpg",
        description: "Soft pink roses with elegant floral wrapping. A delicate bouquet perfect for expressing love and appreciation."
    },

    6: {
        name: "Spring Love",
        category: "TULIP COLLECTION",
        price: 189,
        image: "tu1.jpeg",
        description: "Fresh and beautiful tulips designed to brighten someone's day and make every occasion special."
    },

    7: {
        name: "Dreamy Garden",
        category: "MIXED COLLECTION",
        price: 169,
        image: "sea.jpg",
        description: "A dreamy mix of beautiful seasonal blooms arranged to create a charming and memorable floral experience."
    },

    8: {
        name: "Rose Paradise",
        category: "ROSE COLLECTION",
        price: 249,
        image: "red.jpg",
        description: "A luxurious arrangement of classic red roses, carefully designed for romantic and unforgettable occasions."
    }

};

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const product = products[productId];

let quantity = 1;

if (product) {

    document.getElementById("product-image").src = product.image;

    document.getElementById("product-name").textContent = product.name;

    document.getElementById("product-category").textContent = product.category;

    document.getElementById("product-price").textContent = "₹" + product.price;

    document.getElementById("product-description").textContent = product.description;

    updateTotal();

} else {

    document.querySelector(".details-container").innerHTML =
        "<h2>Sorry! Product not found.</h2>";

}

function changeQuantity(value) {

    quantity += value;

    if (quantity < 1) {
        quantity = 1;
    }

    document.getElementById("quantity").textContent = quantity;

    updateTotal();

}

function updateTotal() {

    if (!product) return;

    let total = product.price * quantity;

    document.getElementById("total-price").textContent = total;

}

function orderProduct() {

    if (!product) return;

    const name = document.getElementById("customer-name").value.trim();

    const phone = document.getElementById("customer-phone").value.trim();

    const address = document.getElementById("customer-address").value.trim();

    if (name === "" || phone === "" || address === "") {

        alert("Please fill in all your details before ordering!");

        return;

    }

    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;

    }

    const total = product.price * quantity;

    const message =

        "Hello Roselle! I would like to place an order.\n\n" +

        "Product: " + product.name + "\n" +

        "Price: ₹" + product.price + "\n" +

        "Quantity: " + quantity + "\n" +

        "Total: ₹" + total + "\n\n" +

        "Customer Name: " + name + "\n" +

        "Phone: " + phone + "\n" +

        "Delivery Address: " + address;

    const whatsappNumber = "919876543210";

    const whatsappURL =

        "https://wa.me/" + whatsappNumber +

        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}