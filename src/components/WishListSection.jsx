import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCartSimple } from '@phosphor-icons/react';
import { Badge } from 'react-bootstrap';

const WishListSection = () => {
    const { wishlistItems, removeFromWishlist, addToCart } = useCart();

    const handleMoveToCart = (item) => {
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    const spring = {
        type: "spring",
        stiffness: 400,
        damping: 30
    };

  return (
        <motion.section 
            className="wishlist-section py-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container container-lg">
                {/* Wishlist Header with Badge */}
                <div className="d-flex align-items-center justify-content-between mb-5">
                  <h2 className="section-heading__title mb-0">My Wishlist</h2>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>
                    <Badge bg="danger" pill style={{ fontSize: 16, padding: '8px 16px' }}>
                      {wishlistItems.length}
                    </Badge>
                  </span>
                </div>
                <AnimatePresence>
                    {wishlistItems.length === 0 ? (
                        <motion.div
                            key="empty"
                            className="text-center py-5"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                        >
                            <Heart size={64} color="#f43f5e" style={{ marginBottom: 16, opacity: 0.7 }} />
                            <h2 className="text-heading-2 mb-4">Your Wishlist is Empty</h2>
                            <p className="text-gray-600 mb-5">Explore our products and save your favorites here.</p>
                            <Link to="/" className="btn btn-main rounded-pill py-3 px-5 d-inline-flex align-items-center gap-2">
                                <ShoppingCartSimple size={24} /> Discover Products
                        </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="wishlist-items-wrapper"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <AnimatePresence>
                                {wishlistItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className="wishlist-item-card card border-0 shadow-lg mb-4"
                                        variants={itemVariants}
                                        exit="exit"
                                        whileHover={{ scale: 1.035, boxShadow: '0 12px 36px rgba(60,60,120,0.22)' }}
                                        transition={spring}
                                        style={{ borderRadius: 28, overflow: 'hidden', background: 'rgba(255,255,255,0.98)' }}
                                    >
                                        <div className="card-body d-flex align-items-center p-4" style={{ borderRadius: 24, background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 8px rgba(60,60,120,0.04)' }}>
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="rounded shadow-sm"
                                                style={{ width: 56, height: 56, objectFit: 'cover', border: '2px solid #e5e7eb', background: '#f8fafc', marginRight: 24 }}
                                            />
                                            <div className="ms-2 flex-grow-1">
                                                <h5 className="mb-1" style={{ fontWeight: 700, fontSize: 20 }}>{item.name}</h5>
                                                <p className="text-muted mb-2" style={{ fontSize: 16 }}>${item.price.toFixed(2)}</p>
                        <button
                                                    className="btn btn-main rounded-pill d-inline-flex align-items-center gap-2 fw-bold"
                                                    style={{ fontSize: 16 }}
                                                    onClick={() => handleMoveToCart(item)}
                        >
                                                    <ShoppingCartSimple size={20} /> Add to Cart
                        </button>
                        </div>
                        <button
                                                className="btn btn-outline-danger rounded-pill ms-auto px-4 py-2"
                                                style={{ fontWeight: 600 }}
                                                onClick={() => removeFromWishlist(item.id)}
                        >
                          Remove
                        </button>
                              </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
  );
};

export default WishListSection;
