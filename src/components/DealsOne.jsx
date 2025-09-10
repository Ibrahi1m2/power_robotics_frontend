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
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 20
    });
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
                
                const page = pagination.currentPage;
                const limit = pagination.itemsPerPage;
                
                // Try multiple API endpoints with pagination
                const endpoints = [
                    `${process.env.REACT_APP_API_BASE_URL}/api/products?page=${page}&limit=${limit}`,
                    `/api/products?page=${page}&limit=${limit}`,
                    "/api/deal-of-the-week" // Keep as fallback without pagination
                ];
                
                let data = null;
                let lastError = null;
                let paginationData = null;
                
                for (const endpoint of endpoints) {
                    try {
                        const response = await fetch(endpoint);
                        if (response.ok) {
                            const result = await response.json();
                            // Check if response has pagination data (new API format)
                            if (result.data && result.pagination) {
                                data = result.data;
                                paginationData = result.pagination;
                            } else {
                                // Fallback for non-paginated endpoints
                                data = Array.isArray(result) ? result : [];
                                // If we got data but no pagination, assume it's the deal-of-the-week endpoint
                                if (data.length > 0 && endpoint.includes('deal-of-the-week')) {
                                    // For deal of the week, we'll show all items without pagination
                                    setPagination(prev => ({
                                        ...prev,
                                        currentPage: 1,
                                        totalPages: 1,
                                        totalItems: data.length
                                    }));
                                }
                            }
                            break;
                        }
                    } catch (err) {
                        lastError = err;
                        continue;
                    }
                }
                
                if (data && Array.isArray(data)) {
                    setProducts(data);
                    
                    // Update pagination if we got pagination data
                    if (paginationData) {
                        setPagination(prev => ({
                            ...prev,
                            totalPages: paginationData.totalPages,
                            totalItems: paginationData.total,
                            currentPage: paginationData.page
                        }));
                    }
                } else {
                    // Use fallback data when API is not available
                    console.warn('API not available, using fallback products');
                    setProducts(fallbackProducts);
                    setPagination(prev => ({
                        ...prev,
                        totalPages: Math.ceil(fallbackProducts.length / prev.itemsPerPage),
                        totalItems: fallbackProducts.length
                    }));
                }
                
                setLoading(false);
            } catch (err) {
                console.warn('Failed to fetch products, using fallback data:', err.message);
                setProducts(fallbackProducts);
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [pagination.currentPage]);
    
    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPagination(prev => ({
                ...prev,
                currentPage: newPage
            }));
            // Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    // Pagination component
    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        // Show at most 5 page numbers at a time
        const getPageNumbers = () => {
            // If there's only one page, just return [1]
            if (totalPages === 1) return [1];
            
            const pages = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            // Always show first page if not already included
            if (startPage > 1) {
                pages.push(1);
                if (startPage > 2) {
                    pages.push('...');
                }
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            
            // Always show last page if not already included
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push('...');
                }
                pages.push(totalPages);
            }
            
            return pages;
        };
        
        // Always show pagination controls, even for a single page
        
        const buttonStyle = {
            borderColor: 'rgb(96, 165, 250)',
            color: 'rgb(96, 165, 250)',
            marginRight: '8px',
            marginBottom: '8px',
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid',
            background: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out'
        };
        
        const activeButtonStyle = {
            ...buttonStyle,
            background: 'rgb(96, 165, 250)',
            color: 'white',
            borderColor: 'rgb(96, 165, 250)'
        };
        
        const disabledButtonStyle = {
            ...buttonStyle,
            opacity: 0.5,
            cursor: 'not-allowed'
        };

        return (
            <div className="d-flex justify-content-center mt-4 flex-wrap" style={{ alignItems: 'center' }}>
                <button 
                    style={currentPage === 1 ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                <button 
                    style={currentPage === 1 ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>
                
                {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                        <span key={`ellipsis-${index}`} style={{ padding: '0 8px', margin: '0 4px' }}>...</span>
                    ) : (
                        <button
                            key={page}
                            style={currentPage === page ? activeButtonStyle : buttonStyle}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                ))}
                
                <button 
                    style={currentPage === totalPages ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    ›
                </button>
                <button 
                    style={currentPage === totalPages ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle}
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
                
                <div style={{ marginLeft: '16px', color: '#6c757d', fontSize: '0.9rem' }}>
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        );
    };

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
        product && product.name && product.name.toLowerCase().includes(search.toLowerCase())
    );
    
    // If no search results, show a message
    const noResults = search && filteredProducts.length === 0;

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
                ) : noResults ? (
                    <div className="py-5 text-muted w-100 text-center">No products found matching "{search}"</div>
                ) : (
                    <>
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
                    
                    {/* Always show pagination controls */}
                    <div className="mt-5">
                        <Pagination 
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default DealsOne;