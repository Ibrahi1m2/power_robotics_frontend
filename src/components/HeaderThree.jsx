import React, { useEffect, useState } from "react";
import query from "jquery";
import { Link, NavLink } from "react-router-dom";

const HeaderThree = () => {
  const [scroll, setScroll] = useState(false);

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

  return (
    <>
      {/*==================== Overlay Start ====================*/}
      <div className='overlay' />
      {/*==================== Overlay End ====================*/}
      {/*==================== Sidebar Overlay End ====================*/}
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      {/*==================== Sidebar Overlay End ====================*/}

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
            <button
              type='submit'
              className='w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'
            >
              <i className='ph ph-magnifying-glass' />
            </button>
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      {/* ==================== Mobile Menu Start Here  ==================== done */}
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
            <div className='logo'>
              <Link to='/' className='link'>
                <img 
                  src='/assets/images/logo/robo-logo.png' 
                  alt='MarketPro Logo' 
                  className='w-100 h-100 object-contain' 
                />
              </Link>
            </div>
            {/* Logo End */}

            {/* Header Right Start */}
            <div className='header-right'>
              <div className='header-right__item'>
                <Link to='/account' className='header-right__link'>
                  <i className='ph ph-user' />
                </Link>
              </div>
              <div className='header-right__item'>
                <Link to='/wishlist' className='header-right__link'>
                  <i className='ph ph-heart' />
                </Link>
              </div>
              <div className='header-right__item'>
                <Link to='/cart' className='header-right__link'>
                  <i className='ph ph-shopping-cart' />
                </Link>
              </div>
              {/* Removed contact icon */}
              <div className='header-right__item'>
                <div className='on-hover-item has-submenu arrow-white'>
                  <Link to='#' className='header-right__link'>
                    <i className='ph ph-globe' />
                  </Link>
                  <ul className='selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleLanguageChange("English")}>
                        <img src='assets/images/thumbs/flag1.png' alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        English
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleLanguageChange("Japan")}>
                        <img src='assets/images/thumbs/flag2.png' alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        Japan
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleLanguageChange("French")}>
                        <img src='assets/images/thumbs/flag3.png' alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        French
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleLanguageChange("Germany")}>
                        <img src='assets/images/thumbs/flag4.png' alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        Germany
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleLanguageChange("Spanish")}>
                        <img src='assets/images/thumbs/flag5.png' alt='' className='w-16 h-12 rounded-4 border border-gray-100' />
                        Spanish
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='header-right__item'>
                <div className='on-hover-item has-submenu arrow-white'>
                  <Link to='#' className='header-right__link'>
                    <i className='ph ph-currency-dollar' />
                  </Link>
                  <ul className='selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleCurrencyChange("USD")}>
                        USD
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleCurrencyChange("EUR")}>
                        EUR
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleCurrencyChange("GBP")}>
                        GBP
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleCurrencyChange("JPY")}>
                        JPY
                      </Link>
                    </li>
                    <li>
                      <Link to='#' className='hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0' onClick={() => handleCurrencyChange("CAD")}>
                        CAD
                      </Link>
                    </li>
                  </ul>
                </div>
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

export default HeaderThree;
