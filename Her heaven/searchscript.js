document.addEventListener('DOMContentLoaded', () => {

    // --- Search Overlay Functionality ---
    const searchIconLink = document.getElementById('search-icon-link');
    const body = document.body;

    // Check if the search icon link exists on the page
    if (searchIconLink) {
        searchIconLink.addEventListener('click', (e) => {
            e.preventDefault();
            const searchOverlay = document.createElement('div');
            searchOverlay.classList.add('search-overlay');
            searchOverlay.innerHTML = `
                <span class="close-search-btn">&times;</span>
                <form class="search-form">
                    <input type="text" placeholder="Search for products...">
                    <i class="fas fa-search"></i>
                </form>
            `;
            body.appendChild(searchOverlay);
            
            // Add a small delay for the transition to work
            setTimeout(() => {
                searchOverlay.classList.add('active');
            }, 10);
            
            // Add a click listener to the close button
            searchOverlay.querySelector('.close-search-btn').addEventListener('click', () => {
                searchOverlay.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(searchOverlay);
                }, 300); // Wait for the transition to finish
            });
        });
    }

});