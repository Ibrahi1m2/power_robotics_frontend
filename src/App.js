import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ModalProvider, useModal } from "./context/ModalContext";
import SuccessModal from "./components/SuccessModal";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import HomePageTwo from "./pages/HomePageTwo";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import VendorPage from "./pages/VendorPage";
import VendorDetailsPage from "./pages/VendorDetailsPage";
import VendorTwoPage from "./pages/VendorTwoPage";
import VendorTwoDetailsPage from "./pages/VendorTwoDetailsPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import Wishlist from "./pages/Wishlist";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AdminOrderView from "./components/AdminOrderView";

const AppContent = () => {
  const { modalState, hideSuccessModal } = useModal();

  return (
    <>
      <RouteScrollToTop />
      <PhosphorIconInit />
      <Routes>
        <Route path="/" element={<HomePageTwo />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/become-seller" element={<BecomeSellerPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-details" element={<BlogDetailsPage />} />
        <Route path="/vendor" element={<VendorPage />} />
        <Route path="/vendor-details" element={<VendorDetailsPage />} />
        <Route path="/vendor-two" element={<VendorTwoPage />} />
        <Route path="/vendor-two-details" element={<VendorTwoDetailsPage />} />
        <Route path="/product-details" element={<ProductDetailsPageOne />} />
        <Route path="/product-details-two/:id" element={<ProductDetailsPageTwo />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="/admin/order/:uniqueId" element={<AdminOrderView />} />
      </Routes>
      <SuccessModal
        show={modalState.show}
        message={modalState.message}
        onClose={hideSuccessModal}
      />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <ModalProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ModalProvider>
    </Router>
  );
};

export default App;
