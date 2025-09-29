document.addEventListener('DOMContentLoaded', () => {

    // --- Login/Register Form Toggle ---
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');
    const showRegisterBtn = document.getElementById('show-register');
    const showLoginBtn = document.getElementById('show-login');

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginFormContainer.classList.add('hidden');
            registerFormContainer.classList.remove('hidden');
        });
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            registerFormContainer.classList.add('hidden');
            loginFormContainer.classList.remove('hidden');
        });
    }

    // --- Search Overlay Functionality ---
    const searchIconLink = document.getElementById('search-icon-link');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const body = document.body;

    // Check if the search icon link exists on the page
    if (searchIconLink) {
        searchIconLink.addEventListener('click', (e) => {
            e.preventDefault();
            const searchOverlay = document.createElement('div');
            searchOverlay.classList.add('search-overlay');
            searchOverlay.innerHTML = `
                <span class="close-search-btn" id="close-search-btn">&times;</span>
                <form class="search-form">
                    <input type="text" placeholder="Search for products...">
                    <i class="fas fa-search"></i>
                </form>
            `;
            body.appendChild(searchOverlay);
            setTimeout(() => {
                searchOverlay.classList.add('active');
            }, 10); // A small delay for the transition to work
            
            // Add a click listener to the new close button
            document.getElementById('close-search-btn').addEventListener('click', () => {
                searchOverlay.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(searchOverlay);
                }, 300); // Wait for the transition to finish
            });
        });
    }

    // --- Shopping Cart Functionality (Dummy Data) ---
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalSpan = document.getElementById('cart-subtotal');
    const cartTotalSpan = document.getElementById('cart-total');

    // This is a placeholder for your product data. In a real app, this would come from an API.
    const cart = [
        { id: 1, name: "Necklace", price: 99.00, quantity: 1, image: "https://via.placeholder.com/100x100" },
        { id: 2, name: "Lipstick", price: 25.50, quantity: 2, image: "https://via.placeholder.com/100x100" }
    ];

    function renderCart() {
        if (!cartItemsContainer) return; // Exit if not on the cart page

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                subtotal += item.price * item.quantity;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <div class="item-actions">
                            <input type="number" value="${item.quantity}" min="1" class="item-quantity" data-id="${item.id}">
                            <button class="remove-item-btn" data-id="${item.id}">Remove</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
        }

        updateCartSummary(subtotal);
    }

    function updateCartSummary(subtotal) {
        if (!cartSubtotalSpan) return;

        const shipping = 0; // Or calculate based on order total
        const total = subtotal + shipping;

        cartSubtotalSpan.textContent = subtotal.toFixed(2);
        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Event listeners for cart item actions
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('item-quantity')) {
                const itemId = parseInt(e.target.dataset.id);
                const newQuantity = parseInt(e.target.value);
                const itemToUpdate = cart.find(item => item.id === itemId);
                if (itemToUpdate) {
                    itemToUpdate.quantity = newQuantity;
                    renderCart();
                }
            }
        });

        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item-btn')) {
                const itemId = parseInt(e.target.dataset.id);
                const itemIndex = cart.findIndex(item => item.id === itemId);
                if (itemIndex > -1) {
                    cart.splice(itemIndex, 1);
                    renderCart();
                }
            }
        });
    }

    // Initial render of the cart
    renderCart();

});
