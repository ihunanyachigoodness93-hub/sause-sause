// ==========================================
// SAUCY SPOON WEBSITE SETTINGS
// ==========================================

// Replace with your WhatsApp number.
// Nigerian format: 234 followed by your number without the first zero.
const whatsappNumber = "2348135982739";


// ==========================================
// FOOD PRODUCTS
// ==========================================

const foods = [
    {
        id: 1,
        name: "Jollof Rice",
        category: "Meals",
        price: 3500,
        image: "images/jeloff.jpeg",
        description: "Delicious, flavourful rice."
    },
    {
        id: 2,
        name: "Grilled Chicken",
        category: "Meals",
        price: 4500,
        image: "images/chicken.jpeg",
        description: "Juicy, well-seasoned chicken."
    },
    {
        id: 3,
        name: "Fried Rice",
        category: "Meals",
        price: 3000,
        image: "images/fried.jpeg",
        description: "Tasty rice with colourful vegetables."
    },
    {
        id: 4,
        name: "Puff Puff",
        category: "Snacks",
        price: 1000,
        image: "images/puff.jpeg",
        description: "Soft, sweet, golden bites."
    },
    {
        id: 5,
        name: "Samosa",
        category: "Snacks",
        price: 1000,
        image: "images/samosa.avif",
        description: "Crispy and delicious."
    },
    {
        id: 6,
        name: "Meat Pie",
        category: "Snacks",
        price: 800,
        image: "images/pie.jpeg",
        description: "A savoury pastry snack."
    },
    {
        id: 7,
        name: "Orange Juice",
        category: "Drinks",
        price: 1200,
        image: "images/juice.avif",
        description: "A refreshing citrus drink."
    },
    {
        id: 8,
        name: "Chapman",
        category: "Drinks",
        price: 1500,
        image: "images/champman.jpeg",
        description: "A fruity, refreshing drink."
    },
    {
        id: 9,
        name: "Chocolate Milkshake",
        category: "Drinks",
        price: 2000,
        image: "images/milkshake.avif",
        description: "A rich and creamy treat."
    }
];


// ==========================================
// FORMAT PRICES
// ==========================================

function money(amount) {
    return "₦" + amount.toLocaleString("en-NG");
}


// ==========================================
// LOGIN DEMONSTRATION
// ==========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        if (!email || !password) {
            message.textContent = "Please fill in all fields.";
            return;
        }

        // Demonstration only; not secure authentication.
        sessionStorage.setItem("saucySpoonDemoLogin", "true");

        window.location.href = "index.html";
    });
}


// ==========================================
// SIGN-UP LINK DEMONSTRATION
// ==========================================

const signupLink = document.getElementById("signupLink");

if (signupLink) {
    signupLink.addEventListener("click", function (event) {
        event.preventDefault();

        alert("A registration page can be added later.");
    });
}


// ==========================================
// CART STORAGE
// ==========================================

function getCart() {
    try {
        return JSON.parse(localStorage.getItem("saucySpoonCart")) || [];
    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem("saucySpoonCart", JSON.stringify(cart));

    updateCartCount();
    displayCart();
    renderFeaturedFoods();
}

function updateCartCount() {
    const count = getCart().reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll("#cartCount").forEach(function (element) {
        element.textContent = count;
    });
}


// ==========================================
// CREATE FOOD CARD
// ==========================================

function createFoodCard(food) {
    return `
        <div class="col-sm-6 col-lg-4">
            <div class="food-card">

                <img src="${food.image}" alt="${food.name}" loading="lazy">

                <div class="food-card-body">

                    <p class="section-label">${food.category}</p>

                    <h3>${food.name}</h3>

                    <p>${food.description}</p>

                    <div class="d-flex justify-content-between align-items-center gap-2">
                        <span class="food-price">${money(food.price)}</span>

                        <button
                            class="juwie-btn add-cart-btn"
                            onclick="addToCart(${food.id})">
                            + Add to Cart
                        </button>
                    </div>

                </div>

            </div>
        </div>
    `;
}


// ==========================================
// DISPLAY MENU
// ==========================================

function renderMenu(category = "All") {
    const foodMenu = document.getElementById("foodMenu");

    if (!foodMenu) return;

    const filteredFoods = category === "All"
        ? foods
        : foods.filter(function (food) {
            return food.category === category;
        });

    foodMenu.innerHTML = filteredFoods.length
        ? filteredFoods.map(createFoodCard).join("")
        : "<p>No products found.</p>";
}

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        renderMenu(button.dataset.category);
    });
});

