<!-- Header -->
<header class="header">
    <div class="container">
        <div class="header-wrapper">
            <div class="logo">
                <a href="{{ route('home') }}">
                    <img src="{{ asset('assets/images/logo.png') }}" alt="MarketPro Logo">
                </a>
            </div>
            <div class="header-right">
                <div class="header-right__item">
                    <a href="{{ route('home') }}" class="header-right__link">
                        <i class="fas fa-home"></i>
                    </a>
                    <span class="header-right__name">Home</span>
                </div>
                <div class="header-right__item">
                    <a href="{{ route('market') }}" class="header-right__link">
                        <i class="fas fa-store"></i>
                    </a>
                    <span class="header-right__name">Market</span>
                </div>
                <div class="header-right__item">
                    <div class="header-right__link-wrapper">
                        <a href="{{ route('wishlist') }}" class="header-right__link">
                            <i class="fas fa-heart"></i>
                        </a>
                        <span class="header-right__count">0</span>
                    </div>
                    <span class="header-right__name">Wishlist</span>
                </div>
                <div class="header-right__item">
                    <div class="header-right__link-wrapper">
                        <a href="{{ route('cart') }}" class="header-right__link">
                            <i class="fas fa-shopping-cart"></i>
                        </a>
                        <span class="header-right__count">0</span>
                    </div>
                    <span class="header-right__name">Cart</span>
                </div>
                <div class="header-right__item">
                    <a href="{{ route('profile') }}" class="header-right__link">
                        <i class="fas fa-user"></i>
                    </a>
                    <span class="header-right__name">Profile</span>
                </div>
            </div>
        </div>
    </div>
</header>

@include('components.success-modal') 