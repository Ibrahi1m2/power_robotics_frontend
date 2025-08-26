import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import QuantityControl from '../helper/QuantityControl';
import { ShoppingCartSimple, Trash, Plus, Minus, CreditCard, Shield, Truck, Star } from '@phosphor-icons/react';
import { Badge } from 'react-bootstrap';

const CartSection = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (cartItemId, newQuantity) => {
        if (newQuantity > 0) {
        updateQuantity(cartItemId, newQuantity);
        } else {
            removeFromCart(cartItemId);
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

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
            className="cart-section py-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
                minHeight: '100vh'
            }}
        >
            <div className="container container-lg">
                {/* Cart Header with Badge */}
                <div className="d-flex align-items-center justify-content-between mb-5">
                  <h2 className="section-heading__title mb-0">My Cart</h2>
                  <span style={{ fontWeight: 700, fontSize: 18 }}>
                    <Badge bg="primary" pill style={{ fontSize: 16, padding: '8px 16px' }}>
                      {cartItems.length}
                    </Badge>
                  </span>
                </div>
                <AnimatePresence>
                {cartItems.length === 0 ? (
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
                                <ShoppingCartSimple size={80} color="#667eea" style={{ marginBottom: 24, opacity: 0.7 }} />
                            </motion.div>
                            <h2 className="text-heading-2 mb-4" style={{ fontWeight: 800, color: '#2d3748' }}>Your Cart is Empty</h2>
                            <p className="text-gray-600 mb-5" style={{ fontSize: 18 }}>Looks like you haven't added anything to your cart yet. Start exploring our amazing products!</p>
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
                                    textDecoration: 'none'
                                }}
                            >
                                <ShoppingCartSimple size={24} /> Start Shopping
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="row gy-4">
                            <div className="col-xl-8 col-lg-8">
                                <motion.div
                                    className="cart-header mb-4"
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
                                            <h2 style={{ fontWeight: 800, color: '#2d3748', margin: 0 }}>Shopping Cart</h2>
                                            <p style={{ color: '#718096', margin: 0, fontSize: 16 }}>{cartItems.length} items in your cart</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <ShoppingCartSimple size={32} color="#667eea" weight="fill" />
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="cart-grid"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <AnimatePresence>
                                        {cartItems.map((item, index) => (
                                            <motion.div
                                                key={item.cartItemId}
                                                className="cart-card mb-4"
                                                variants={itemVariants}
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
                                                                {item.name}
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
                                                            <div className="quantity-controls d-flex align-items-center justify-content-center gap-2 mb-3">
                                                                <motion.button
                                                                    className="btn"
                                                                    style={{
                                                                        width: '36px',
                                                                        height: '36px',
                                                                        borderRadius: '8px',
                                                                        background: 'rgba(102, 126, 234, 0.1)',
                                                                        border: '1px solid rgba(102, 126, 234, 0.2)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '18px',
                                                                        fontWeight: 'bold',
                                                                        color: '#667eea'
                                                                    }}
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                                                                >
                                                                    -
                                                                </motion.button>
                                                                <span style={{ 
                                                                    minWidth: '40px', 
                                                                    textAlign: 'center', 
                                                                    fontWeight: 700,
                                                                    fontSize: 18,
                                                                    color: '#2d3748'
                                                                }}>
                                                                    {item.quantity}
                                                                </span>
                                                                <motion.button
                                                                    className="btn"
                                                                    style={{
                                                                        width: '36px',
                                                                        height: '36px',
                                                                        borderRadius: '8px',
                                                                        background: 'rgba(102, 126, 234, 0.1)',
                                                                        border: '1px solid rgba(102, 126, 234, 0.2)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '18px',
                                                                        fontWeight: 'bold',
                                                                        color: '#667eea'
                                                                    }}
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                                                                >
                                                                    +
                                                                </motion.button>
                                                            </div>
                                                            <div className="price-display mb-3">
                                                                <span style={{ fontWeight: 800, color: '#667eea', fontSize: 20 }}>
                                                                    ₹{(item.price * item.quantity).toFixed(2)}
                                                                </span>
                                                            </div>
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
                                                                onClick={() => removeFromCart(item.cartItemId)}
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
                                    className="cart-summary"
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
                                    <h4 style={{ fontWeight: 800, color: '#2d3748', marginBottom: 24 }}>Order Summary</h4>
                                    
                                    <div className="summary-stats mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span style={{ color: '#718096' }}>Subtotal ({cartItems.length} items):</span>
                                            <span style={{ fontWeight: 600, color: '#2d3748' }}>₹{subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <Truck size={16} color="#48bb78" />
                                                <span style={{ color: '#718096' }}>Shipping:</span>
                                            </div>
                                            <span style={{ fontWeight: 600, color: shipping === 0 ? '#48bb78' : '#2d3748' }}>
                                                {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <span style={{ color: '#718096' }}>Tax (estimated):</span>
                                            <span style={{ fontWeight: 600, color: '#2d3748' }}>₹0.00</span>
                                        </div>
                                    </div>

                                    <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }} />

                                    <div className="total-section mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span style={{ fontSize: 18, fontWeight: 700, color: '#2d3748' }}>Total:</span>
                                            <span style={{ fontSize: 24, fontWeight: 800, color: '#667eea' }}>₹{total.toFixed(2)}</span>
                                        </div>
                                        <p style={{ color: '#718096', fontSize: 12, margin: '8px 0 0 0' }}>Including all taxes and fees</p>
                                    </div>

                                    <div className="checkout-actions">
                                        <Link
                                            to="/checkout"
                                            className="btn w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                padding: '16px',
                                                borderRadius: '50px',
                                                fontWeight: 600,
                                                border: 'none',
                                                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <CreditCard size={20} /> Proceed to Checkout
                                        </Link>
                                        
                                        <Link
                                            to="/"
                                            className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                                            style={{
                                                background: 'rgba(55, 65, 81, 0.9)',
                                                color: 'white',
                                                padding: '16px',
                                                borderRadius: '50px',
                                                fontWeight: 600,
                                                border: '1px solid rgba(55, 65, 81, 1)',
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <ShoppingCartSimple size={20} /> Continue Shopping
                                        </Link>
                                    </div>

                                    <div className="security-badges mt-4">
                                        <div className="d-flex align-items-center justify-content-center gap-3 p-3" style={{
                                            background: 'rgba(72, 187, 120, 0.05)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(72, 187, 120, 0.1)'
                                        }}>
                                            <Shield size={20} color="#48bb78" />
                                            <span style={{ color: '#48bb78', fontSize: 14, fontWeight: 600 }}>Secure Checkout</span>
                                        </div>
                                    </div>

                                    <div className="shipping-info mt-3 p-3" style={{
                                        background: 'rgba(102, 126, 234, 0.05)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(102, 126, 234, 0.1)'
                                    }}>
                                        <h6 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}>🚚 Free Shipping</h6>
                                        <p style={{ color: '#718096', fontSize: 12, margin: 0 }}>
                                            {subtotal < 500 ? `Add $${(500 - subtotal).toFixed(2)} more for free shipping!` : 'You qualify for free shipping!'}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
};

export default CartSection;