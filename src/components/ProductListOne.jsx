import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { QrCode } from "@phosphor-icons/react";

const heroVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const ProductListOne = () => {
    const { addToWishlist, removeFromWishlist, wishlistItems } = useCart();
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                
                // Add timeout to prevent hanging
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
                
                const response = await fetch('http://localhost:5000/api/products', {
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError(error.message);
                // Set empty array to prevent hanging
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 50,
        });
    }, []);

    const handleWishlistToggle = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        const product = {
            id: productId,
            name: "Product " + productId,
            price: 14.99,
            image: `assets/images/thumbs/product-img${productId}.png`
        };
        
        if (wishlistItems.some(item => item.id === productId)) {
            removeFromWishlist(productId);
        } else {
            addToWishlist(product);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="text-center py-80">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-80">
                <div className="alert alert-warning" role="alert">
                    <h4>Unable to load products</h4>
                    <p>{error}</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const whatsappNumber = "919003779504"; // Customer's number (no +, just country code and number)
    const message = encodeURIComponent("Please find your order slip attached. (Attach the PDF before sending!)");

    const handleSendWhatsApp = () => {
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
      setTimeout(() => {
        alert("Don't forget to attach your PDF slip in WhatsApp before sending!");
      }, 500);
    };

    return (
        <section className="product-grid-fullwidth py-80" style={{ width: '100vw', maxWidth: '100vw', marginLeft: '50%', transform: 'translateX(-50%)' }}>
            <div className="section-heading center mb-40">
                <h2 className="section-heading__title">Featured Products</h2>
                <p className="section-heading__desc">Discover our bestsellers and new arrivals</p>
            </div>
            {/* Search Bar */}
            <div className="d-flex justify-content-center mb-4">
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: 400, borderRadius: 24, padding: '12px 20px', fontSize: 18, boxShadow: '0 2px 8px rgba(60,60,120,0.04)' }}
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="row gx-5 gy-5 justify-content-center" style={{ width: '100vw', maxWidth: '100vw', margin: 0 }}>
                {filteredProducts.map(product => (
                    <div
                        className="col-xxl-2 col-lg-3 col-sm-4 col-6 d-flex align-items-stretch"
                        key={product.id}
                        data-aos="fade-up"
                        data-aos-delay={product.id * 100}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <div className="text-center text-gray-500 mt-4">No products found.</div>
                )}
            </div>
            {/* QR Code above Place Order button */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
              <QrCode size={48} color="#333" style={{ marginBottom: 8 }} />
              <img src="/assets/images/qr-code.jpg" alt="QR Code" style={{ width: 240, height: 240, display: 'block' }} />
            </div>
            <button onClick={handleSendWhatsApp} className="btn btn-success">
              Send to WhatsApp
            </button>
        </section>
    );
};

export default ProductListOne;