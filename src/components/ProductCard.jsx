import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, showWishlist = true }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
      <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
        {showWishlist && (
          <button
            onClick={handleWishlistToggle}
            className="btn position-absolute"
            style={{ top: '16px', right: '16px', zIndex: 2, background: 'none', border: 'none' }}
          >
            <i className={`ph ph-heart ${isInWishlist ? 'text-danger' : 'text-gray-400'}`} 
               style={{ fontSize: '24px' }} />
          </button>
        )}
        <button
          onClick={handleAddToCart}
          className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
        >
          Add <i className="ph ph-shopping-cart" />
        </button>
        <Link
          to="/product-details"
          className="product-card__thumb flex-center"
        >
          <img src={product.image_url} alt={product.name} />
        </Link>
        <div className="product-card__content mt-12">
          <div className="flex-align gap-6">
            <span className="text-xs fw-bold text-gray-500">{product.rating}</span>
            <span className="text-15 fw-bold text-warning-600 d-flex">
              <i className="ph-fill ph-star" />
            </span>
            <span className="text-xs fw-bold text-gray-500">({product.reviews})</span>
          </div>
          <h6 className="title text-lg fw-semibold mt-12 mb-8">
            <Link to="/product-details" className="link text-line-2">
              {product.name}
            </Link>
          </h6>
          <div className="flex-align gap-4">
            <span className="text-main-600 text-md d-flex">
              <i className="ph-fill ph-storefront" />
            </span>
            <span className="text-gray-500 text-xs">
              By {product.store}
            </span>
          </div>
          <div className="flex-between gap-8 mt-24 flex-wrap">
            <div className="product-card__price">
              <span className="text-gray-400 text-md fw-semibold text-decoration-line-through d-block">
                ${product.originalPrice}
              </span>
              <span className="text-heading text-md fw-semibold ">
                ${product.price} <span className="text-gray-500 fw-normal">/Qty</span>{" "}
              </span>
            </div>
            <div className="flex-align gap-8">
              <button
                onClick={handleAddToCart}
                className="product-card__cart btn btn-main py-11 px-24 rounded-pill flex-align gap-8"
              >
                Add <i className="ph ph-shopping-cart" />
              </button>
              <Link
                to="/checkout"
                className="product-card__buy-now btn bg-main-two-600 text-white hover-bg-main-two-700 py-11 px-24 rounded-pill flex-align gap-8"
              >
                Buy Now <i className="ph ph-lightning" />
              </Link>
            </div>
          </div>
          <div className="mt-12">
            <div
              className="progress w-100 bg-color-three rounded-pill h-4"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow={product.sold}
              aria-valuemin={0}
              aria-valuemax={product.total}
            >
              <div
                className="progress-bar bg-main-600 rounded-pill"
                style={{ width: `${(product.sold / product.total) * 100}%` }}
              />
            </div>
            <span className="text-gray-900 text-xs fw-medium mt-8">
              Sold: {product.sold}/{product.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 