// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the modal
    const modal = document.getElementById('successModal');
    if (!modal) {
        console.error('Success modal element not found');
        return;
    }
});

function showSuccessModal(message = 'Item added successfully') {
    const modal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    
    if (!modal || !messageElement) {
        console.error('Modal elements not found');
        return;
    }
    
    messageElement.textContent = message;
    modal.classList.add('show');
    
    // Remove the show class after animation
    setTimeout(() => {
        modal.classList.remove('show');
    }, 3000);
}

// Add to cart function
function addToCart(productId) {
    // Your cart addition logic here
    showSuccessModal('Item added to cart successfully');
}

// Add to wishlist function
function addToWishlist(productId) {
    // Your wishlist addition logic here
    showSuccessModal('Item added to wishlist successfully');
}

// Make functions available globally
window.showSuccessModal = showSuccessModal;
window.addToCart = addToCart;
window.addToWishlist = addToWishlist; 