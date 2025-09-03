import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ProductCard from '@/components/product-card';
import ProductFilters from '@/components/product-filters';
import WhatsAppFloat from '@/components/whatsapp-float';
import { Button } from '@/components/ui/button';
import { Product, HomeSection, HomeSectionItem } from '@shared/schema';
import { Currency } from '@/lib/currency';
import { ProductFilters as IProductFilters } from '@shared/cart-schema';
import { MetalRatesTicker } from '@/components/metal-rates-ticker';
import { ArrowRight, Star, Sparkles, Crown, Gem, Heart, Watch, Users, Baby, Palette, Wrench } from "lucide-react";
import ringsImage from '@assets/new_rings.png';

interface HomeSectionWithItems extends HomeSection {
  items: HomeSectionItemWithProduct[];
}

interface HomeSectionItemWithProduct extends HomeSectionItem {
  product: Product;
}
import pendantsImage from '@assets/new_pendants.png';
import earringsImage from '@assets/new_earrings.png';
import braceletsImage from '@assets/bracelets_hero.png';
import necklacesImage from '@assets/necklaces_hero.png';
import chainsImage from '@assets/chains_hero.png';
import banglesImage from '@assets/bangles_hero_new.png';
import ringsImageMosaic from '@assets/rings_luxury.png';
import watchesImage from '@assets/watches_luxury_new.png';
import mensJewelryImage from '@assets/mens_jewelry_luxury_new.png';
import childrenJewelryImage from '@assets/children_jewelry_luxury_new.png';
import customJewelryImage from '@assets/custom_jewelry_luxury_new.png';
import collectionsImage from '@assets/collections_luxury_new.png';
import goldCollectionImage from '@assets/gold_collection_luxury.png';
import silverCollectionImage from '@assets/silver_collection_luxury.png';
import diamondCollectionImage from '@assets/diamond_collection_luxury_new.png';
import mangalsutraImage from '@assets/mangalsutra_new.png';
import noseJewelryImage from '@assets/nosepins_new.png';
import ankletsImage from '@assets/anklets_new.png';
import broochesImage from '@assets/brooches_new.png';
import bridalCollectionsImage from '@assets/bridal_new.png';
import newArrivalsBackground from '@assets/image_1756713608055.png';
import newArrivalsBackgroundNew from '@assets/new_arrivals_bg.png';

