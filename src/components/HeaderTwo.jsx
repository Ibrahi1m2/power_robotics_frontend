import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const HeaderTwo = ({ category, search, setSearch }) => {
  const [scroll, setScroll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const { cartCount, wishlistCount } = useCart();

  // Set the default language
  const [selectedLanguage, setSelectedLanguage] = useState("Eng");
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  // Set the default currency
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.name);
    }

    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
    const selectElement = query(".js-example-basic-single");
    selectElement.select2();

    return () => {
      if (selectElement.data("select2")) {
        selectElement.select2("destroy");
      }
    };
  }, []);

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Searching for:", search);
  };

  return (
    <>
      <div className='overlay' />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/* ==================== Search Box Start Here ==================== */}

      <form action='#' className={`search-box ${activeSearch && "active"}`}>
        <button
          onClick={handleSearchToggle}
          type='button'
          className='search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1'
        >
          <i className='ph ph-x' />
        </button>
        <div className='container'>
          <div className='position-relative'>
            <input
              type='text'
              className='form-control py-16 px-24 text-xl rounded-pill pe-64'
              placeholder='Search for a product or brand'
            />
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type='button'
          className='close-button'
        >
          <i className='ph ph-x' />{" "}
        </button>
        <div className='mobile-menu__inner'>
          <div className='mobile-menu__menu'>
            {/* Nav Menu Start */}
            <ul className='nav-menu flex-align nav-menu--mobile'>
              {/* Removed old Contact Us link */}
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      {/* ======================= Middle Header Two Start ========================= */}
      <header className="header-two-modern" style={{ width: '100%', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 16px rgba(60,60,120,0.08)', position: 'sticky', top: 0, zIndex: 100, padding: '0 16px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', minHeight: '64px', gap: '16px', padding: '8px 0' }}>
          {/* Logo */}
          <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', height: '100%' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <img 
                src="/assets/images/logo/robo-logo.png" 
                alt="Robot Logo" 
                style={{ 
                  height: '48px', 
                  width: 'auto', 
                  objectFit: 'contain', 
                  padding: '8px', 
                  background: '#fff', 
                  borderRadius: '12px',
                  maxWidth: '120px'
                }} 
              />
            </a>
          </div>
          {/* Search Bar - Hidden on mobile */}
          <div style={{ 
            flex: 1, 
            display: 'none', 
            justifyContent: 'center', 
            alignItems: 'center',
            '@media (min-width: 768px)': {
              display: 'flex'
            }
          }}>
            <form 
              onSubmit={handleSearchSubmit} 
              style={{ 
                width: '100%', 
                maxWidth: '420px', 
                background: 'rgba(243,244,246,0.95)', 
                borderRadius: '32px', 
                boxShadow: '0 2px 8px rgba(60,60,120,0.04)', 
                display: 'flex', 
                alignItems: 'center', 
                padding: '0 18px', 
                height: '40px', 
                border: '1px solid #e5e7eb' 
              }}
            >
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ 
                  flex: 1, 
                  border: 'none', 
                  outline: 'none', 
                  background: 'transparent', 
                  fontSize: '14px', 
                  color: '#222', 
                  padding: '0 8px' 
                }}
              />
              <button 
                type="submit" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  outline: 'none', 
                  cursor: 'pointer', 
                  color: '#6366f1', 
                  fontSize: '20px', 
                  marginLeft: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px'
                }}
              >
                <i className="ph ph-magnifying-glass" />
              </button>
            </form>
          </div>
          
          {/* Icons */}
          <div style={{ 
            flex: '0 0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            '@media (min-width: 768px)': {
              gap: '24px'
            }
          }}>
            {/* Mobile Search Toggle */}
            <button 
              onClick={handleSearchToggle}
              style={{ 
                color: '#6366f1', 
                fontSize: '24px', 
                padding: '8px', 
                borderRadius: '12px', 
                transition: 'background 0.2s',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '@media (min-width: 768px)': {
                  display: 'none'
                }
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              <i className="ph ph-magnifying-glass" />
            </button>
            
            {/* Wishlist */}
            <a 
              href="/wishlist" 
              style={{ 
                color: '#6366f1', 
                fontSize: '24px', 
                padding: '8px', 
                borderRadius: '12px', 
                transition: 'background 0.2s',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px'
              }} 
              onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              <i className="ph ph-heart" />
              {wishlistCount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '2px', 
                  right: '2px', 
                  background: '#ef4444', 
                  color: '#fff', 
                  borderRadius: '50%', 
                  minWidth: '18px', 
                  height: '18px', 
                  fontSize: '11px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  padding: '0 4px', 
                  boxShadow: '0 2px 8px rgba(60,60,120,0.10)' 
                }}>
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </a>
            
            {/* Cart */}
            <a 
              href="/cart" 
              style={{ 
                color: '#6366f1', 
                fontSize: '24px', 
                padding: '8px', 
                borderRadius: '12px', 
                transition: 'background 0.2s', 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px'
              }} 
              onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              <i className="ph ph-shopping-cart" />
              {cartCount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '2px', 
                  right: '2px', 
                  background: '#6366f1', 
                  color: '#fff', 
                  borderRadius: '50%', 
                  minWidth: '18px', 
                  height: '18px', 
                  fontSize: '11px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700, 
                  padding: '0 4px', 
                  boxShadow: '0 2px 8px rgba(60,60,120,0.10)' 
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </a>
            
            {/* Account */}
            <a 
              href="/account" 
              style={{ 
                color: '#6366f1', 
                fontSize: '24px', 
                padding: '8px', 
                borderRadius: '12px', 
                transition: 'background 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                marginRight: '-8px',
                '@media (min-width: 768px)': {
                  marginRight: '0'
                }
              }} 
              onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              <i className="ph ph-user" />
            </a>
          </div>
        </div>
      </header>
      {/* ======================= Middle Header Two End ========================= */}
    </>
  );
};

export default HeaderTwo;
