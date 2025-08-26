import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, X, Star, Eye, Trash } from '@phosphor-icons/react';
import Preloader from "../helper/Preloader";
import ColorInit from "../helper/ColorInit";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import FooterTwo from "../components/FooterTwo";
import BottomFooter from "../components/BottomFooter";
import ScrollToTop from "react-scroll-to-top";
import { useCartWithModal } from '../hooks/useCartWithModal';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCartWithModal();

  useEffect(()=>{
    console.log(wishlistItems)
  },[wishlistItems])

  const handleAddToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: -30,
      transition: { duration: 0.3 } 
    },
  };

  const totalValue = wishlistItems.reduce((total, item) => total + (parseFloat(item.price) || 0), 0);

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Wishlist"} />

      <motion.section 
        className="wishlist py-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
          minHeight: '100vh'
        }}
      >
        <div className="container container-lg">
          <AnimatePresence mode="wait">
            {wishlistItems.length === 0 ? (
              <motion.div
                key="empty"
                className="text-center py-5"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '32px',
                  padding: '80px 40px',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Heart size={80} color="#e91e63" style={{ marginBottom: 24, opacity: 0.7 }} />
                </motion.div>
                <h2 className="text-heading-2 mb-4" style={{ fontWeight: 800, color: '#2d3748' }}>Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-5" style={{ fontSize: 18 }}>Save items you love for later. Start exploring our amazing products!</p>
                <Link 
                  to="/" 
                  className="btn d-inline-flex align-items-center gap-3"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: 16,
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <ShoppingCart size={24} /> Start Shopping
                </Link>
              </motion.div>
            ) : (
              <div className="row gy-4">
                <div className="col-xl-8 col-lg-8">
                  <motion.div
                    className="wishlist-header mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      padding: '24px 32px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h2 style={{ fontWeight: 800, color: '#2d3748', margin: 0 }}>My Wishlist</h2>
                        <p style={{ color: '#718096', margin: 0, fontSize: 16 }}>{wishlistItems.length} items saved</p>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <Heart size={32} color="#e91e63" weight="fill" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="wishlist-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {wishlistItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="wishlist-card mb-4"
                          variants={cardVariants}
                          exit="exit"
                          whileHover={{ 
                            scale: 1.02, 
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)' 
                          }}
                          style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '24px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                          }}
                        >
                          <div className="row align-items-center">
                            <div className="col-md-3">
                              <div 
                                className="product-image-wrapper"
                                style={{
                                  borderRadius: '16px',
                                  overflow: 'hidden',
                                  background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                                  padding: '16px',
                                  position: 'relative'
                                }}
                              >
                                <img
                                  src={item.image_url}
                                  alt={item.name}
                                  style={{
                                    width: '100%',
                                    height: '120px',
                                    objectFit: 'cover',
                                    borderRadius: '12px'
                                  }}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="product-details">
                                <h5 
                                  className="product-title mb-2"
                                  style={{ 
                                    fontWeight: 700, 
                                    color: '#2d3748',
                                    fontSize: 18,
                                    lineHeight: 1.4
                                  }}
                                >
                                  <Link 
                                    to="/product-details-two" 
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                  >
                                    {item.name}
                                  </Link>
                                </h5>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                  <div className="d-flex align-items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} size={16} color="#fbbf24" weight="fill" />
                                    ))}
                                  </div>
                                  <span style={{ color: '#718096', fontSize: 14 }}>4.8 (17k reviews)</span>
                                </div>
                                <div className="price-section">
                                  <span 
                                    className="current-price"
                                    style={{
                                      fontSize: 24,
                                      fontWeight: 800,
                                      color: '#667eea'
                                    }}
                                  >
                                    ₹{item.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-3 text-end">
                              <div className="action-buttons d-flex flex-column gap-2">
                                <motion.button
                                  className="btn d-flex align-items-center justify-content-center gap-2"
                                  style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    border: 'none',
                                    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                                    width: '100%'
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleAddToCart(item)}
                                >
                                  <ShoppingCart size={18} /> Add to Cart
                                </motion.button>
                                <motion.button 
                                  className="btn d-flex align-items-center justify-content-center gap-2"
                                  style={{
                                    background: 'rgba(55, 65, 81, 0.9)',
                                    color: 'white',
                                    padding: '12px 24px',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    border: '1px solid rgba(55, 65, 81, 1)',
                                    width: '100%'
                                  }}
                                  whileHover={{ scale: 1.05, background: 'rgba(31, 41, 55, 0.95)' }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => removeFromWishlist(item.id)}
                                >
                                  <Trash size={18} /> Remove
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
                
                <div className="col-xl-4 col-lg-4">
                  <motion.div 
                    className="wishlist-summary"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      padding: '32px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      position: 'sticky',
                      top: '100px'
                    }}
                  >
                    <h4 style={{ fontWeight: 800, color: '#2d3748', marginBottom: 24 }}>Wishlist Summary</h4>
                    
                    <div className="summary-stats mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ color: '#718096' }}>Total Items:</span>
                        <span style={{ fontWeight: 600, color: '#2d3748' }}>{wishlistItems.length}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ color: '#718096' }}>Total Value:</span>
                        <span style={{ fontWeight: 700, color: '#667eea', fontSize: 20 }}>₹{totalValue.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <span style={{ color: '#718096' }}>Estimated Shipping:</span>
                        <span style={{ fontWeight: 600, color: '#48bb78' }}>Free</span>
                      </div>
                    </div>

                    <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }} />

                    <div className="quick-actions">
                      <motion.button
                        className="btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          padding: '16px',
                          borderRadius: '50px',
                          fontWeight: 600,
                          border: 'none',
                          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          wishlistItems.forEach(item => handleAddToCart(item));
                        }}
                      >
                        <ShoppingCart size={20} /> Add All to Cart
                      </motion.button>
                      
                      <Link
                        to="/"
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background: 'rgba(102, 126, 234, 0.1)',
                          color: '#667eea',
                          padding: '16px',
                          borderRadius: '50px',
                          fontWeight: 600,
                          border: '1px solid rgba(102, 126, 234, 0.2)',
                          textDecoration: 'none'
                        }}
                      >
                        <Eye size={20} /> Continue Shopping
                      </Link>
                    </div>

                    <div className="wishlist-tips mt-4 p-3" style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: '16px',
                      border: '1px solid rgba(102, 126, 234, 0.1)'
                    }}>
                      <h6 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}> Pro Tip</h6>
                      <p style={{ color: '#718096', fontSize: 14, margin: 0 }}>
                        Items in your wishlist are saved across devices. Share your wishlist with friends!
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Shipping Info Section */}
      <section className="shipping-info py-80 bg-gray-50">
        <div className="container container-lg">
          <div className="row g-4">
            <div className="col-lg-3 col-sm-6">
              <div className="shipping-info__item text-center">
                <div className="shipping-info__icon mb-16">
                  <i className="ph ph-truck text-3xl text-main-600" />
                </div>
                <h5 className="shipping-info__title text-heading-5 mb-8">Free Shipping</h5>
                <p className="shipping-info__text text-gray-500">Free shipping all over the US</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="shipping-info__item text-center">
                <div className="shipping-info__icon mb-16">
                  <i className="ph ph-smiley text-3xl text-main-600" />
                </div>
                <h5 className="shipping-info__title text-heading-5 mb-8">100% Satisfaction</h5>
                <p className="shipping-info__text text-gray-500">Free shipping all over the US</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="shipping-info__item text-center">
                <div className="shipping-info__icon mb-16">
                  <i className="ph ph-shield-check text-3xl text-main-600" />
                </div>
                <h5 className="shipping-info__title text-heading-5 mb-8">Secure Payments</h5>
                <p className="shipping-info__text text-gray-500">Free shipping all over the US</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="shipping-info__item text-center">
                <div className="shipping-info__icon mb-16">
                  <i className="ph ph-headset text-3xl text-main-600" />
                </div>
                <h5 className="shipping-info__title text-heading-5 mb-8">24/7 Support</h5>
                <p className="shipping-info__text text-gray-500">Free shipping all over the US</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default Wishlist; 