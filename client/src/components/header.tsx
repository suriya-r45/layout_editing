import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, LogOut, Search, MapPin, Heart, ShoppingCart, Menu, Phone, Store, Camera, Mic } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Currency, CURRENCY_NAMES } from '@/lib/currency';
import CartButton from '@/components/cart/cart-button';
import MobileMenu from '@/components/mobile-menu';
import logoPath from '@assets/1000284180_1755240849891_1755886428742.jpg';

interface HeaderProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function Header({ selectedCurrency, onCurrencyChange }: HeaderProps) {
  const [location] = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/collections?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="shadow-sm sticky top-0 z-50 border-b border-gray-200" data-testid="header-main" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-2 md:px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Left Section - Mobile Menu & Brand */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
              {/* Hamburger Menu - Mobile Only */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 text-gray-700 hover:bg-gray-50 flex-shrink-0"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Brand with Logo */}
              <Link href="/" className="flex items-center space-x-1 md:space-x-3 min-w-0 flex-1" data-testid="link-home">
                <div className="w-6 h-6 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                  <img 
                    src={logoPath} 
                    alt="Palaniappa Jewellers Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm md:text-2xl font-light text-gray-800 tracking-wide truncate" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>PALANIAPPA JEWELLERS</h1>
                  <p className="text-[10px] md:text-xs text-gray-600 font-light">Since 2025</p>
                </div>
              </Link>
            </div>

            {/* Center Section - Search Bar (Desktop Only) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-4 w-4 text-gray-600" />
                </div>
                <Input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full h-9 pl-10 pr-16 rounded-full bg-white border-gray-300 text-gray-800 placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-sm"
                  data-testid="search-input-header"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  <button className="p-0.5 hover:bg-gray-100 rounded">
                    <Camera className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-0.5 hover:bg-gray-100 rounded">
                    <Mic className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center space-x-1 md:space-x-4 flex-shrink-0">
              {/* Currency Selection */}
              <Select value={selectedCurrency} onValueChange={onCurrencyChange} data-testid="select-currency">
                <SelectTrigger className="bg-transparent border-0 text-gray-800 hover:text-gray-600 p-0 h-auto transition-colors duration-200 w-12 md:w-20">
                  <div className="flex flex-col items-center cursor-pointer w-full">
                    <span className="text-[7px] md:text-xs whitespace-nowrap mb-0.5">Country</span>
                    <div className="text-center text-[8px] md:text-xs font-medium">
                      <SelectValue />
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR" data-testid="option-inr">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 rounded-sm" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="8" fill="#FF9933"/>
                        <rect y="8" width="24" height="8" fill="#FFFFFF"/>
                        <rect y="16" width="24" height="8" fill="#138808"/>
                        <circle cx="12" cy="12" r="3" fill="#000080"/>
                      </svg>
                      <span>₹ INR</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="BHD" data-testid="option-bhd">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 rounded-sm" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="12" fill="#FFFFFF"/>
                        <rect y="12" width="24" height="12" fill="#CE1126"/>
                        <path d="M0 0 L8 6 L0 12 V8 L4 6 L0 4 Z" fill="#CE1126"/>
                      </svg>
                      <span>BD BHD</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Login/Profile */}
              <div className="flex flex-col items-center">
                {user ? (
                  <div className="flex items-center space-x-1">
                    {isAdmin && (
                      <Link href="/admin">
                        <Button variant="ghost" size="sm" className="text-gray-800 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 px-1 md:px-2 py-1" data-testid="button-admin-dashboard">
                          <span className="text-[10px] md:text-xs">Dashboard</span>
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="p-1 md:p-2 text-gray-800 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                      data-testid="button-logout"
                    >
                      <LogOut className="h-4 w-4 md:h-6 md:w-6" />
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <button className="p-1 md:p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <User className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
                    </button>
                  </Link>
                )}
              </div>

              {/* Wishlist Heart */}
              <button className="p-1 md:p-2 hover:bg-gray-50 rounded-lg">
                <Heart className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
              </button>

              {/* Cart with Badge */}
              <div className="relative">
                <CartButton />
              </div>
            </div>
          </div>

          {/* Search Bar Row - Only for tablets, hidden on desktop and mobile */}
          <div className="hidden md:block lg:hidden pb-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-600" />
                </div>
                <Input
                  type="text"
                  placeholder="Search for Gold Jewellery, Diamond Je..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full h-12 pl-12 pr-20 rounded-full bg-white border-gray-300 text-gray-800 placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
                  data-testid="search-input"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Camera className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Mic className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Only shown on mobile */}
          <div className="md:hidden pb-2">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-4 w-4 text-gray-600" />
              </div>
              <Input
                type="text"
                placeholder="Search for Gold Jewellery, Diamond Je..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="w-full h-9 pl-10 pr-16 rounded-full bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-600 focus:bg-white focus:ring-2 focus:ring-gray-300 focus:border-gray-400 text-sm"
                data-testid="search-input-mobile"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button className="p-0.5 hover:bg-gray-100 rounded">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
                <button className="p-0.5 hover:bg-gray-100 rounded">
                  <Mic className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
    </>
  );
}
