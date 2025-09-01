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
import banglesImage from '@assets/bangles_hero.png';
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
      className="py-16 md:py-20 relative overflow-hidden" 
      data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
      style={{
        backgroundColor: '#c5a882',
        backgroundImage: `url(${newArrivalsBackgroundNew})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay - Lighter for better background visibility */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.title || 'New Arrivals'}
          </h2>
          <p className="text-lg md:text-xl font-light text-white/90 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            {section.description || 'New Arrivals Dropping Daily, Monday through Friday. Explore the Latest Launches Now!'}
          </p>
        </div>


        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            className="bg-white/90 backdrop-blur-sm border border-white/30 text-gray-800 px-8 py-3 text-lg font-medium rounded-full hover:bg-white hover:shadow-xl transition-all duration-300 shadow-lg" 
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            onClick={() => window.location.href = '/collections?category=new-arrivals'}
          >
            View All New Arrivals <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
    { name: 'Nosepins', image: noseJewelryImage, key: 'nose-jewelry' },
    { name: 'Bracelets', image: braceletsImage, key: 'bracelets' },
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
      <section className="pt-4 pb-6" data-testid="section-categories" style={{ background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)' }}>
        <div className="px-2 md:px-6 lg:px-8">
          {/* Horizontally Scrollable Categories */}
          <div 
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

      {/* Section Divider */}
      <div className="w-full border-t border-gray-200 my-8"></div>

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
                              showActions={true}
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

        // Mosaic layout rendering - Sophisticated jewelry store grid layout
        if (section.layoutType === 'mosaic') {
          return (
            <section 
              key={section.id} 
              className="py-12 md:py-20" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f5f1ec 0%, #ebe3d8 50%, #e0d5c7 100%)'
              }}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-8 md:mb-16">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title || 'Featured Collections'}
                  </h2>
                  {section.description && (
                    <p className="text-lg md:text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {section.description}
                    </p>
                  )}
                </div>
                
                {/* Revolutionary Mosaic Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  {/* Top Row - Two Large Blocks */}
                  
                  {/* Block 1: Bridal Collection */}
                  <div 
                    className="relative group cursor-pointer h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl"
                    onClick={() => handleViewAllClick('bridal-collections')}
                    style={{
                      background: 'linear-gradient(135deg, #8B6914 0%, #B8860B 50%, #DAA520 100%)'
                    }}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full -translate-x-16 -translate-y-16 md:-translate-x-24 md:-translate-y-24"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 md:w-36 md:h-36 bg-white rounded-full translate-x-12 translate-y-12 md:translate-x-18 md:translate-y-18"></div>
                    </div>
                    
                    {/* Lifestyle Image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent">
                      <img
                        src={bridalCollectionsImage}
                        alt="Bridal Collection"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-3 md:mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        BRIDAL COLLECTION
                      </h3>
                      <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 md:px-8 py-2 md:py-3 rounded-full font-medium text-sm md:text-base hover:bg-white transition-all duration-300 self-start shadow-lg">
                        SHOP NOW
                      </button>
                    </div>
                  </div>

                  {/* Block 2: Necklaces */}
                  <div 
                    className="relative group cursor-pointer h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl"
                    onClick={() => handleViewAllClick('necklaces')}
                    style={{
                      background: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 50%, #F5DEB3 100%)'
                    }}
                  >
                    {/* Product Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                      <img
                        src={necklacesImage}
                        alt="Premium Necklaces"
                        className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110 filter drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-800 mb-3 md:mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        NECKLACES
                      </h3>
                      <button className="bg-gray-800/90 backdrop-blur-sm text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-medium text-sm md:text-base hover:bg-gray-800 transition-all duration-300 self-start shadow-lg">
                        SHOP NOW
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Row - Three Equal Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  
                  {/* Block 3: Earrings */}
                  <div 
                    className="relative group cursor-pointer h-48 md:h-64 lg:h-72 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl"
                    onClick={() => handleViewAllClick('earrings')}
                    style={{
                      background: 'linear-gradient(135deg, #DEB887 0%, #F5DEB3 50%, #FFF8DC 100%)'
                    }}
                  >
                    {/* Product Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                      <img
                        src={earringsImage}
                        alt="Elegant Earrings"
                        className="max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110 filter drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 mb-2 md:mb-3 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        EARRINGS
                      </h3>
                    </div>
                  </div>

                  {/* Block 4: Festive Offers */}
                  <div className="relative group cursor-pointer h-48 md:h-64 lg:h-72 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br from-amber-600 via-orange-500 to-red-500">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-white rounded-full translate-x-10 -translate-y-10 md:translate-x-16 md:-translate-y-16"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full -translate-x-8 translate-y-8 md:-translate-x-12 md:translate-y-12"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 md:mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        FESTIVE
                      </h3>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-3 md:mb-4 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        OFFERS
                      </h3>
                      <button className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base hover:bg-white transition-all duration-300 shadow-lg">
                        SHOP NOW
                      </button>
                    </div>
                  </div>

                  {/* Block 5: Bangles */}
                  <div 
                    className="relative group cursor-pointer h-48 md:h-64 lg:h-72 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl"
                    onClick={() => handleViewAllClick('bangles')}
                    style={{
                      background: 'linear-gradient(135deg, #CD853F 0%, #D2691E 50%, #A0522D 100%)'
                    }}
                  >
                    {/* Lifestyle Image */}
                    <div className="absolute inset-0">
                      <img
                        src={banglesImage}
                        alt="Beautiful Bangles"
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 md:mb-3 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        BANGLES
                      </h3>
                    </div>
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
                          showActions={true}
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
                              showActions={true}
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

        // Magazine layout rendering - Editorial asymmetric design
        if (section.layoutType === 'magazine') {
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
                {/* Magazine Header */}
                <div className="flex flex-col lg:flex-row items-end justify-between mb-16 border-b-2 border-gray-300 pb-8">
                  <div>
                    <h2 className="text-5xl md:text-7xl font-light text-gray-800 leading-none" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {section.title}
                    </h2>
                    {section.description && (
                      <p className="text-lg font-light text-gray-600 mt-4 max-w-xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{section.description}</p>
                    )}
                  </div>
                  <div className="text-right mt-4 lg:mt-0">
                    <div className="text-sm text-gray-500 uppercase tracking-wider">Collection</div>
                    <div className="text-2xl font-light text-gray-700" style={{ fontFamily: 'Cormorant Garamond, serif' }}>2025</div>
                  </div>
                </div>
                
                {/* Magazine Grid */}
                <div className="grid grid-cols-12 gap-6">
                  {section.items.map((item, index) => {
                    // Create asymmetric layout pattern
                    const layouts = [
                      'col-span-12 md:col-span-8', // Large feature
                      'col-span-12 md:col-span-4', // Small sidebar
                      'col-span-12 md:col-span-6', // Medium
                      'col-span-12 md:col-span-6', // Medium
                      'col-span-12 md:col-span-4', // Small
                      'col-span-12 md:col-span-8', // Large
                    ];
                    
                    const layoutClass = layouts[index % layouts.length];
                    
                    return (
                      <div key={item.id} className={layoutClass}>
                        <div className="relative group h-full">
                          <div className={`bg-white rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl ${index === 0 ? 'md:min-h-96' : ''}`}>
                            <ProductCard
                              product={item.product}
                              currency={selectedCurrency}
                              showActions={true}
                            />
                            {index === 0 && (
                              <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide">
                                Editor's Choice
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        // Festival layout rendering - Elegant banner with product showcase
        if (section.layoutType === 'festival') {
          return (
            <section 
              key={section.id} 
              className="w-full relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {section.festivalImage ? (
                <div 
                  className="relative w-full min-h-[400px] md:min-h-[500px]"
                  style={{
                    backgroundImage: `url(${section.festivalImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-purple-900/60"></div>
                  
                  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                      
                      {/* Left side - Text content */}
                      <div className="relative z-20 text-left">
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
                          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-lg drop-shadow-sm">
                            {section.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Right side - Product showcase grid */}
                      <div className="relative z-10">
                        {section.items.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {section.items.slice(0, 6).map((item, index) => (
                              <div 
                                key={item.id}
                                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                onClick={() => handleViewAllClick(item.product.category)}
                              >
                                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                                  {/* Product Image */}
                                  <div className="aspect-square mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                                    <img
                                      src={item.product.images?.[0] || ringsImage}
                                      alt={item.product.name}
                                      className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                                    />
                                  </div>
                                  
                                  {/* Product Info */}
                                  <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                      <span className="text-amber-500 text-lg">₹</span>
                                      <span className="text-lg md:text-xl font-semibold text-gray-800">
                                        {item.product.priceInr?.toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-600 font-medium line-clamp-2">
                                      {item.product.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {[...Array(6)].map((_, index) => (
                              <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg border border-white/50">
                                <div className="aspect-square mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
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
                        
                        {/* Navigation Dots */}
                        <div className="flex justify-center mt-6 gap-2">
                          <div className="w-3 h-3 rounded-full bg-white/80"></div>
                          <div className="w-3 h-3 rounded-full bg-white/50"></div>
                          <div className="w-3 h-3 rounded-full bg-white/50"></div>
                        </div>
                        
                        {/* Call to Action Button */}
                        <div className="text-center mt-6">
                          <Button 
                            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white/70 px-6 md:px-8 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm" 
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
                      
                      {/* Right side - Product showcase grid */}
                      <div className="relative z-10">
                        {section.items.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {section.items.slice(0, 6).map((item, index) => (
                              <div 
                                key={item.id}
                                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                onClick={() => handleViewAllClick(item.product.category)}
                              >
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                                  {/* Product Image */}
                                  <div className="aspect-square mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
                                    <img
                                      src={item.product.images?.[0] || ringsImage}
                                      alt={item.product.name}
                                      className="w-full h-full object-contain transform transition-all duration-500 group-hover:scale-110"
                                    />
                                  </div>
                                  
                                  {/* Product Info */}
                                  <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-2">
                                      <span className="text-amber-500 text-lg">₹</span>
                                      <span className="text-lg md:text-xl font-semibold text-gray-800">
                                        {item.product.priceInr?.toLocaleString()}
                                      </span>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-600 font-medium line-clamp-2">
                                      {item.product.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {[...Array(6)].map((_, index) => (
                              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 md:p-4 shadow-lg border border-white/50">
                                <div className="aspect-square mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
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
                        
                        {/* Navigation Dots */}
                        <div className="flex justify-center mt-6 gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                          <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                          <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                        </div>
                        
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

        // Artistic layout rendering - Asymmetric creative collage
        if (section.layoutType === 'artistic') {
          return (
            <section 
              key={section.id} 
              className="py-20 md:py-32 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 25%, #fecfef 75%, #ff9a9e 100%)',
              }}
            >
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                  <h2 className="text-5xl md:text-8xl font-extralight text-gray-800 mb-6 tracking-widest" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title || 'ARTISTIC VISION'}
                  </h2>
                  <p className="text-gray-700 text-xl font-light max-w-3xl mx-auto">{section.description || 'Where creativity meets craftsmanship'}</p>
                </div>

                <div className="relative h-screen max-h-[800px]">
                  {section.items.slice(0, 8).map((item, index) => {
                    const positions = [
                      { top: '10%', left: '15%', rotate: '-15deg', size: 'w-48 h-64' },
                      { top: '5%', right: '20%', rotate: '12deg', size: 'w-56 h-72' },
                      { top: '35%', left: '5%', rotate: '8deg', size: 'w-44 h-56' },
                      { top: '40%', right: '10%', rotate: '-8deg', size: 'w-52 h-68' },
                      { bottom: '25%', left: '25%', rotate: '15deg', size: 'w-40 h-52' },
                      { bottom: '20%', right: '25%', rotate: '-12deg', size: 'w-48 h-60' },
                      { top: '55%', left: '45%', rotate: '5deg', size: 'w-36 h-48' },
                      { bottom: '45%', right: '45%', rotate: '-5deg', size: 'w-44 h-56' },
                    ];

                    const position = positions[index] || positions[0];

                    return (
                      <div 
                        key={item.id}
                        className={`absolute group cursor-pointer ${position.size} transition-all duration-700 hover:scale-110 hover:z-50`}
                        style={{
                          ...position,
                          transform: `rotate(${position.rotate})`,
                        }}
                      >
                        <div className="absolute inset-0 bg-black/20 rounded-2xl blur-lg transform translate-x-2 translate-y-2"></div>
                        
                        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform transition-all duration-700 group-hover:rotate-0">
                          <img
                            src={item.product.images?.[0] || [ringsImage, necklacesImage, earringsImage, pendantsImage][index % 4]}
                            alt={item.product.name}
                            className="w-full h-4/5 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="text-gray-800 font-light text-center text-sm">{item.product.name}</h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                      showActions={true}
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

      {/* New Arrivals */}
      {newArrivalProducts.length > 0 && (
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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
                  showActions={true}
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