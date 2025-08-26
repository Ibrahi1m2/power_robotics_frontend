import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const HeaderOne = () => {
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
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      try {
        const user = JSON.parse(userRaw);
        if (user && user.name) {
      setIsLoggedIn(true);
      setUserName(user.name);
        }
      } catch {}
    }

    // Throttled scroll handler using rAF to avoid layout thrash/hangs
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldScroll = window.pageYOffset > 150;
          setScroll(prev => (prev !== shouldScroll ? shouldScroll : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initialize select2 only if available and element exists
    let selectElement;
    try {
      if (query && query.fn && typeof query.fn.select2 === 'function') {
        selectElement = query('.js-example-basic-single');
        if (selectElement && selectElement.length) {
    selectElement.select2();
        }
      }
    } catch {}

    return () => {
      window.removeEventListener('scroll', onScroll);
      try {
        if (selectElement && selectElement.length && selectElement.data('select2')) {
          selectElement.select2('destroy');
        }
      } catch {}
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
      <header className='header'>
        <div className='container'>
          <div className='header-wrapper'>
            {/* Logo Start */}
            <div className='logo d-flex align-items-center' style={{ height: '72px' }}>
              <Link to='/' className='link d-flex align-items-center'>
                <img 
                  src={'assets/images/logo/robo-logo.png'} 
                  alt='Power Robotics Logo' 
                  style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </Link>
            </div>
            {/* Logo End */}

            {/* Central Navigation Start */}
            <nav className='main-nav d-none d-lg-flex align-items-center mx-5'>
              <NavLink to='/' className='nav-link mx-3' activeClassName='active'>Home</NavLink>
              <NavLink to='/shop' className='nav-link mx-3' activeClassName='active'>Shop</NavLink>
              <NavLink to='/pages' className='nav-link mx-3' activeClassName='active'>Pages</NavLink>
              <NavLink to='/blog' className='nav-link mx-3' activeClassName='active'>Blog</NavLink>
            </nav>
            {/* Central Navigation End */}

            {/* Search Bar Start */}
            <form className='header-search-form d-none d-lg-flex align-items-center mx-4' style={{ flex: 1, maxWidth: '340px' }} onSubmit={e => e.preventDefault()}>
              <input
                type='text'
                className='form-control rounded-pill px-4 py-2'
                placeholder='Search products...'
                style={{ fontSize: '1rem', border: '1px solid #eee', boxShadow: 'none', width: '100%' }}
              />
              <button type='submit' className='btn btn-main rounded-pill ms-n5' style={{ marginLeft: '-48px', zIndex: 2, padding: '8px 16px', border: 'none' }}>
                <i className='ph ph-magnifying-glass' />
              </button>
            </form>
            {/* Search Bar End */}

            {/* Header Right Start */}
            <div className='header-right'>
              <div className='header-right__item'>
                <Link to='/account' className='header-right__link'>
                  <i className='ph ph-user' />
                </Link>
              </div>
              <div className='header-right__item'>
                <Link to='/wishlist' className='header-right__link position-relative'>
                  <i className='ph ph-heart' />
                  {wishlistCount > 0 && (
                    <span className='position-absolute bg-danger text-white rounded-circle d-flex align-items-center justify-content-center'
                          style={{ top: '-8px', right: '-8px', width: '20px', height: '20px', fontSize: '12px' }}>
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </div>
              <div className='header-right__item'>
                <Link to='/cart' className='header-right__link position-relative'>
                  <i className='ph ph-shopping-cart' />
                  {cartCount > 0 && (
                    <span className='position-absolute bg-danger text-white rounded-circle d-flex align-items-center justify-content-center'
                          style={{ top: '-8px', right: '-8px', width: '20px', height: '20px', fontSize: '12px' }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            {/* Header Right End */}
          </div>
        </div>
      </header>
      {/* ======================= Middle Header Two End ========================= */}
    </>
  );
};

export default HeaderOne;
