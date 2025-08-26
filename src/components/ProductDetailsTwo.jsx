import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { getCountdown } from '../helper/Countdown';
import { useCartWithModal } from '../hooks/useCartWithModal';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductDetailsTwo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(getCountdown());
  const { addToCart } = useCartWithModal();
  const navigate = useNavigate();

  console.log('ProductDetailsTwo: Component rendered with productId:', productId);
  console.log('ProductDetailsTwo: Current state - loading:', loading, 'error:', error, 'product:', product);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    console.log('ProductDetailsTwo: Fetching product with ID:', productId);
    fetch(`http://localhost:5000/api/products/${productId}`)
      .then(res => {
        console.log('ProductDetailsTwo: Response status:', res.status);
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then(data => {
        console.log('ProductDetailsTwo: Received product data:', data);
        setProduct(data);
        // Use API image_url if valid, else fallback to public path
        const fallback = '/assets/images/thumbs/product-two-img1.png';
        const mainImg = (data.image_url && data.image_url.trim() !== '' ? data.image_url : fallback);
        setMainImage(mainImg);
        setLoading(false);
      })
      .catch(err => {
        console.error('ProductDetailsTwo: Error fetching product:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  console.log('ProductDetailsTwo: About to render - loading:', loading, 'error:', error, 'product:', product);

  if (loading) {
    console.log('ProductDetailsTwo: Rendering loading state');
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    console.log('ProductDetailsTwo: Rendering error state');
    return (
      <div className="alert alert-danger text-center">
      {error}
      </div>
    );
  }
  
  if (!product) {
    console.log('ProductDetailsTwo: Rendering no product state');
    return (
      <div className="alert alert-warning text-center">
      No product found.
      </div>
  );
  }

  console.log('ProductDetailsTwo: Rendering product details');

  // You can add more images if you have a gallery column or similar
  const fallback = '/assets/images/thumbs/product-two-img1.png';
  // Use product.image_urls if available, otherwise repeat main image
  let productImages = [];
  if (Array.isArray(product.image_urls) && product.image_urls.length >= 3) {
    productImages = product.image_urls.slice(0, 3);
  } else {
    const mainImg = (product.image_url && product.image_url.trim() !== '' ? product.image_url : fallback);
    productImages = [mainImg, mainImg, mainImg];
  }

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="product-details-modern" style={{ padding: '20px', background: '#f8f9fa', minHeight: '100vh' }}>
        <div className="container">
        <div className="row justify-content-center">
          {/* Product Image */}
          <div className="col-lg-8 mb-4">
            <div className="product-image-container">
              <div className="product-details__thumb-slider border border-gray-100 rounded-16 mb-4" style={{ background: 'transparent', padding: '20px' }}>
                    <div className="product-details__thumb flex-center h-100" style={{ minHeight: '400px' }}>
                      <img 
                        src={mainImage} 
                        alt={product.name}
                        style={{
                          maxHeight: '400px',
                          width: 'auto',
                          maxWidth: '100%',
                          objectFit: 'contain',
                      borderRadius: '20px'
                        }}
                        onError={e => { e.target.onerror = null; e.target.src = fallback; }}
                      />
                    </div>
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  <div className="product-details__images-slider">
                    <Slider {...settingsThumbs}>
                      {productImages.map((image, index) => (
                        <div 
                          className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8 cursor-pointer" 
                          key={index} 
                          onClick={() => setMainImage(image)}
                          style={{
                        background: 'transparent',
                            transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        margin: '0 5px'
                          }}
                        >
                          <img 
                            className='thum' 
                            src={image} 
                            alt={`Thumbnail ${index}`}
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'contain',
                              borderRadius: '8px'
                            }}
                            onError={e => { e.target.onerror = null; e.target.src = fallback; }}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
            </div>
          </div>

          {/* Product Info - Below Image */}
          <div className="col-lg-8">
            <div className="product-info text-center">
              <h1 className="product-title mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>
                    {product.name}
              </h1>

              <div className="product-meta d-flex justify-content-center align-items-center gap-4 mb-4">
                <span className="price" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' }}>
                      ₹{product.price}
                </span>
                <span className="stock-badge" style={{ background: '#28a745', color: '#fff', padding: '8px 20px', borderRadius: '25px', fontWeight: '600' }}>
                      Stock: {product.stock}
                    </span>
                    {product.brand && (
                  <span className="brand-badge" style={{ background: '#6c757d', color: '#fff', padding: '8px 20px', borderRadius: '25px', fontWeight: '600' }}>
                        {product.brand}
                      </span>
                    )}
              </div>

              {product.description && (
                <div className="product-description mb-4">
                  <h5>Description:</h5>
                  <p style={{ color: '#666', lineHeight: '1.6' }}>{product.description}</p>
                </div>
                  )}

                  {/* Action Buttons */}
              <div className="action-buttons d-flex gap-3 mb-4 justify-content-center">
                <button 
                  className="btn d-flex align-items-center justify-content-center gap-2" 
                      onClick={() => addToCart(product)}
                      style={{
                    flex: 1, 
                    maxWidth: '200px', 
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
                  Add to Cart
                </button>
                        <button
                  className="btn d-flex align-items-center justify-content-center gap-2" 
                  onClick={handleBuyNow}
                          style={{
                    flex: 1, 
                    maxWidth: '200px', 
                    background: 'rgba(55, 65, 81, 0.9)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: 16,
                    border: '1px solid rgba(55, 65, 81, 1)',
                    textDecoration: 'none'
                  }}
                >
                  Buy Now
                        </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTwo