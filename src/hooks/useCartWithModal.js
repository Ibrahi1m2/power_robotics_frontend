import { useCart } from '../context/CartContext';
import { useModal } from '../context/ModalContext';

export const useCartWithModal = () => {
  const cart = useCart();
  const { showSuccessModal } = useModal();

  const addToCartWithModal = (product) => {
    const success = cart.addToCart(product);
    if (success) {
      console.log('showSuccessModal called: Item added to cart successfully');
      showSuccessModal('Item added to cart successfully');
    }
  };

  const addToWishlistWithModal = (product) => {
    const success = cart.addToWishlist(product);
    if (success) {
      console.log('showSuccessModal called: Item added to wishlist successfully');
      showSuccessModal('Item added to wishlist successfully');
    }
  };

  return {
    ...cart,
    addToCart: addToCartWithModal,
    addToWishlist: addToWishlistWithModal,
  };
}; 