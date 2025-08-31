import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useCartWithModal } from '../hooks/useCartWithModal';

// import RecommendedOne from "./RecommendedOne";

// Utility to shuffle an array
function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getFromLocalStorage() {
  return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
}

const DealsOne = ({ search = "" }) => {

    // Product fetching and wishlist/cart logic
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToWishlist, removeFromWishlist, wishlistItems, addToCart } = useCartWithModal();
    const navigate = useNavigate();

    // Fallback demo products when API is not available
    const fallbackProducts = [];

    useEffect(() => {
        // Try to fetch from API first, fallback to demo data
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Try multiple API endpoints
                const endpoints = [
                    `${process.env.REACT_APP_API_BASE_URL}/api/products`,
                    "/api/products",
                    "/api/deal-of-the-week"
                ];
                
                let data = null;
                let lastError = null;
                
                for (const endpoint of endpoints) {
                    try {
                        const response = await fetch(endpoint);
                        if (response.ok) {
                            data = await response.json();
                            break;
                        }
                    } catch (err) {
                        lastError = err;
                        continue;
                    }
                }
                
                if (data && Array.isArray(data) && data.length > 0) {
                    setProducts(data);
                } else {
                    // Use fallback data when API is not available
                    console.warn('API not available, using fallback products');
                    setProducts(fallbackProducts);
                }
                
                setLoading(false);
            } catch (err) {
                console.warn('Failed to fetch products, using fallback data:', err.message);
                setProducts(fallbackProducts);
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    const handleWishlistToggle = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        if (wishlistItems.some(item => item.id === product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        // Ensure price is a number
        const safeProduct = { ...product, price: Number(product.price) };
        addToCart(safeProduct);
    };

    const handleBuyNow = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        // Ensure price is a number
        const safeProduct = { ...product, price: Number(product.price) };
        addToCart(safeProduct);
        navigate('/cart');
    };

    // Removed duplicate API call - now handled in main useEffect above

    // Recommended: random subset
    const recommended = useMemo(() => shuffle(products).slice(0, 4), [products]);

    // Recently viewed: from localStorage
    const [recentlyViewed, setRecentlyViewed] = useState(getFromLocalStorage());

    const recentlyViewedProducts = useMemo(
      () => products.filter(p => recentlyViewed.includes(p.id)),
      [products, recentlyViewed]
    );

    // Top Selling: sort by popularity
    const topSelling = useMemo(() => [...products].sort((a, b) => b.sales - a.sales).slice(0, 4), [products]);

    const filteredProducts = products.filter(product =>
        product.name && product.name.toLowerCase().includes(search.toLowerCase())
    );

    const ProductList = ({ products, wishlistItems, handleWishlistToggle, handleAddToCart, handleBuyNow }) => {
      if (!products || products.length === 0) return null;
      return (
        <div className="row">
          {products.map(product => {
            const isInWishlist = wishlistItems.some(item => item.id === product.id);
            return (
              <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 d-flex flex-column justify-content-between" style={{ minHeight: '480px' }}>
                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => handleWishlistToggle(product, e)}
                    className="btn position-absolute"
                    style={{ top: '16px', right: '16px', zIndex: 2, background: 'none', border: 'none' }}
                  >
                    <i className={`ph ph-heart ${isInWishlist ? 'text-danger' : 'text-gray-400'}`}
                      style={{ fontSize: '24px' }} />
                  </button>
                  <Link
                    to={`/product-details-two/${product.id}`}
                    className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                  >
                    <img
                      src={product.image_url || "assets/images/thumbs/product-two-img1.png"}
                      alt={product.name}
                      className="w-100"
                      style={{ maxHeight: 120, objectFit: "contain" }}
                    />
                  </Link>
                  <div className="product-card__content mt-16 flex-grow-1">
                    <h5 className="mb-2 text-truncate" title={product.name}>
                      <Link to={`/product-details-two/${product.id}`} className="link text-line-2">
                        {product.name}
                      </Link>
                    </h5>
                    <div className="fw-bold text-main-600 mb-1">₹{product.price}</div>
                    <p>{product.brand}</p>
                    <p>{product.features}</p>
                  </div>
                  {/* Action Buttons */}
                  <div className="d-flex gap-8 mt-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(product, e);
                      }}
                      className="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium flex-grow-1"
                      type="button"
                    >
                      Select Item <i className="ph ph-shopping-cart" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleBuyNow(product, e);
                      }}
                      className="btn bg-main-two-600 text-white hover-bg-main-two-700 py-11 px-24 rounded-8 flex-center gap-8 fw-medium flex-grow-1"
                      type="button"
                    >
                      Buy Now <i className="ph ph-lightning" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    return (
        <section className="deals pb-80">
            <div className="container container-lg">
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <h2 style={{ fontSize: '2.8rem', fontWeight: 900, color: '#181A1E', letterSpacing: '-1px', textShadow: '0 4px 24px rgba(0,0,0,0.08)', marginBottom: 8, position: 'relative', display: 'inline-block' }}>
                    Our Products
                    <span style={{ display: 'block', height: 4, width: 80, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', borderRadius: 2, margin: '12px auto 0 auto' }}></span>
                  </h2>
                </div>
                {loading ? (
                    <div className="py-5 text-muted w-100 text-center">Loading...</div>
                ) : error ? (
                    <div className="py-5 text-danger w-100 text-center">{error}</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-5 text-muted w-100 text-center">No products to display.</div>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
                      {filteredProducts.map(product => {
                        const isInWishlist = wishlistItems.some(item => item.id === product.id);
                        return (
                          <div key={product.id}
                            style={{ flex: '1 1 340px', maxWidth: 400, minWidth: 320, background: '#fff', borderRadius: 32, boxShadow: '0 8px 32px rgba(60,60,120,0.12)', transition: 'transform 0.18s, box-shadow 0.18s', padding: 40, margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', minHeight: 520 }}
                            onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(60,60,120,0.18)'; }}
                            onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(60,60,120,0.12)'; }}
                            onClick={e => {
                              // Prevent navigation if clicking on a button or link inside the card
                              if (
                                e.target.closest('button') ||
                                e.target.closest('a')
                              ) return;
                              navigate(`/product-details-two/${product.id}`);
                            }}
                          >
                            <div style={{ position: 'relative', width: '100%' }}>
                              <button
                                onClick={(e) => handleWishlistToggle(product, e)}
                                className="btn wishlist-heart-btn"
                                style={{
                                  position: 'absolute',
                                  top: 12,
                                  right: 12,
                                  zIndex: 3,
                                  background: '#fff',
                                  border: '2px solid #e5e7eb',
                                  borderRadius: '50%',
                                  width: 54,
                                  height: 54,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: '0 2px 8px rgba(60,60,120,0.10)',
                                  transition: 'box-shadow 0.18s, border 0.18s',
                                  fontSize: 32,
                                  color: isInWishlist ? '#ef4444' : '#a3a3a3',
                                  outline: 'none',
                                  cursor: 'pointer',
                                }}
                                aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                              >
                                <i className={`ph ph-heart${isInWishlist ? '' : '-straight'}`} style={{ fontSize: 32, color: isInWishlist ? '#ef4444' : '#a3a3a3', transition: 'color 0.18s' }} />
                              </button>
                              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 28 }}>
                                <img src={product.image_url || "assets/images/thumbs/robo-1.png"} alt={product.name} style={{ maxHeight: 220, width: 'auto', borderRadius: 24, background: '#f3f4f6', padding: 12, boxShadow: '0 4px 16px rgba(60,60,120,0.08)' }} />
                              </div>
                            </div>
                            <h5 style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 8, textAlign: 'center' }}>{product.name}</h5>
                            <div style={{ fontWeight: 600, fontSize: 18, color: '#6366f1', marginBottom: 8 }}>₹{product.price}</div>
                            {product.brand && <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>{product.brand}</div>}
                            {product.features && <div style={{ color: '#aaa', fontSize: 14, marginBottom: 8 }}>{product.features}</div>}
                            {product.isNew && <span style={{ background: 'linear-gradient(90deg, #60a5fa 0%, #6366f1 100%)', color: '#fff', borderRadius: 12, padding: '4px 16px', fontWeight: 600, fontSize: 13, marginBottom: 8 }}>New</span>}
                            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                              <button
                                onClick={(e) => handleAddToCart(product, e)}
                                className="btn btn-main rounded-pill px-32 py-10 text-md shadow"
                                style={{ fontWeight: 700, fontSize: 16, background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', border: 'none', color: '#fff', boxShadow: '0 2px 8px rgba(60,60,120,0.10)', transition: 'transform 0.18s' }}
                              >
                                Select Item <i className="ph ph-shopping-cart" />
                              </button>
                              <button
                                onClick={(e) => handleBuyNow(product, e)}
                                className="btn bg-main-two-600 text-white hover-bg-main-two-700 rounded-pill px-32 py-10 text-md shadow"
                                style={{ fontWeight: 700, fontSize: 16, border: 'none', boxShadow: '0 2px 8px rgba(60,60,120,0.10)', transition: 'transform 0.18s' }}
                              >
                                Buy Now <i className="ph ph-lightning" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                        </div>
                )}
            </div>
        </section>
    );
};

export default DealsOne;