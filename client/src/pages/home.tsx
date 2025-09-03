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
    { name: 'Necklaces', image: braceletsImage, key: 'necklaces' },
    { name: 'Bangles & Bracelets', image: banglesImage, key: 'bangles' },
    { name: 'Chains', image: necklacesImage, key: 'chains' },
    { name: 'Bracelets', image: chainsImage, key: 'bracelets' },
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
      case 'mosaic':
        return 'grid-cols-12 auto-rows-fr gap-10';
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

        // Mosaic layout rendering - Ultra Modern 3D Crystal Gallery
        if (section.layoutType === 'mosaic') {
          return (
            <section 
              key={section.id} 
              className="relative py-32 overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: `
                  radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
                  linear-gradient(135deg, #667eea 0%, #764ba2 25%, #667eea 50%, #764ba2 75%, #667eea 100%)
                `
              }}
            >
              {/* Animated Crystal Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  >
                    <div className="w-2 h-2 bg-white/20 transform rotate-45 rounded-sm"></div>
                  </div>
                ))}
              </div>

              {/* Floating Glass Morphism Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-white/10 to-purple/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-blue/8 to-indigo/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet/6 to-purple/3 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* Ultra Modern Header with Glass Morphism */}
                <div className="text-center mb-20">
                  {/* Glassmorphism Title Container */}
                  <div className="relative inline-block p-12 rounded-3xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/5 rounded-3xl"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        <div className="mx-6 p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                          <Gem className="w-8 h-8 text-white" />
                        </div>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>
                      
                      <h2 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-2xl" 
                          style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 0 30px rgba(255,255,255,0.5)' }}>
                        {section.title || 'Crystal Gallery'}
                      </h2>
                      
                      {section.description && (
                        <p className="text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                          {section.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Revolutionary 3D Crystal Mosaic Gallery */}
                <div className="relative perspective-1000">
                  {/* 3D Grid Container with Transform */}
                  <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 auto-rows-[240px] md:auto-rows-[280px] lg:auto-rows-[320px] relative z-10 transform-gpu">
                    {section.items.map((item, index) => {
                      // Revolutionary 3D grid patterns
                      const crystallineLayouts = [
                        { 
                          grid: 'col-span-1 md:col-span-4 lg:col-span-7 row-span-3', 
                          type: 'hero-crystal', 
                          depth: 'translateZ(60px)',
                          glow: 'shadow-blue-500/25'
                        },
                        { 
                          grid: 'col-span-1 md:col-span-2 lg:col-span-5 row-span-2', 
                          type: 'prism', 
                          depth: 'translateZ(40px) rotateY(5deg)',
                          glow: 'shadow-purple-500/25'
                        },
                        { 
                          grid: 'col-span-1 md:col-span-3 lg:col-span-4 row-span-2', 
                          type: 'gem', 
                          depth: 'translateZ(30px) rotateX(5deg)',
                          glow: 'shadow-pink-500/25'
                        },
                        { 
                          grid: 'col-span-1 md:col-span-3 lg:col-span-4 row-span-3', 
                          type: 'diamond', 
                          depth: 'translateZ(50px) rotateY(-5deg)',
                          glow: 'shadow-violet-500/25'
                        },
                        { 
                          grid: 'col-span-1 md:col-span-2 lg:col-span-4 row-span-1', 
                          type: 'shard', 
                          depth: 'translateZ(20px)',
                          glow: 'shadow-indigo-500/25'
                        },
                        { 
                          grid: 'col-span-1 md:col-span-4 lg:col-span-8 row-span-2', 
                          type: 'crystal-palace', 
                          depth: 'translateZ(45px) rotateX(-2deg)',
                          glow: 'shadow-cyan-500/25'
                        }
                      ];
                      
                      const layout = crystallineLayouts[index % crystallineLayouts.length];
                      
                      // Define layout types
                      const isHero = layout.type === 'hero-crystal';
                      const isFeature = ['diamond', 'crystal-palace'].includes(layout.type);
                      
                      // Advanced holographic color schemes
                      const holographicSchemes = [
                        'from-cyan-400/30 via-blue-500/20 to-purple-600/30',
                        'from-pink-400/30 via-violet-500/20 to-indigo-600/30', 
                        'from-emerald-400/30 via-teal-500/20 to-cyan-600/30',
                        'from-yellow-400/30 via-orange-500/20 to-red-600/30',
                        'from-purple-400/30 via-pink-500/20 to-rose-600/30'
                      ];
                      
                      const holographicScheme = holographicSchemes[index % holographicSchemes.length];
                      
                      return (
                        <div 
                          key={item.id}
                          className={`${layout.grid} group cursor-pointer transform transition-all duration-700 
                            active:scale-95 touch-manipulation animate-fadeInUp`}
                          style={{ 
                            animationDelay: `${index * 150}ms`,
                            transform: `translateY(${Math.sin(index * 0.5) * 15}px)` // Organic flow
                          }}
                        >
                          <div 
                            className={`relative w-full h-full rounded-3xl overflow-hidden ${layout.glow} hover:shadow-2xl transition-all duration-1000 
                              border border-white/20 hover:border-white/40 bg-gradient-to-br ${holographicScheme} backdrop-blur-lg
                              transform-gpu`}
                            style={{
                              transform: `${layout.depth} rotateZ(${index * 2}deg)`,
                              transition: 'all 1s cubic-bezier(0.23, 1, 0.320, 1)'
                            }}
                            onClick={() => handleViewAllClick(item.product.category)}
                          >
                            
                            {/* Artistic Frame Effect - Responsive */}
                            <div className="absolute inset-1 md:inset-2 rounded-xl md:rounded-2xl border md:border-2 border-white/30 pointer-events-none"></div>
                            <div className="absolute inset-2 md:inset-4 rounded-lg md:rounded-xl border border-white/20 pointer-events-none"></div>
                            
                            {/* Dynamic Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03]">
                              <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle at 20px 20px, #d97706 2px, transparent 2px)`,
                                backgroundSize: `${40 + (index % 3) * 10}px ${40 + (index % 3) * 10}px`,
                                transform: `rotate(${index * 15}deg)`
                              }}></div>
                            </div>
                            
                            {/* Premium Image Container */}
                            <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl">
                              <img 
                                src={item.customImageUrl || item.product.images?.[0] || "https://images.unsplash.com/photo-1603561596112-db2eca6c9df4?w=400"} 
                                alt={item.displayName || item.product.name}
                                className="w-full h-full object-cover transition-all duration-700 
                                  group-hover:scale-110 group-active:scale-105 
                                  md:group-hover:scale-125 md:group-hover:rotate-2"
                                style={{ 
                                  filter: 'brightness(0.95) contrast(1.05) saturate(1.1)',
                                  transition: 'filter 0.7s ease, transform 0.7s ease'
                                }}
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1603561596112-db2eca6c9df4?w=400";
                                }}
                              />
                              
                              {/* Sophisticated Overlay System - Mobile & Desktop */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                                opacity-0 group-hover:opacity-100 group-active:opacity-100 
                                md:opacity-0 transition-all duration-500"></div>
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-orange-500/10 
                                opacity-0 group-hover:opacity-100 group-active:opacity-100 
                                md:opacity-0 transition-all duration-700"></div>
                              
                              {/* Auto-Animation Particle Effects for Mobile */}
                              <div className="absolute inset-0 pointer-events-none opacity-0 
                                group-hover:opacity-100 group-active:opacity-100 
                                md:opacity-0 animate-pulse transition-opacity duration-1000">
                                {[...Array(3)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className="absolute w-1 h-1 bg-amber-400/40 rounded-full animate-pulse"
                                    style={{
                                      top: `${25 + i * 20}%`,
                                      left: `${15 + i * 25}%`,
                                      animationDelay: `${i * 300}ms`,
                                      animationDuration: '3s'
                                    }}
                                  ></div>
                                ))}
                              </div>
                              
                              {/* Premium Content Overlay - Mobile Touch & Desktop Hover */}
                              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 transform 
                                translate-y-full group-hover:translate-y-0 group-active:translate-y-0 
                                transition-all duration-500 backdrop-blur-sm bg-black/20">
                                <div className="space-y-2 md:space-y-3">
                                  {isHero && (
                                    <div className="inline-flex items-center px-2 md:px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full mb-2 md:mb-3">
                                      <Gem className="w-2 md:w-3 h-2 md:h-3 text-amber-300 mr-1 md:mr-2" />
                                      <span className="text-xs text-amber-200 font-medium uppercase tracking-wider">Masterpiece</span>
                                    </div>
                                  )}
                                  
                                  <h3 className={`font-medium text-white mb-2 line-clamp-2 ${isHero ? 'text-lg md:text-2xl' : 'text-sm md:text-lg'}`}
                                      style={{ fontFamily: 'Playfair Display, serif' }}>
                                    {item.displayName || item.product.name}
                                  </h3>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="space-y-1 flex-1">
                                      {item.displayPrice && (
                                        <p className={`text-amber-300 font-semibold ${isHero ? 'text-base md:text-xl' : 'text-sm md:text-base'}`}>
                                          {item.displayPrice}
                                        </p>
                                      )}
                                      <p className="text-white/60 text-xs uppercase tracking-wider hidden md:block">
                                        {item.product.category || 'Luxury Collection'}
                                      </p>
                                    </div>
                                    
                                    <div className="flex items-center space-x-1 md:space-x-2">
                                      <div className="w-6 md:w-8 h-6 md:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center 
                                        hover:bg-amber-400/20 active:bg-amber-400/30 active:scale-90 
                                        transition-all duration-300 touch-manipulation">
                                        <Heart className="w-3 md:w-4 h-3 md:h-4 text-white" />
                                      </div>
                                      <div className="w-6 md:w-8 h-6 md:h-8 bg-amber-500/20 backdrop-blur-sm rounded-full flex items-center justify-center 
                                        hover:bg-amber-400/30 active:bg-amber-400/40 active:scale-90 
                                        transition-all duration-300 touch-manipulation">
                                        <ArrowRight className="w-3 md:w-4 h-3 md:h-4 text-amber-200" />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {(isHero || isFeature) && item.product.description && (
                                    <p className="text-white/70 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed hidden md:block">
                                      {item.product.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              
                              {/* Luxury Shine Animation - Auto for Mobile */}
                              <div className="absolute inset-0 opacity-0 
                                group-hover:opacity-100 group-active:opacity-60 
                                transition-opacity duration-1000">
                                <div className="absolute top-0 -left-full w-1/2 h-full 
                                  bg-gradient-to-r from-transparent via-white/10 to-transparent 
                                  transform skew-x-12 
                                  group-hover:animate-[shine_2s_ease-in-out_infinite]
                                  group-active:animate-[shine_1.5s_ease-in-out_infinite]"></div>
                              </div>
                            </div>
                            
                            {/* Premium Badge System - Responsive */}
                            {index === 0 && (
                              <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
                                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-full text-xs font-bold shadow-xl border border-amber-300/50 backdrop-blur-sm">
                                  <div className="flex items-center space-x-1">
                                    <Crown className="w-2 md:w-3 h-2 md:h-3" />
                                    <span className="hidden md:inline">FEATURED</span>
                                    <span className="md:hidden">★</span>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {isFeature && index > 0 && (
                              <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                                  <Star className="w-2 md:w-3 h-2 md:h-3 inline mr-1" />
                                  <span className="hidden md:inline">Premium</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Custom Animations - Mobile Optimized */}
                <style>{`
                  @keyframes shine {
                    0% { transform: translateX(-100%) skewX(12deg); }
                    100% { transform: translateX(200%) skewX(12deg); }
                  }
                  
                  @keyframes fadeInUp {
                    0% { 
                      opacity: 0; 
                      transform: translateY(30px) translateY(${Math.sin(0 * 0.5) * 15}px); 
                    }
                    100% { 
                      opacity: 1; 
                      transform: translateY(0px) translateY(${Math.sin(0 * 0.5) * 15}px); 
                    }
                  }
                  
                  @media (max-width: 768px) {
                    .animate-fadeInUp {
                      animation: fadeInUp 0.8s ease-out forwards;
                    }
                    
                    /* Auto-pulse for mobile engagement */
                    .group:nth-child(even) {
                      animation: pulse 4s ease-in-out infinite;
                      animation-delay: 2s;
                    }
                  }
                  
                  @media (prefers-reduced-motion: reduce) {
                    .animate-fadeInUp,
                    .group:nth-child(even) {
                      animation: none;
                    }
                  }
                `}</style>
                
                {/* Call to action */}
                <div className="text-center mt-16">
                  <Button 
                    className="bg-stone-800 hover:bg-stone-900 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:shadow-xl group"
                    onClick={() => window.location.href = '/collections'}
                  >
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
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

        // Diamond layout rendering - Enhanced luxury diamond showcase with premium animations
        if (section.layoutType === 'diamond') {
          return (
            <section 
              key={section.id} 
              className="py-20 md:py-32 overflow-hidden relative min-h-screen" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #533a7b 80%, #6a4c93 100%)',
              }}
            >
              {/* Enhanced Cosmic Background Effects */}
              <div className="absolute inset-0">
                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-32 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-80" style={{ animationDelay: '3s' }}></div>
                
                {/* Large gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/30 to-orange-500/15 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-purple-400/25 to-blue-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-violet-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                
                {/* Sparkle effects */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-30"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <div className="mb-8">
                    <div className="inline-block">
                      <h2 className="text-5xl md:text-8xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-orange-300 mb-6 tracking-widest animate-pulse" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {section.title || 'DIAMOND COLLECTION'}
                      </h2>
                      <div className="w-48 h-1 bg-gradient-to-r from-transparent via-amber-400 via-white to-transparent mx-auto mb-6 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-white/90 text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed">{section.description || 'Discover the brilliance of our exclusive diamond collection, where each piece reflects pure luxury and timeless elegance'}</p>
                </div>

                <div className="relative">
                  {/* Enhanced Central Diamond */}
                  <div className="flex justify-center mb-16">
                    <div className="relative">
                      {/* Rotating ring around central diamond */}
                      <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 border border-amber-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                      <div className="absolute inset-4 w-72 h-72 md:w-88 md:h-88 border border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
                      
                      <div 
                        className="w-72 h-72 md:w-88 md:h-88 transform rotate-45 relative group cursor-pointer transition-all duration-1000 hover:scale-110 hover:rotate-[50deg]"
                        onClick={() => section.items[0] && handleViewAllClick('featured')}
                      >
                        {/* Multiple gradient layers for depth */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/40 via-orange-500/30 to-yellow-600/20 rounded-3xl animate-pulse shadow-2xl"></div>
                        <div className="absolute inset-1 bg-gradient-to-tl from-white/20 via-transparent to-purple-400/10 rounded-3xl"></div>
                        <div className="absolute inset-2 bg-gradient-to-br from-transparent via-amber-300/15 to-transparent rounded-2xl"></div>
                        
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-400/50 via-white/30 to-purple-400/50 p-0.5">
                          <div className="w-full h-full bg-black/20 rounded-3xl"></div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-56 h-56 md:w-72 md:h-72 -rotate-45 overflow-hidden rounded-3xl shadow-2xl border border-white/20">
                            {section.items[0] && (
                              <img
                                src={section.items[0].product.images?.[0] || ringsImage}
                                alt="Featured Diamond Piece"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                              <div className="text-center w-full">
                                <h3 className="text-white font-light text-xl md:text-2xl mb-3 tracking-wide">SIGNATURE PIECE</h3>
                                <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-white mx-auto"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Premium badge */}
                        <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black px-6 py-3 rounded-full text-sm font-bold shadow-2xl border border-white/30 animate-pulse">
                          PREMIUM
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Surrounding Diamonds with Better Layout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 mb-16">
                    {section.items.slice(1, 5).map((item, index) => (
                      <div key={item.id} className="flex justify-center">
                        <div 
                          className="w-36 h-36 md:w-48 md:h-48 transform rotate-45 relative group cursor-pointer transition-all duration-700 hover:scale-110 hover:rotate-[50deg]"
                          onClick={() => handleViewAllClick('rings')}
                        >
                          {/* Enhanced gradient effects */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/25 via-blue-500/20 to-indigo-600/15 rounded-2xl animate-pulse shadow-xl" style={{ animationDelay: `${index * 300}ms` }}></div>
                          <div className="absolute inset-1 bg-gradient-to-tl from-white/15 to-transparent rounded-2xl"></div>
                          
                          {/* Glowing border */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/40 via-blue-400/30 to-indigo-400/40 p-0.5">
                            <div className="w-full h-full bg-black/20 rounded-2xl"></div>
                          </div>
                          
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-28 h-28 md:w-40 md:h-40 -rotate-45 overflow-hidden rounded-xl shadow-xl border border-white/20">
                              <img
                                src={item.product.images?.[0] || [necklacesImage, earringsImage, pendantsImage, banglesImage][index]}
                                alt={`Diamond ${index + 1}`}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>
                          </div>
                          
                          {/* Price display */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 -rotate-45 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                            {selectedCurrency === 'BHD' ? `${item.product.priceBhd} BHD` : `₹${item.product.priceInr}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Call to Action Section */}
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        Experience Diamond Perfection
                      </h3>
                      <p className="text-white/80 text-lg max-w-2xl mx-auto">
                        Each diamond tells a story of brilliance, cut to perfection and set with unmatched craftsmanship
                      </p>
                    </div>
                    <button 
                      className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:via-yellow-500 hover:to-amber-600 text-black px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 transform border border-white/20"
                      onClick={() => window.location.href = '/collections/diamond'}
                    >
                      Explore Diamond Collection
                      <span className="ml-2 text-xl">💎</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Premium layout rendering - Futuristic Luxury Space Gallery
        if (section.layoutType === 'premium') {
          const featuredProduct = section.items[0];
          const supportingProducts = section.items.slice(1, 8);
          
          // Define variables for the futuristic luxury layout
          const centralShowcase = featuredProduct;
          const orbitingGems = supportingProducts.slice(0, 6); // First 6 supporting products
          const constellationItems = supportingProducts.slice(6); // Remaining products
          
          return (
            <section 
              key={section.id} 
              className="py-40 relative overflow-hidden min-h-screen" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: `
                  radial-gradient(ellipse at top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.95) 70%, black 100%),
                  radial-gradient(ellipse at 30% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
                  black
                `
              }}
            >
              {/* Futuristic Space Environment */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Animated Starfield */}
                {[...Array(150)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 3}s`
                    }}
                  >
                    <div 
                      className="bg-white rounded-full"
                      style={{
                        width: `${1 + Math.random() * 2}px`,
                        height: `${1 + Math.random() * 2}px`,
                        opacity: Math.random() * 0.8 + 0.2
                      }}
                    ></div>
                  </div>
                ))}

                {/* Cosmic Energy Rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-96 h-96 border border-cyan-500/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="absolute inset-8 border border-purple-500/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                  <div className="absolute inset-16 border border-pink-500/20 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
                </div>

                {/* Floating Nebula Clouds */}
                <div className="absolute top-10 left-20 w-80 h-80 bg-gradient-to-br from-purple-600/5 via-blue-500/3 to-cyan-400/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tl from-pink-600/4 via-violet-500/3 to-indigo-400/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-600/3 via-teal-500/2 to-emerald-400/3 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>

                {/* Cosmic Particles */}
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${8 + Math.random() * 4}s`
                    }}
                  >
                    <div className="w-1 h-1 bg-cyan-400/60 rounded-full"></div>
                  </div>
                ))}
              </div>

              <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Cosmic Gateway Header */}
                <div className="text-center mb-24">
                  <div className="mb-12 relative">
                    {/* Holographic Portal Above Title */}
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 via-purple-500/40 to-pink-400/30 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative w-20 h-20 border-2 border-cyan-400/60 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
                          <div className="absolute inset-2 border border-purple-400/60 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                            <div className="absolute inset-2 border border-pink-400/60 rounded-full animate-pulse">
                              <Gem className="absolute inset-2 w-full h-full text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-6xl md:text-8xl font-extralight bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 tracking-[0.2em]" 
                        style={{ 
                          fontFamily: 'Playfair Display, serif',
                          textShadow: '0 0 40px rgba(34, 211, 238, 0.3)'
                        }}>
                      {section.title || 'COSMIC LUXURY'}
                    </h2>
                    
                    {/* Cosmic Energy Divider */}
                    <div className="relative flex items-center justify-center mb-8">
                      <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"></div>
                      <div className="mx-8 relative">
                        <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
                    </div>
                  
                  {section.description && (
                    <p className="text-2xl text-white/90 max-w-4xl mx-auto font-light leading-relaxed mb-12" 
                       style={{ 
                         fontFamily: 'Playfair Display, serif',
                         textShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                       }}>
                      {section.description}
                    </p>
                  )}
                </div>

                {/* Cosmic Gallery Layout */}
                <div className="relative">

                    {/* Central Cosmic Showcase */}
                    {centralShowcase && (
                      <div className="flex justify-center mb-20">
                        <div className="relative group cursor-pointer" onClick={() => handleViewAllClick(centralShowcase.product.category)}>
                          {/* Cosmic Energy Field */}
                          <div className="absolute -inset-12 bg-gradient-to-br from-cyan-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                          <div className="absolute -inset-8 bg-gradient-to-br from-white/5 via-cyan-400/10 to-purple-400/5 rounded-3xl backdrop-blur-sm"></div>
                          
                          {/* Orbiting Energy Particles */}
                          <div className="absolute -inset-10">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute animate-spin"
                                style={{
                                  top: '50%',
                                  left: '50%',
                                  transform: `rotate(${i * 45}deg) translateX(100px) rotate(-${i * 45}deg)`,
                                  animationDuration: '10s',
                                  animationDelay: `${i * 0.5}s`
                                }}
                              >
                                <div className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse"></div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Central Showcase Product */}
                          <div className="relative bg-gradient-to-br from-black/80 via-gray-900/90 to-black/80 rounded-3xl p-12 shadow-2xl border-2 border-cyan-400/30 transform transition-all duration-1000 hover:scale-110 hover:shadow-cyan-500/25 min-w-[400px] backdrop-blur-lg">
                            <ProductCard
                              product={centralShowcase.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                            
                            {/* Cosmic Badge */}
                            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg border-2 border-white/20 animate-pulse">
                              COSMIC PRIME
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Orbiting Cosmic Gems */}
                  {orbitingGems.length > 0 && (
                    <div className="relative mb-20">
                      {/* Orbital Ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[800px] h-[800px] border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}></div>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                        {orbitingGems.map((item: any, index: number) => {
                          const orbitalPosition = (360 / orbitingGems.length) * index;
                          return (
                            <div 
                              key={item.id}
                              className="relative group cursor-pointer transform transition-all duration-1000 hover:scale-110"
                              style={{
                                transform: `rotate(${orbitalPosition}deg) translateX(200px) rotate(-${orbitalPosition}deg)`,
                                animationDelay: `${index * 0.3}s`
                              }}
                              onClick={() => handleViewAllClick(item.product.category)}
                            >
                              {/* Cosmic Energy Aura */}
                              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-pink-500/10 rounded-2xl blur-xl animate-pulse"></div>
                              
                              {/* Orbiting Gem Product */}
                              <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 backdrop-blur-lg">
                                <ProductCard
                                  product={item.product}
                                  currency={selectedCurrency}
                                  showActions={false}
                                />
                                
                                {/* Orbital Badge */}
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse">
                                  ORBITAL
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Constellation Items */}
                  {constellationItems.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                      {constellationItems.map((item: any, index: number) => (
                        <div 
                          key={item.id}
                          className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105"
                          style={{
                            animationDelay: `${index * 0.1}s`
                          }}
                          onClick={() => handleViewAllClick(item.product.category)}
                        >
                          {/* Star Connection Lines */}
                          {index > 0 && (
                            <div className="absolute -left-4 top-1/2 w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-white/10"></div>
                          )}
                          
                          {/* Constellation Star */}
                          <div className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-black/90 rounded-xl p-4 shadow-lg border border-white/5 hover:border-white/20 transition-all duration-500 backdrop-blur-sm">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                            />
                            
                            {/* Star Badge */}
                            <div className="absolute -top-1 -right-1 bg-gradient-to-br from-white/20 to-gray-500/20 text-white px-2 py-1 rounded-full text-xs font-light border border-white/10">
                              STAR
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cosmic Portal - Call to Action */}
                  <div className="mt-32 text-center">
                    <div className="relative inline-block">
                      <div className="absolute -inset-16 bg-gradient-to-r from-cyan-500/20 via-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
                      <div className="relative bg-gradient-to-br from-black/60 via-gray-900/80 to-black/60 backdrop-blur-xl border-2 border-cyan-400/30 rounded-3xl px-20 py-12 shadow-2xl">
                        <div className="relative mb-6">
                          <div className="w-16 h-16 mx-auto border-2 border-cyan-400/60 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
                            <div className="absolute inset-2 border border-purple-400/60 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                              <Gem className="absolute inset-2 w-full h-full text-white" />
                            </div>
                          </div>
                        </div>
                        <h3 className="text-3xl font-light text-white mb-6 tracking-wide" 
                            style={{ 
                              fontFamily: 'Playfair Display, serif',
                              textShadow: '0 0 30px rgba(34, 211, 238, 0.5)'
                            }}>
                          Enter the Cosmic Dimension
                        </h3>
                        <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">
                          Journey through the infinite cosmos of luxury, where every piece transcends reality
                        </p>
                        <button 
                          className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white px-16 py-6 rounded-full font-light text-xl transition-all duration-1000 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-110 border border-white/20"
                          onClick={() => window.location.href = '/collections'}
                          style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                        >
                          <span className="flex items-center gap-4">
                            <Gem className="w-6 h-6" />
                            EXPLORE COSMIC UNIVERSE
                            <Gem className="w-6 h-6" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Royal layout rendering - Sophisticated Luxury Gallery
        if (section.layoutType === 'royal') {
          const featuredProduct = section.items[0];
          const supportingProducts = section.items.slice(1);
          
          return (
            <section 
              key={section.id} 
              className="py-20 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)'
              }}
            >
              {/* Elegant background elements */}
              <div className="absolute inset-0">
                {/* Subtle radial highlights */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-tl from-amber-400/8 via-orange-500/4 to-transparent rounded-full blur-2xl"></div>
                
                {/* Sophisticated pattern overlay */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #fbbf24 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }}></div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                {/* Elegant Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center justify-center mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                    <div className="mx-6 p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-amber-400/30">
                      <Crown className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight" 
                      style={{ fontFamily: 'Playfair Display, serif' }}>
                    {section.title}
                  </h2>
                  
                  {section.description && (
                    <p className="text-xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                      {section.description}
                    </p>
                  )}
                </div>
                
                {/* Hero Product Showcase */}
                {featuredProduct && (
                  <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Featured Product */}
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/20 rounded-3xl blur-2xl group-hover:from-amber-400/25 group-hover:to-amber-400/25 transition-all duration-700"></div>
                      <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 hover:border-amber-400/30 transition-all duration-500">
                        <div className="absolute top-4 right-4">
                          <div className="bg-amber-500/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-3 py-1">
                            <span className="text-xs text-amber-300 font-medium uppercase tracking-wider">Featured</span>
                          </div>
                        </div>
                        <ProductCard
                          product={featuredProduct.product}
                          currency={selectedCurrency}
                          showActions={false}
                          customImageUrl={featuredProduct.customImageUrl}
                        />
                      </div>
                    </div>
                    
                    {/* Product Description */}
                    <div className="space-y-8">
                      <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 mb-6">
                          <Gem className="w-4 h-4 text-amber-400 mr-2" />
                          <span className="text-sm text-amber-300 font-medium uppercase tracking-wider">
                            Signature Collection
                          </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight"
                            style={{ fontFamily: 'Playfair Display, serif' }}>
                          {featuredProduct.displayName || featuredProduct.product.name}
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">
                          {featuredProduct.product.description || 'Exquisitely crafted with meticulous attention to detail, this masterpiece represents the pinnacle of jewelry artistry.'}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-3xl font-light text-white">
                            {featuredProduct.displayPrice || (selectedCurrency === 'INR' 
                              ? `₹${featuredProduct.product.priceInr?.toLocaleString()}` 
                              : `BD ${Number(featuredProduct.product.priceBhd)?.toFixed(3)}`)}
                          </div>
                          <div className="text-sm text-slate-400 uppercase tracking-wider">Starting from</div>
                        </div>
                        <Button className="bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-6 py-3 rounded-full font-medium transition-all duration-300">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Supporting Products Grid */}
                {supportingProducts.length > 0 && (
                  <div className="mb-16">
                    <div className="text-center mb-12">
                      <h3 className="text-3xl md:text-4xl font-light text-white mb-4"
                          style={{ fontFamily: 'Playfair Display, serif' }}>
                        Curated Selection
                      </h3>
                      <p className="text-slate-400 text-lg">Discover more treasures from our exclusive collection</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {supportingProducts.map((item, index) => (
                        <div key={item.id} className="relative group">
                          <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-amber-400/30 transition-all duration-500 hover:shadow-xl">
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={false}
                              customImageUrl={item.customImageUrl}
                            />
                            {/* Price overlay */}
                            <div className="mt-4 flex items-center justify-between">
                              <div>
                                <h4 className="text-white font-medium" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {item.displayName || item.product.name}
                                </h4>
                                <p className="text-amber-400 font-semibold">
                                  {item.displayPrice || (selectedCurrency === 'INR' 
                                    ? `₹${item.product.priceInr?.toLocaleString()}` 
                                    : `BD ${Number(item.product.priceBhd)?.toFixed(3)}`)}
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-amber-400 hover:bg-amber-400/10 p-2 rounded-full"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className="text-center">
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:shadow-xl group"
                    onClick={() => window.location.href = '/collections'}
                  >
                    View Complete Collection
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
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