// Separate component for auto-scrolling categories to avoid React hooks rule violations
function CategoriesScrollSection({ categories, handleViewAllClick }: { categories: any[]; handleViewAllClick: (key: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft) {
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 200px
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScroll, 3000); // Auto-scroll every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-4 pb-0" data-testid="section-categories" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <div className="px-2 md:px-6 lg:px-8">
        {/* Horizontally Scrollable Categories */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-4 lg:gap-6 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {categories.map((category, index) => (
            <div 
              key={category.key}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer hover:transform hover:scale-105 transition-all duration-200"
              onClick={() => handleViewAllClick(category.key)}
              data-testid={`category-card-${category.key}`}
            >
              {/* Category Image */}
              <div 
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full shadow-lg overflow-hidden mb-1.5 md:mb-2 bg-gradient-to-br from-white to-gray-50"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Category Name */}
              <h3 
                className="text-[9px] md:text-xs lg:text-sm font-light text-center leading-tight text-gray-700 px-0.5 w-20 md:w-24 lg:w-28 min-h-[28px] md:min-h-[32px] flex items-center justify-center"
              >
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for festival auto-scrolling 1x4 grid layout
function FestivalScrollSection({ items, selectedCurrency, handleViewAllClick }: { items: any[]; selectedCurrency: Currency; handleViewAllClick: (category: string) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;

    const autoScroll = () => {
      // Don't auto-scroll if user is manually scrolling
      if (isUserScrolling) return;
      
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Enhanced mobile scrolling - scroll by single product width for smoother transition
      const isMobile = window.innerWidth < 768;
      const scrollDistance = isMobile ? scrollContainer.clientWidth / 4 : scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft - 10) { // Small buffer to handle rounding
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by calculated distance
        scrollContainer.scrollBy({ left: scrollDistance, behavior: 'smooth' });
      }
    };

    // Enhanced user scroll detection
    let scrollDetectionTimeout: NodeJS.Timeout;
    const handleUserScroll = () => {
      setIsUserScrolling(true);
      
      // Clear existing timeouts
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollDetectionTimeout) {
        clearTimeout(scrollDetectionTimeout);
      }
      
      // Use shorter timeout for mobile to detect scroll end more accurately
      const isMobile = window.innerWidth < 768;
      const timeoutDelay = isMobile ? 1500 : 3000;
      
      scrollDetectionTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 150); // Quick detection of scroll end
      
      // Resume auto-scroll after longer delay
      userScrollTimeoutRef.current = setTimeout(() => {
        setIsUserScrolling(false);
      }, timeoutDelay);
    };

    // Enhanced touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsUserScrolling(true);
      // Prevent momentum scrolling interference
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Clear existing timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      
      // Resume auto-scroll after brief delay for mobile
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 2000);
    };

    // Enhanced mobile touch handling
    const handleTouchMove = () => {
      setIsUserScrolling(true);
    };

    // Auto-scroll interval - faster for mobile for better UX
    const isMobile = window.innerWidth < 768;
    const intervalDelay = isMobile ? 3000 : 4000;
    const interval = setInterval(autoScroll, intervalDelay);
    
    // Add event listeners with passive option for better mobile performance
    scrollContainer.addEventListener('scroll', handleUserScroll, { passive: true });
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      clearInterval(interval);
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (scrollDetectionTimeout) {
        clearTimeout(scrollDetectionTimeout);
      }
      scrollContainer.removeEventListener('scroll', handleUserScroll);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isUserScrolling]);

  return (
    <div className="relative z-10">
      {items.length > 0 ? (
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 md:gap-3 pb-2"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            scrollBehavior: 'smooth'
          }}
        >
          {/* Create groups of 4 products */}
          {Array.from({ length: Math.ceil(items.length / 4) }, (_, groupIndex) => (
            <div key={groupIndex} className="flex-shrink-0 grid grid-cols-4 gap-2 md:gap-3 w-full">
              {items.slice(groupIndex * 4, (groupIndex + 1) * 4).map((item, index) => (
            <div 
              key={item.id}
                className="w-full group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleViewAllClick(item.product.category)}
            >
                <div className="bg-white/20 md:bg-white/95 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 md:border-white/50 h-full">
                  {/* Product Image */}
                  <div className="aspect-square mb-1.5 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-pink-50">
                    <img
                      src={item.product.images?.[0] || ringsImage}
                      alt={item.product.name}
                      className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5 mb-1">
                      <span className="text-amber-500 text-xs">₹</span>
                      <span className="text-xs md:text-sm font-semibold text-gray-800">
                        {item.product.priceInr?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-600 font-medium line-clamp-2">
                      {item.product.name}
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full bg-white/20 md:bg-white/95 backdrop-blur-sm rounded-lg p-1.5 md:p-2 shadow-lg border border-white/30 md:border-white/50">
              <div className="aspect-square mb-1.5 overflow-hidden rounded-md bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-gray-400 text-xs">No Image</div>
              </div>
              <div className="text-center">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Separate component for New Arrivals layout to avoid React hooks rule violations
function NewArrivalsSection({ section, selectedCurrency }: { section: HomeSectionWithItems; selectedCurrency: Currency }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const autoScroll = () => {
      const currentScrollLeft = scrollContainer.scrollLeft;
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (currentScrollLeft >= maxScrollLeft) {
        // Reset to start if at the end
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Scroll right by 300px
        scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    const interval = setInterval(autoScroll, 2000); // Auto-scroll every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="py-12" 
      data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
      style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.title || 'New Arrivals'}
          </h2>
          <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
          </p>
        </div>
        
        {/* Promotional Image with Overlay Button */}
        <div className="mb-8 relative">
          <img 
            src={newArrivalsBackgroundNew} 
            alt="New Arrivals - Ganesh Chaturthi Offer" 
            className="w-full h-auto max-w-none rounded-lg shadow-lg"
            style={{ minHeight: 'auto', objectFit: 'contain' }}
          />
          
          {/* Overlay Button */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button 
              className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200 shadow-lg" 
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              onClick={() => window.location.href = '/collections?category=new-arrivals'}
            >
              View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('BHD');

  // Listen for product addition events to auto-refresh homepage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'homepage-refresh') {
        // Refetch data when a product is added
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle "View All" button clicks - navigate to collections page
  const handleViewAllClick = (material: string) => {
    const materialPath = material.toLowerCase();
    window.location.href = `/collections/${materialPath}`;
  };

  // Category carousel data
  const categories = [
    { name: 'Rings', image: ringsImage, key: 'rings' },
    { name: 'Earrings', image: earringsImage, key: 'earrings' },
    { name: 'Pendants', image: pendantsImage, key: 'pendants' },
    { name: 'Necklaces', image: necklacesImage, key: 'necklaces' },
    { name: 'Bangles & Bracelets', image: banglesImage, key: 'bangles' },
    { name: 'Chains', image: chainsImage, key: 'chains' },
    { name: 'Bracelets', image: braceletsImage, key: 'bracelets' },
    { name: 'Nosepins', image: noseJewelryImage, key: 'nose-jewelry' },
    { name: 'Watches', image: watchesImage, key: 'watches' },
    { name: "Men's Jewelry", image: mensJewelryImage, key: 'mens' },
    { name: "Children's Jewelry", image: childrenJewelryImage, key: 'children' },
    { name: 'Custom Jewelry', image: customJewelryImage, key: 'custom' },
    { name: 'Collections', image: collectionsImage, key: 'collections' },
    { name: 'Gold Collection', image: goldCollectionImage, key: 'gold' },
    { name: 'Silver Collection', image: silverCollectionImage, key: 'silver' },
    { name: 'Diamond Collection', image: diamondCollectionImage, key: 'diamond' },
    { name: 'Mangalsutra', image: mangalsutraImage, key: 'mangalsutra' },
    { name: 'Anklets & Toe Rings', image: ankletsImage, key: 'anklets' },
    { name: 'Brooches & Pins', image: broochesImage, key: 'brooches' },
    { name: 'Bridal Collections', image: bridalCollectionsImage, key: 'bridal-collections' }
  ];


  // Fetch all products for display
  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Fetch custom home sections
  const { data: homeSections = [] } = useQuery<HomeSectionWithItems[]>({
    queryKey: ['/api/home-sections/public'],
    queryFn: async () => {
      const response = await fetch('/api/home-sections/public');
      if (!response.ok) throw new Error('Failed to fetch home sections');
      const data = await response.json();
      return data;
    },
    staleTime: 0, // Always fetch fresh data
    refetchOnWindowFocus: true, // Refetch when user focuses the window
    refetchInterval: 2000, // Auto-refetch every 2 seconds to catch admin updates
  });

  // Simple filtering for home page (not used directly but keeps type consistency)
  const filteredProducts = useMemo(() => {
    return allProducts.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }, [allProducts]);

  // Category counts for display
  const getCategoryCount = (category: string) => {
    return allProducts.filter(product => {
      // Don't exclude new arrivals - they should be counted in their respective categories too
      // Map display category names to database category names (handle both cases)
      const categoryMapping: { [key: string]: string } = {
        'rings': 'rings',
        'necklaces': 'necklaces', 
        'pendants': 'pendants',
        'earrings': 'earrings',
        'bracelets': 'bracelets',
        'bangles': 'bangles',
        'watches': 'watches',
        'mens_jewellery': 'mens_jewellery',
        'mens': 'mens_jewellery',
        'children_jewellery': 'children_jewellery',
        'children': 'children_jewellery',
        'materials': 'materials',
        'collections': 'collections',
        'custom_jewellery': 'custom_jewellery',
        'custom': 'custom_jewellery',
        'new_arrivals': 'new_arrivals',
        'anklets': 'anklets & toe rings' // Handle compound category names
      };
      const mappedCategory = categoryMapping[category.toLowerCase()] || category.toLowerCase();
      return product.category.toLowerCase() === mappedCategory.toLowerCase();
    }).length;
  };

  const getMaterialCount = (material: string) => {
    return allProducts.filter(product => {
      // Don't exclude new arrivals - they should be counted in their material categories too
      // Use metalType field for broad material categorization instead of material field
      return product.metalType === material;
    }).length;
  };

  // Material-based collections
  const goldProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'GOLD' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  const silverProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'SILVER' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  const diamondProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'DIAMOND' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Platinum Products
  const platinumProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'PLATINUM' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Gemstone Products  
  const gemstoneProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'GEMSTONE' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Pearl Products
  const pearlProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'PEARL' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // Gold Plated Silver Products
  const goldPlatedSilverProducts = useMemo(() => 
    allProducts.filter(product => 
      product.material?.includes('GOLD_PLATED_SILVER') && !product.isNewArrival
    ).slice(0, 8), 
    [allProducts]
  );

  // Other Products
  const otherProducts = useMemo(() => 
    allProducts.filter(product => product.metalType === 'OTHER' && !product.isNewArrival).slice(0, 8), 
    [allProducts]
  );

  // New Arrivals - Products specifically marked as new arrivals
  const newArrivalProducts = useMemo(() => {    
    return allProducts
      .filter(product => product.isNewArrival) // Only products explicitly marked as new arrivals
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 9);
  }, [allProducts]);

  // Layout classes for home sections
  const getLayoutClasses = (layoutType: string, itemCount: number) => {
    switch (layoutType) {
      case 'featured':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'mixed':
        return 'grid-cols-3 md:grid-cols-3 lg:grid-cols-4';
      case 'split':
        return 'grid-cols-1 md:grid-cols-2 gap-0'; // Split layout uses flex instead
      default:
        return 'grid-cols-3 md:grid-cols-3 lg:grid-cols-4';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1';
      case 'large':
        return 'col-span-2 row-span-2';
      default:
        return 'col-span-1';
    }
  };

  return (
    <div className="min-h-screen" data-testid="page-home" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
      <MetalRatesTicker />
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      {/* Hero Section - Find Your Perfect Match */}
      <section className="py-8 md:py-12" data-testid="section-hero" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
        <div className="px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Find Your Perfect Match
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-6">
            Shop by Categories
          </p>
        </div>
      </section>

      {/* Categories Horizontal Scroll */}
      <CategoriesScrollSection categories={categories} handleViewAllClick={handleViewAllClick} />

      {/* Section Divider - hidden for festival sections */}
      {homeSections.length > 0 && !homeSections.some(s => s.layoutType === 'festival') && (
        <div className="w-full border-t border-gray-200 my-8"></div>
      )}

      {/* Custom Admin Sections */}
      {homeSections.length > 0 && homeSections.map((section) => {
        if (section.items.length === 0) return null;
        
        // Split layout rendering - Elegant Design matching reference image
        if (section.layoutType === 'split') {
          return (
            <section 
              key={section.id} 
              className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                backgroundImage: `url(${newArrivalsBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Section Header */}
              <div className="relative z-20 text-left mb-8 md:mb-16 max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title || 'New Arrivals'}
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <span className="text-amber-600">✦</span>
                    <span>500+ New Items</span>
                  </div>
                </div>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
                </p>
              </div>
              
              {/* Split Layout Container */}
              <div className="relative z-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                  
                  {/* Left Half - First Category */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
                    onClick={() => handleViewAllClick(section.items[0]?.product?.category || 'mangalsutra')}
                  >
                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                      {/* Category Image */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={section.items[0]?.product?.images?.[0] || mangalsutraImage}
                            alt={section.items[0]?.product?.name || 'Mangalsutra'}
                            className="max-w-full h-40 md:h-56 object-contain filter drop-shadow-lg transform transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                  {/* Right Half - Second Category */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[300px] md:min-h-[400px] overflow-hidden rounded-2xl md:rounded-3xl"
                    onClick={() => handleViewAllClick(section.items[1]?.product?.category || 'pendants')}
                  >
                    {/* Content Container */}
                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-center">
                      {/* Category Image */}
                      <div className="flex items-center justify-center">
                        <div className="relative">
                          <img
                            src={section.items[1]?.product?.images?.[0] || pendantsImage}
                            alt={section.items[1]?.product?.name || 'Pendants'}
                            className="max-w-full h-40 md:h-56 object-contain filter drop-shadow-lg transform transition-all duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                </div>
                
                {/* Bottom Section Titles - Compact and Small */}
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
                  {/* Left Category Title - Blue */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewAllClick(section.items[0]?.product?.category || 'mangalsutra')}
                  >
                    <div 
                      className="rounded-lg py-2 px-4"
                      style={{ 
                        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 50%, #2A5F94 100%)',
                      }}
                    >
                      <h3 className="text-sm md:text-base font-light text-white text-center tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.items[0]?.product?.category || 'Bracelets'}
                      </h3>
                    </div>
                  </div>

                  {/* Right Category Title - Dark */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleViewAllClick(section.items[1]?.product?.category || 'pendants')}
                  >
                    <div 
                      className="rounded-lg py-2 px-4"
                      style={{ 
                        background: 'linear-gradient(135deg, #2D3748 0%, #1A202C 50%, #171923 100%)',
                      }}
                    >
                      <h3 className="text-sm md:text-base font-light text-white text-center tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.items[1]?.product?.category || 'Nose Jewellery'}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Carousel layout rendering - Elegant horizontal sliding showcase
        if (section.layoutType === 'carousel') {
          return (
            <section 
              key={section.id} 
              className="py-16 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                  )}
                </div>
                
                {/* Horizontal Scrolling Carousel */}
                <div className="relative">
                  <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {section.items.map((item, index) => (
                      <div key={item.id} className="flex-none w-72 md:w-80">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-200/30 to-amber-400/20 rounded-2xl transform rotate-1 transition-transform group-hover:rotate-2"></div>
                          <div className="relative bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-2">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Scroll Indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {section.items.map((_, index) => (
                      <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Mosaic layout rendering - Sophisticated Luxury Gallery
        if (section.layoutType === 'mosaic') {
          return (
            <section 
              key={section.id} 
              className="relative min-h-screen bg-gradient-to-br from-stone-50 via-white to-neutral-50 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Elegant Background Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-amber-200/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-neutral-100/30 to-stone-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-r from-amber-50/40 to-transparent rounded-full blur-2xl"></div>
              </div>

              <div className="relative py-20 md:py-32">
                {/* Luxury Header */}
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="text-center mb-20">
                    {/* Premium Brand Badge */}
                    <div className="mb-12">
                      <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/30 to-amber-300/20 rounded-full blur-lg"></div>
                        <div className="relative bg-white/90 backdrop-blur-sm border border-amber-100/50 rounded-full px-10 py-4 shadow-lg">
                          <span className="text-sm font-semibold tracking-[0.2em] text-amber-700 uppercase">
                            Premium Collections
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dramatic Typography */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin text-neutral-900 mb-8 tracking-tight leading-[0.9]" 
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      {section.title || 'Signature'}
                    </h2>
                    
                    {/* Elegant Divider */}
                    <div className="flex items-center justify-center gap-8 mb-8">
                      <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
                    </div>
                    
                    {section.description && (
                      <p className="text-xl md:text-2xl lg:text-3xl text-neutral-600 max-w-4xl mx-auto font-light leading-relaxed italic">
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Sophisticated Asymmetric Mosaic Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                  <div className="grid grid-cols-12 auto-rows-fr gap-8 min-h-[900px]">
                    
                    {/* Hero Feature - Premium Showcase */}
                    <div 
                      className="col-span-12 lg:col-span-7 row-span-2 relative group cursor-pointer overflow-hidden"
                      onClick={() => handleViewAllClick('bridal-collections')}
                    >
                      <div className="relative h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:scale-[1.02]">
                        {/* Luxury Background */}
                        <div className="absolute inset-0">
                          <img
                            src={bridalCollectionsImage}
                            alt="Bridal Collection"
                            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                        </div>
                        
                        {/* Floating Elements */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-amber-300 rounded-full animate-pulse"></div>
                          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white rounded-full animate-pulse delay-300"></div>
                          <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-amber-400 rounded-full animate-pulse delay-700"></div>
                        </div>
                        
                        {/* Premium Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-12">
                          <div className="transform transition-all duration-700 group-hover:translate-y-[-8px]">
                            {/* Luxury Badge */}
                            <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full mb-6">
                              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                              <span className="text-white text-sm font-medium tracking-[0.15em] uppercase">Signature Collection</span>
                            </div>
                            
                            <h3 className="text-4xl lg:text-5xl xl:text-6xl font-thin text-white mb-6 leading-tight" 
                                style={{ fontFamily: 'Playfair Display, serif' }}>
                              Bridal Collection
                            </h3>
                            
                            <p className="text-white/90 text-lg lg:text-xl mb-8 max-w-lg font-light leading-relaxed">
                              Timeless elegance crafted for your most precious moments
                            </p>
                            
                            <button className="group/btn inline-flex items-center gap-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-xl hover:scale-105">
                              <span>Explore Collection</span>
                              <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    {/* Elegant Secondary Features - Top Right */}
                    <div 
                      className="col-span-12 lg:col-span-5 row-span-1 relative group cursor-pointer overflow-hidden"
                      onClick={() => handleViewAllClick('necklaces')}
                    >
                      <div className="relative h-full bg-gradient-to-br from-white via-stone-50 to-neutral-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] border border-stone-200">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-1/2 h-full relative overflow-hidden">
                            <img 
                              src={necklacesImage} 
                              alt="Necklaces" 
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60"></div>
                          </div>
                          
                          <div className="w-1/2 h-full flex flex-col justify-center p-6 lg:p-8">
                            <div className="transform transition-all duration-500 group-hover:translate-x-2">
                              <div className="mb-3">
                                <span className="text-xs font-semibold tracking-[0.15em] text-amber-600 uppercase">Exclusive</span>
                              </div>
                              <h4 className="text-xl lg:text-2xl xl:text-3xl font-light text-neutral-900 mb-3 leading-tight" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                Necklaces
                              </h4>
                              <p className="text-neutral-600 mb-4 text-sm lg:text-base font-light">Statement elegance</p>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-amber-700 hover:bg-amber-50 hover:text-amber-800 p-2 rounded-full"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Row - Four Elegant Cards */}
                    <div 
                      className="col-span-12 lg:col-span-3 row-span-1 relative group cursor-pointer overflow-hidden"
                      onClick={() => handleViewAllClick('earrings')}
                    >
                      <div className="relative h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02]">
                        <div className="absolute inset-0">
                          <img 
                            src={earringsImage} 
                            alt="Earrings" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                        </div>
                        
                        <div className="relative h-full flex flex-col justify-end p-6">
                          <div className="transform transition-all duration-500 group-hover:translate-y-[-4px]">
                            <h4 className="text-xl lg:text-2xl font-light text-white mb-2 leading-tight" 
                                style={{ fontFamily: 'Playfair Display, serif' }}>
                              Earrings
                            </h4>
                            <p className="text-white/80 text-sm font-light">Timeless beauty</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="col-span-12 lg:col-span-3 row-span-1 relative group cursor-pointer overflow-hidden"
                      onClick={() => handleViewAllClick('chains')}
                    >
                      <div className="relative h-full bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-100/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] border border-blue-200/50">
                        <div className="absolute inset-0">
                          <img 
                            src={chainsImage} 
                            alt="Chains" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-800/30 to-transparent"></div>
                        </div>
                        
                        <div className="relative h-full flex flex-col justify-end p-6">
                          <div className="transform transition-all duration-500 group-hover:translate-y-[-4px]">
                            <h4 className="text-xl lg:text-2xl font-light text-white mb-2 leading-tight" 
                                style={{ fontFamily: 'Playfair Display, serif' }}>
                              Chains
                            </h4>
                            <p className="text-white/90 text-sm font-light">Elegant connections</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="col-span-12 lg:col-span-3 row-span-1 relative group cursor-pointer overflow-hidden"
                      onClick={() => handleViewAllClick('bangles')}
                    >
                      <div className="relative h-full bg-gradient-to-br from-amber-50 via-amber-100/50 to-orange-100/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] border border-amber-200/50">
                        <div className="absolute inset-0">
                          <img 
                            src={banglesImage} 
                            alt="Bangles" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-800/30 to-transparent"></div>
                        </div>
                        
                        <div className="relative h-full flex flex-col justify-end p-6">
                          <div className="transform transition-all duration-500 group-hover:translate-y-[-4px]">
                            <h4 className="text-xl lg:text-2xl font-light text-white mb-2 leading-tight" 
                                style={{ fontFamily: 'Playfair Display, serif' }}>
                              Bangles
                            </h4>
                            <p className="text-white/90 text-sm font-light">Cultural heritage</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className="col-span-12 lg:col-span-3 row-span-1 relative group cursor-pointer overflow-hidden"
                      onClick={() => handleViewAllClick('rings')}
                    >
                      <div className="relative h-full bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] border border-rose-200/50">
                        <div className="absolute inset-0">
                          <img 
                            src={ringsImageMosaic} 
                            alt="Rings" 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-rose-900/70 via-rose-800/40 to-transparent"></div>
                        </div>
                        
                        <div className="relative h-full flex flex-col justify-end p-6">
                          <div className="transform transition-all duration-500 group-hover:translate-y-[-4px]">
                            <h4 className="text-xl lg:text-2xl font-light text-white mb-2 leading-tight" 
                                style={{ fontFamily: 'Playfair Display, serif' }}>
                              Rings
                            </h4>
                            <p className="text-white/90 text-sm font-light">Eternal symbols</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Elegant Footer Call-to-Action */}
                  <div className="mt-20 text-center">
                    <div className="mb-8">
                      <h3 className="text-2xl lg:text-3xl font-light text-neutral-900 mb-4" 
                          style={{ fontFamily: 'Playfair Display, serif' }}>
                        Discover Your Perfect Piece
                      </h3>
                      <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto">
                        Each collection tells a unique story of craftsmanship and elegance
                      </p>
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 text-base font-medium rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105 transform" 
                      onClick={() => window.location.href = '/collections'}
                    >
                      Explore All Collections
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Luxury layout rendering - Hero product with elegant arrangement
        if (section.layoutType === 'luxury') {
          const heroProduct = section.items[0];
          const otherProducts = section.items.slice(1);
          
          return (
            <section 
              key={section.id} 
              className="py-20" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                  )}
                </div>
                
                {heroProduct && (
                  <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Hero Product */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 to-yellow-400/20 rounded-3xl transform rotate-3"></div>
                      <div className="absolute inset-0 bg-gradient-to-tl from-rose-300/20 to-pink-400/10 rounded-3xl transform -rotate-2"></div>
                      <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
                        <ProductCard
                          product={heroProduct.product}
                          currency={selectedCurrency}
                          showActions={false}
                        />
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Featured
                        </div>
                      </div>
                    </div>
                    
                    {/* Supporting Content */}
                    <div className="space-y-8">
                      <div className="text-center lg:text-left">
                        <h3 className="text-2xl md:text-3xl font-light text-gray-800 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          Exquisite Craftsmanship
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Discover our premium collection featuring the finest materials and exceptional artistry.
                        </p>
                      </div>
                      
                      {/* Mini Gallery */}
                      <div className="grid grid-cols-2 gap-4">
                        {otherProducts.slice(0, 4).map((item) => (
                          <div key={item.id} className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition-shadow">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          );
        }

        // New Arrivals layout rendering - Horizontal auto-scrolling layout
        if (section.layoutType === 'new-arrivals') {
          return <NewArrivalsSection key={section.id} section={section} selectedCurrency={selectedCurrency} />;
        }

        // Magazine layout rendering - Luxury Editorial Design
        if (section.layoutType === 'magazine') {
          return (
            <section 
              key={section.id} 
              className="relative bg-gradient-to-br from-neutral-50 via-white to-stone-50/80 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Sophisticated Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, #000 1px, transparent 0), radial-gradient(circle at 75px 75px, #000 1px, transparent 0)`,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>

              <div className="relative z-10">
                {/* Luxury Magazine Header */}
                <div className="py-20 md:py-32">
                  <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center mb-20">
                      {/* Elegant Brand Mark */}
                      <div className="mb-12">
                        <div className="relative inline-block">
                          <div className="absolute -top-4 -left-8 w-16 h-16 border border-amber-200 rounded-full opacity-30"></div>
                          <div className="absolute -bottom-4 -right-8 w-12 h-12 border border-amber-300 rounded-full opacity-20"></div>
                          <div className="relative bg-white/80 backdrop-blur-sm border border-amber-100 rounded-full px-8 py-4 shadow-lg">
                            <span className="text-xs font-semibold tracking-[0.25em] text-amber-700 uppercase">
                              Palaniappa Exclusive
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dramatic Typography */}
                      <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-thin text-neutral-900 mb-4 tracking-tight leading-[0.85]" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          {section.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 mt-8">
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        </div>
                      </div>
                      
                      {section.description && (
                        <div className="max-w-4xl mx-auto">
                          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-600 leading-relaxed font-light italic tracking-wide"
                             style={{ fontFamily: 'Playfair Display, serif' }}>
                            "{section.description}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Luxury Editorial Grid */}
                <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
                  {/* Main Feature Story */}
                  {section.items[0] && (
                    <div className="mb-16">
                      <div className="relative group">
                        {/* Hero Article */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                          {/* Large Image Section */}
                          <div className="lg:col-span-3 relative overflow-hidden">
                            <div className="aspect-[4/3] lg:aspect-[3/2] relative">
                              <ProductCard
                                product={section.items[0].product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={section.items[0].customImageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                              
                              {/* Floating Feature Badge */}
                              <div className="absolute top-8 left-8">
                                <div className="bg-amber-500 text-white px-6 py-3 rounded-full shadow-lg">
                                  <span className="text-sm font-semibold tracking-wide">COVER STORY</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content Section */}
                          <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-neutral-50/50">
                            <div className="mb-6">
                              <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-2 block">
                                {section.items[0].product.category}
                              </span>
                              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-neutral-900 leading-tight mb-6" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {section.items[0].product.name}
                              </h2>
                            </div>
                            
                            <p className="text-neutral-600 leading-relaxed text-lg mb-8 font-light">
                              {section.items[0].product.description || 'An extraordinary masterpiece that embodies the pinnacle of craftsmanship and design excellence.'}
                            </p>
                            
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <span className="text-3xl font-light text-neutral-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {selectedCurrency === 'INR' ? '₹' : 'BD'} {selectedCurrency === 'INR' ? section.items[0].product.priceInr?.toLocaleString() : Number(section.items[0].product.priceBhd)?.toFixed(3)}
                                </span>
                              </div>
                              <Button 
                                className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 hover:shadow-xl group"
                              >
                                Discover More
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Secondary Articles Grid */}
                  {section.items.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                      {section.items.slice(1, 4).map((item, index) => (
                        <div key={item.id} className="group">
                          <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-white/30 h-full">
                            <div className="aspect-[4/3] relative overflow-hidden">
                              <ProductCard
                                product={item.product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={item.customImageUrl}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                              
                              {/* Article Number */}
                              <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                  <span className="text-xs font-bold text-neutral-700">{index + 2}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <div className="mb-3">
                                <span className="text-xs font-bold tracking-[0.15em] text-amber-600 uppercase">
                                  {item.product.category}
                                </span>
                              </div>
                              <h3 className="text-xl lg:text-2xl font-light text-neutral-900 leading-tight mb-4" 
                                  style={{ fontFamily: 'Playfair Display, serif' }}>
                                {item.product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-light text-neutral-700">
                                  {selectedCurrency === 'INR' ? '₹' : 'BD'} {selectedCurrency === 'INR' ? item.product.priceInr?.toLocaleString() : Number(item.product.priceBhd)?.toFixed(3)}
                                </span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-amber-600 hover:bg-amber-50 hover:text-amber-700 p-2 rounded-full"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Additional Items Grid */}
                  {section.items.length > 4 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                      {section.items.slice(4).map((item, index) => (
                        <div key={item.id} className="group">
                          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-neutral-100">
                            <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-neutral-50 to-stone-100">
                              <ProductCard
                                product={item.product}
                                currency={selectedCurrency}
                                showActions={false}
                                customImageUrl={item.customImageUrl}
                              />
                            </div>
                            <div className="p-4">
                              <span className="text-xs font-medium text-amber-600 uppercase tracking-wider block mb-2">
                                {item.product.category}
                              </span>
                              <h5 className="text-sm font-light text-neutral-900 leading-snug line-clamp-2">
                                {item.product.name}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Luxury Editorial Footer */}
                  {section.items.length > 0 && (
                    <div className="relative mt-24 pt-16">
                      {/* Elegant Divider */}
                      <div className="flex items-center justify-center mb-16">
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                        <div className="mx-8">
                          <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                        </div>
                        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                      </div>
                      
                      {/* Closing Statement */}
                      <div className="text-center max-w-3xl mx-auto mb-12">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 mb-6 leading-tight" 
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          The Story Continues
                        </h3>
                        <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed italic mb-8">
                          "Each piece tells a story of timeless elegance and exceptional craftsmanship"
                        </p>
                        <div className="space-y-4">
                          <Button 
                            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 text-base font-medium rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform" 
                            onClick={() => window.location.href = '/collections'}
                          >
                            Explore Full Collection
                            <ArrowRight className="ml-3 h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          );
        }

        // Festival layout rendering - Full background with overlay content
        if (section.layoutType === 'festival') {
          return (
            <section 
              key={section.id} 
              className="w-full relative overflow-hidden -mt-0 -mb-8 m-0 p-0" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {section.festivalImage ? (
                <div 
                  className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] m-0 p-0"
                  style={{
                    backgroundImage: `url("${section.festivalImage}")`,
                    backgroundSize: '120%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
                  
                  {/* Full content container */}
                  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 h-full flex flex-col">
                    
                    {/* Header content */}
                    <div className="text-center mb-8">
                      {/* Main Heading */}
                      <h2 
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 leading-tight tracking-wide drop-shadow-lg"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {section.title}
                      </h2>
                      
                      {/* Italic subtitle */}
                      {section.subtitle && (
                        <p 
                          className="text-2xl md:text-3xl text-white/90 italic mb-6 font-light drop-shadow-md"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.subtitle}
                        </p>
                      )}
                      
                      {/* Description */}
                      {section.description && (
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-lg mx-auto drop-shadow-sm">
                          {section.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Products section with festival background */}
                    {section.items && section.items.length > 0 && (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-5xl">
                          <FestivalScrollSection 
                            items={section.items} 
                            selectedCurrency={selectedCurrency} 
                            handleViewAllClick={handleViewAllClick} 
                          />
                          
                          {/* Call to Action Button */}
                          <div className="text-center mt-8">
                            <Button 
                              className="bg-white/90 hover:bg-white text-gray-900 px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm" 
                              style={{ fontFamily: 'Cormorant Garamond, serif' }}
                              onClick={() => window.location.href = '/collections'}
                            >
                              View Full Collection
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div 
                  className="relative w-full min-h-[400px] md:min-h-[500px]"
                  style={{ 
                    background: 'linear-gradient(135deg, #B19CD9 0%, #C8A9DD 25%, #DEB4E2 50%, #E8BFE8 75%, #F0CAF0 100%)',
                  }}
                >
                  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      
                      {/* Left side - Text content */}
                      <div className="relative z-10 text-left">
                        {/* Main Heading */}
                        <h2 
                          className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-3 leading-tight tracking-wide"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.title}
                        </h2>
                        
                        {/* Italic subtitle */}
                        {section.subtitle && (
                          <p 
                            className="text-2xl md:text-3xl text-gray-700 italic mb-6 font-light"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          >
                            {section.subtitle}
                          </p>
                        )}
                        
                        {/* Description */}
                        {section.description && (
                          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg">
                            {section.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Right side - Auto-scrolling 1x3 Product showcase */}
                      <div className="relative z-10">
                        <FestivalScrollSection 
                          items={section.items} 
                          selectedCurrency={selectedCurrency} 
                          handleViewAllClick={handleViewAllClick} 
                        />
                        
                        {/* Call to Action Button */}
                        <div className="text-center mt-6">
                          <Button 
                            className="bg-purple-700 hover:bg-purple-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg" 
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            onClick={() => window.location.href = '/collections'}
                          >
                            View Full Collection
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Only show products section if no festival image (fallback) */}
              {!section.festivalImage && section.items && section.items.length > 0 && (
                <section className="py-8 bg-white" data-testid={`${section.title.toLowerCase().replace(/\s+/g, '-')}-products`}>
                  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <FestivalScrollSection 
                      items={section.items} 
                      selectedCurrency={selectedCurrency} 
                      handleViewAllClick={handleViewAllClick} 
                    />
                    
                    {/* Call to Action Button */}
                    <div className="text-center mt-8">
                      <Button 
                        className="bg-gray-900 hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg" 
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        onClick={() => window.location.href = '/collections'}
                      >
                        View Full Collection
                      </Button>
                    </div>
                  </div>
                </section>
              )}
            </section>
          );
        }

        // Diamond layout rendering - Revolutionary diamond-shaped jewelry display
        if (section.layoutType === 'diamond') {
          return (
            <section 
              key={section.id} 
              className="py-16 md:py-24 overflow-hidden relative" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #1a1a2e 30%, #2d1b69 60%, #0f0f23 100%)',
              }}
            >
              {/* Cosmic Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-purple-400/15 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
              </div>

              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-7xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-orange-300 mb-6 tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title || 'DIAMOND COLLECTION'}
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
                  <p className="text-white/90 text-xl font-light max-w-2xl mx-auto">{section.description || 'Discover the brilliance of our exclusive diamond-shaped showcase'}</p>
                </div>

                <div className="relative">
                  <div className="flex justify-center mb-8">
                    <div 
                      className="w-64 h-64 md:w-80 md:h-80 transform rotate-45 relative group cursor-pointer transition-all duration-1000 hover:scale-110"
                      onClick={() => section.items[0] && handleViewAllClick('featured')}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-orange-500/20 to-yellow-600/10 rounded-3xl animate-pulse"></div>
                      <div className="absolute inset-2 bg-gradient-to-tl from-white/10 to-transparent rounded-2xl"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 md:w-60 md:h-60 -rotate-45 overflow-hidden rounded-2xl shadow-2xl">
                          {section.items[0] && (
                            <img
                              src={section.items[0].product.images?.[0] || ringsImage}
                              alt="Featured Diamond Piece"
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                            <div className="text-center w-full">
                              <h3 className="text-white font-light text-lg mb-2">FEATURED</h3>
                              <div className="w-12 h-0.5 bg-white/70 mx-auto"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {section.items.slice(1, 5).map((item, index) => (
                      <div key={item.id} className="flex justify-center">
                        <div 
                          className="w-32 h-32 md:w-40 md:h-40 transform rotate-45 relative group cursor-pointer transition-all duration-700 hover:scale-110"
                          onClick={() => handleViewAllClick('rings')}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-500/15 to-indigo-600/10 rounded-2xl animate-pulse" style={{ animationDelay: `${index * 200}ms` }}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 -rotate-45 overflow-hidden rounded-xl shadow-xl">
                              <img
                                src={item.product.images?.[0] || [necklacesImage, earringsImage, pendantsImage, banglesImage][index]}
                                alt={`Diamond ${index + 1}`}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Floating layout rendering - 3D floating cards with depth
        if (section.layoutType === 'floating') {
          return (
            <section 
              key={section.id} 
              className="py-20 md:py-32 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl transform rotate-12"></div>
                <div className="absolute bottom-32 right-32 w-48 h-48 bg-gradient-to-tl from-white/15 to-transparent rounded-full blur-lg transform -rotate-12"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-5xl md:text-8xl font-extralight text-white mb-8 tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title || 'FLOATING ELEGANCE'}
                  </h2>
                  <p className="text-white/90 text-2xl font-light max-w-3xl mx-auto">{section.description || 'Experience jewelry that defies gravity'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 perspective-1000">
                  {section.items.slice(0, 6).map((item, index) => (
                    <div 
                      key={item.id}
                      className="relative group cursor-pointer"
                      style={{
                        transform: `translateZ(${(index % 3) * 50}px) rotateX(${5 - (index % 3) * 2}deg) rotateY(${(index % 2) * 10 - 5}deg)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-xl transform translate-y-8 scale-95 group-hover:scale-105 transition-all duration-700"></div>
                      
                      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform transition-all duration-700 group-hover:translateZ-20 group-hover:scale-105">
                        <div className="aspect-square mb-6 overflow-hidden rounded-2xl">
                          <img
                            src={item.product.images?.[0] || ringsImage}
                            alt={item.product.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                        </div>
                        <h3 className="text-white text-xl font-light mb-4 text-center">{item.product.name}</h3>
                        <div className="text-center">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium">
                            VIEW DETAILS
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Radial layout rendering - Circular jewelry constellation
        if (section.layoutType === 'radial') {
          return (
            <section 
              key={section.id} 
              className="py-24 md:py-36 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'conic-gradient(from 0deg, #000428 0%, #004e92 25%, #009ffd 50%, #004e92 75%, #000428 100%)',
              }}
            >
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-6xl md:text-9xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 mb-8 tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title || 'CONSTELLATION'}
                  </h2>
                  <p className="text-white/95 text-2xl font-light max-w-3xl mx-auto">{section.description || 'A celestial arrangement of precious treasures'}</p>
                </div>

                <div className="relative w-96 h-96 md:w-[600px] md:h-[600px] mx-auto">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48">
                    <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full animate-pulse"></div>
                      <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white/30">
                        {section.items[0] && (
                          <img
                            src={section.items[0].product.images?.[0] || ringsImage}
                            alt="Center Constellation"
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {section.items.slice(1, 9).map((item, index) => {
                    const angle = (index * 45) * (Math.PI / 180);
                    const radius = 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    
                    return (
                      <div 
                        key={item.id}
                        className="absolute w-20 h-20 md:w-28 md:h-28 group cursor-pointer"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          animation: `orbit 20s linear infinite`,
                          animationDelay: `${index * 0.5}s`,
                        }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/10 rounded-full blur-sm animate-pulse"></div>
                          <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-2 border-white/20">
                            <img
                              src={item.product.images?.[0] || [necklacesImage, earringsImage, pendantsImage, banglesImage][index % 4]}
                              alt={`Orbit ${index + 1}`}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <style>{`
                @keyframes orbit {
                  from {
                    transform: translate(calc(-50% + 120px), -50%) rotate(0deg) translate(-120px, 0) rotate(0deg);
                  }
                  to {
                    transform: translate(calc(-50% + 120px), -50%) rotate(360deg) translate(-120px, 0) rotate(-360deg);
                  }
                }
              `}</style>
            </section>
          );
        }

        // Artistic layout rendering - Modern luxury showcase
        if (section.layoutType === 'artistic') {
          return (
            <section 
              key={section.id} 
              className="py-24 md:py-32 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 70%, #0f0f23 100%)',
              }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-600/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-rose-500/10 to-pink-600/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-purple-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <div className="mb-8">
                    <div className="inline-block">
                      <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"></div>
                      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-orange-300 mb-6 tracking-[0.2em] leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.title || 'ARTISAN COLLECTION'}
                      </h2>
                      <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-6"></div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">{section.description || 'Where timeless artistry meets contemporary elegance'}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Featured large item */}
                  <div className="lg:col-span-5 order-2 lg:order-1">
                    {section.items[0] && (
                      <div className="group relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
                        <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/10">
                          <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                            <img
                              src={section.items[0].product.images?.[0] || ringsImage}
                              alt={section.items[0].product.name}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="text-white text-xl font-light mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                              {section.items[0].product.name}
                            </h3>
                            <div className="flex justify-center items-center space-x-2 mb-4">
                              <div className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400"></div>
                              <span className="text-amber-400 text-sm font-light">{section.items[0].product.category}</span>
                              <div className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400"></div>
                            </div>
                            <p className="text-amber-300 text-lg font-semibold">
                              {selectedCurrency === 'BHD' ? `BD ${section.items[0].product.priceBhd}` : `₹ ${section.items[0].product.priceInr}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Grid of smaller items */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {section.items.slice(1, 7).map((item, index) => (
                        <div key={item.id} className="group relative">
                          <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                          <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-white/10 hover:border-amber-400/30 transition-all duration-500">
                            <div className="aspect-square overflow-hidden rounded-xl mb-3">
                              <img
                                src={item.product.images?.[0] || [ringsImage, necklacesImage, earringsImage, pendantsImage][index % 4]}
                                alt={item.product.name}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="text-center">
                              <h4 className="text-white text-sm font-light line-clamp-2 mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                {item.product.name}
                              </h4>
                              <p className="text-amber-300 text-xs font-medium">
                                {selectedCurrency === 'BHD' ? `BD ${item.product.priceBhd}` : `₹ ${item.product.priceInr}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call to action */}
                <div className="text-center mt-16">
                  <button
                    onClick={() => window.location.href = '/collections'}
                    className="group relative inline-flex items-center px-8 py-4 overflow-hidden text-lg font-medium text-amber-400 border-2 border-amber-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-all duration-300"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center">
                      Explore Collection
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </section>
          );
        }
        
        // Regular layout rendering
        return (
          <section 
            key={section.id} 
            className="py-12" 
            data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            style={{ 
              background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)'
            }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                )}
              </div>
              <div className={`grid gap-4 md:gap-6 mb-10 ${getLayoutClasses(section.layoutType, section.items.length)}`}>
                {section.items.map((item) => (
                  <div key={item.id} className={getSizeClasses(item.size || 'normal')}>
                    <ProductCard
                      product={item.product}
                      currency={selectedCurrency}
                      showActions={false}
                      customImageUrl={item.customImageUrl}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button 
                  className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  onClick={() => window.location.href = '/collections'}
                >
                  View All <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </section>
        );
      })}

      {/* Section Divider */}
      {homeSections.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* New Arrivals - Only show if no custom new-arrivals layout exists */}
      {newArrivalProducts.length > 0 && !homeSections.some(section => section.layoutType === 'new-arrivals') && (
        <section className="py-12" data-testid="section-new-arrivals" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>New Arrivals</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Latest additions to our collection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {newArrivalProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?category=new-arrivals'}
              >
                View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {newArrivalProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Gold Plated Silver Collection */}
      {goldPlatedSilverProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-plated-silver-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gold Plated Silver</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Affordable luxury with gold plated silver elegance</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {goldPlatedSilverProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=gold-plated-silver'}
              >
                View Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {goldPlatedSilverProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Material-Based Sections - Always show these regardless of custom sections */}
      
      {/* Gold Collection */}
      {goldProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Gold Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Exquisite gold jewelry crafted to perfection</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {goldProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=gold'}
              >
                View Gold Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {goldProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Silver Collection */}
      {silverProducts.length > 0 && (
        <section className="py-12" data-testid="section-silver-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Silver Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Elegant silver jewelry for every occasion</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {silverProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=silver'}
              >
                View Silver Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      {silverProducts.length > 0 && <div className="w-full border-t border-gray-200 my-8"></div>}

      {/* Diamond Collection */}
      {diamondProducts.length > 0 && (
        <section className="py-12" data-testid="section-diamond-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Diamond Collection</h2>
              <p className="text-base font-medium text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Brilliant diamonds for life's special moments</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {diamondProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-900 text-gray-600 px-6 py-2 text-sm font-normal rounded hover:bg-gray-50 transition-colors duration-200" 
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                onClick={() => window.location.href = '/collections?material=diamond'}
              >
                View Diamond Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Platinum Collection */}
      {platinumProducts.length > 0 && (
        <section className="py-12" data-testid="section-platinum-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Platinum Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Premium platinum jewelry for discerning taste</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {platinumProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=platinum'}
              >
                View Platinum Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Gemstone Collection */}
      {gemstoneProducts.length > 0 && (
        <section className="py-12" data-testid="section-gemstone-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Gemstone Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Colorful gemstones for vibrant elegance</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {gemstoneProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=gemstone'}
              >
                View Gemstone Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Pearl Collection */}
      {pearlProducts.length > 0 && (
        <section className="py-12" data-testid="section-pearl-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Pearl Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Timeless pearls for classic beauty</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {pearlProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=pearl'}
              >
                View Pearl Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}


      {/* Other Materials Collection */}
      {otherProducts.length > 0 && (
        <section className="py-12" data-testid="section-other-collection" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Other Materials Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Unique materials for distinctive styles</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
              {otherProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={selectedCurrency}
                  showActions={false}
                />
              ))}
            </div>
            <div className="text-center">
              <Button 
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=other'}
              >
                View All Collections <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}