renderMenu();


// ==========================================
// FEATURED FOODS ON HOMEPAGE
// ==========================================

function renderFeaturedFoods() {
    const featuredFoods = document.getElementById("featuredFoods");

    if (!featuredFoods) return;

    featuredFoods.innerHTML = foods.slice(0, 3)
        .map(createFoodCard)
        .join("");
}

renderFeaturedFoods();


// ==========================================
// ADD FOOD TO CART
// ==========================================

function addToCart(foodId) {
    const food = foods.find(function (item) {
        return item.id === foodId;
    });

    if (!food) return;

    const cart = getCart();

    const existingItem = cart.find(function (item) {
        return item.id === foodId;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            category: food.category,
            price: food.price,
            image: food.image,
            quantity: 1
        });
    }

    saveCart(cart);
    alert(food.name + " added to your cart!");
}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {
    const cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    const cart = getCart();

    const subtotalElement = document.getElementById("cartSubtotal");
    const deliveryElement = document.getElementById("deliveryFee");
    const totalElement = document.getElementById("cartTotal");

    if (!subtotalElement || !deliveryElement || !totalElement) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add some delicious meals, snacks or drinks.</p>
                <a href="menu.html" class="juwie-btn">Explore Menu</a>
            </div>
        `;

        subtotalElement.textContent = money(0);
        deliveryElement.textContent = money(0);
        totalElement.textContent = money(0);

        return;
    }

    cartItems.innerHTML = cart.map(function (item) {
        return `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p class="cart-item-price">
                        ${money(item.price * item.quantity)}
                    </p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${item.id}, -1)">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${item.id}, 1)">+</button>

                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})">
                        Remove
                    </button>

                </div>

            </div>
        `;
    }).join("");

    const subtotal = cart.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    // Update this amount to your actual delivery fee.
    const deliveryFee = 0;

    subtotalElement.textContent = money(subtotal);
    deliveryElement.textContent = money(deliveryFee);
    totalElement.textContent = money(subtotal + deliveryFee);
}


// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(foodId, change) {
    const cart = getCart();

    const item = cart.find(function (product) {
        return product.id === foodId;
    });

    if (!item) return;

    item.quantity += change;

    const updatedCart = cart.filter(function (product) {
        return product.quantity > 0;
    });

    saveCart(updatedCart);
}


// ==========================================
// REMOVE FOOD
// ==========================================

function removeFromCart(foodId) {
    const updatedCart = getCart().filter(function (item) {
        return item.id !== foodId;
    });

    saveCart(updatedCart);
}


// ==========================================
// CHECKOUT TO WHATSAPP
// ==========================================

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const cart = getCart();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (whatsappNumber.includes("X")) {
            alert("Please add your WhatsApp number in js/script.js.");
            return;
        }

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const address = document.getElementById("customerAddress").value.trim();

        if (!name || !phone || !address) {
            alert("Please complete all delivery details.");
            return;
        }

        const subtotal = cart.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);

        const deliveryFee = 0;

        let message = "Hello Saucy Spoon! I would like to place an order.\n\n";

        message += "CUSTOMER DETAILS\n";
        message += "Name: " + name + "\n";
        message += "Phone: " + phone + "\n";
        message += "Address: " + address + "\n\n";

        message += "ORDER DETAILS\n";

        cart.forEach(function (item) {
            message += item.name + " x " + item.quantity +
                " = " + money(item.price * item.quantity) + "\n";
        });

        message += "\nSubtotal: " + money(subtotal);
        message += "\nDelivery Fee: " + money(deliveryFee);
        message += "\nTOTAL: " + money(subtotal + deliveryFee);

        const url = "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(message);

        window.open(url, "_blank");
    });
}


// ==========================================
// WHATSAPP CONTACT LINKS
// ==========================================

function getWhatsAppURL(message = "Hello Saucy Spoon! I would like to make an enquiry.") {
    if (whatsappNumber.includes("X")) {
        return "#";
    }

    return "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);
}

document.querySelectorAll("#whatsappLink, #contactWhatsapp")
    .forEach(function (link) {
        link.href = getWhatsAppURL();

        link.target = "_blank";
        link.rel = "noopener noreferrer";

        link.addEventListener("click", function (event) {
            if (whatsappNumber.includes("X")) {
                event.preventDefault();
                alert("Please add your WhatsApp number in js/script.js.");
            }
        });
    });


// ==========================================
// INITIALISE WEBSITE
// ==========================================

updateCartCount();
displayCart();