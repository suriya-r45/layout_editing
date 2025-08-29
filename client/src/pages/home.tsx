import { useState, useMemo } from 'react';
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

export default function Home() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('BHD');

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
    <div className="min-h-screen" data-testid="page-home" style={{ background: '#ffffff' }}>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={setSelectedCurrency}
      />

      {/* Categories Horizontal Scroll */}
      <section className="pt-4 pb-6" data-testid="section-categories" style={{ background: '#ffffff' }}>
        <div className="container mx-auto px-2 md:px-4">
          {/* Horizontally Scrollable Categories */}
          <div 
            className="flex overflow-x-auto scrollbar-hide gap-3 md:gap-4 pb-2"
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
                  className="text-[10px] md:text-xs lg:text-sm font-light text-center leading-tight text-gray-700 px-1 w-16 md:w-20 lg:w-24" 
                  style={{ 
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
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
        
        // Split layout rendering - Premium and sophisticated design
        if (section.layoutType === 'split') {
          return (
            <section 
              key={section.id} 
              className="py-20 px-4 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #f8f4f0 0%, #e8ddd4 50%, #d4c5a9 100%)',
              }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-amber-100/30 to-amber-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-rose-100/30 to-rose-200/20 rounded-full blur-3xl"></div>
              </div>

              {/* Gold Rings Images in Top Right Corner */}
              <div className="absolute top-12 right-12 z-20 opacity-80">
                <img
                  src={ringsImage}
                  alt="Gold Rings"
                  className="w-36 h-36 md:w-44 md:h-44 object-contain filter drop-shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-700"
                />
              </div>

              {/* Section Header with Better Typography */}
              <div className="relative z-10 text-left mb-16 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-gray-800 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {section.title || 'New Arrivals'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                      ✨ 300+ New Items
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-xl font-light leading-relaxed max-w-2xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {section.description || 'New Arrivals Dropping Daily, Monday through Friday, Explore the Latest Launches Now!'}
                </p>
              </div>
              
              {/* Premium Split Layout Container */}
              <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                  
                  {/* Left Half - Mangalsutra with Sophisticated Design */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[500px]"
                    onClick={() => handleViewAllClick('mangalsutra')}
                    style={{ 
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%)',
                    }}
                  >
                    {/* Decorative Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
                      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
                      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                    </div>
                    
                    <div className="relative z-10 p-12 h-full flex flex-col">
                      {/* Image Container with Better Positioning */}
                      <div className="flex-1 flex items-center justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl transform scale-110"></div>
                          <img
                            src={mangalsutraImage}
                            alt="Mangalsutra Collection"
                            className="relative max-w-full h-72 object-contain filter drop-shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                          />
                        </div>
                      </div>
                      
                      {/* Enhanced Text Section */}
                      <div className="text-left">
                        <h3 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          Mangalsutra
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-white to-white/50 rounded-full mb-3"></div>
                        <p className="text-white/80 text-lg font-light">Sacred jewelry for special moments</p>
                      </div>
                    </div>
                    
                    {/* Premium Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                  {/* Right Half - Pendants with Sophisticated Design */}
                  <div 
                    className="relative cursor-pointer group transition-all duration-500 hover:scale-[1.02] min-h-[500px]"
                    onClick={() => handleViewAllClick('pendants')}
                    style={{ 
                      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
                    }}
                  >
                    {/* Decorative Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-56 h-56 bg-white rounded-full translate-x-28 -translate-y-28"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 translate-y-20"></div>
                      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10 p-12 h-full flex flex-col">
                      {/* Image Container with Better Positioning */}
                      <div className="flex-1 flex items-center justify-center mb-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl transform scale-110"></div>
                          <img
                            src={pendantsImage}
                            alt="Pendants Collection"
                            className="relative max-w-full h-72 object-contain filter drop-shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:-rotate-2"
                          />
                        </div>
                      </div>
                      
                      {/* Enhanced Text Section */}
                      <div className="text-left">
                        <h3 className="text-4xl md:text-5xl font-light text-white mb-3 tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          Pendants
                        </h3>
                        <div className="w-20 h-1 bg-gradient-to-r from-white to-white/50 rounded-full mb-3"></div>
                        <p className="text-white/80 text-lg font-light">Elegant pieces for every occasion</p>
                      </div>
                    </div>
                    
                    {/* Premium Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-l from-green-600/0 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>

                </div>
                
                {/* Bottom Decorative Element */}
                <div className="text-center mt-8">
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">Discover Our Premium Collections</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        // Festival layout rendering - Ultra-professional and sophisticated design
        if (section.layoutType === 'festival') {
          return (
            <section 
              key={section.id} 
              className="py-20 relative overflow-hidden" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%)'
              }}
            >
              {/* Refined Background Decoration */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-tl from-rose-50/60 to-pink-50/40 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-gray-200/30 to-transparent rounded-full"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Professional Festival Layout */}
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                  
                  {/* Left: Enhanced Festival Hero Section */}
                  <div className="lg:col-span-3 relative">
                    {section.festivalImage ? (
                      <div className="relative group overflow-hidden rounded-2xl shadow-xl border border-gray-200/50">
                        <div 
                          className="h-96 lg:h-[500px] bg-cover bg-center relative"
                          style={{
                            backgroundImage: `url(${section.festivalImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          {/* Professional Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent"></div>
                          
                          {/* Content Section */}
                          <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-12">
                            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 max-w-md">
                              <h2 
                                className="text-3xl md:text-4xl lg:text-5xl font-extralight text-gray-800 mb-4 leading-tight"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                              >
                                {section.title}
                              </h2>
                              {section.subtitle && (
                                <p 
                                  className="text-lg md:text-xl text-gray-600 italic mb-4 font-light"
                                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                >
                                  {section.subtitle}
                                </p>
                              )}
                              {section.description && (
                                <p className="text-gray-700 text-base leading-relaxed mb-6">
                                  {section.description}
                                </p>
                              )}
                              
                              {/* Professional CTA */}
                              <div className="flex items-center justify-between">
                                <Button 
                                  className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                  onClick={() => window.location.href = '/collections'}
                                >
                                  Explore Collection
                                </Button>
                                <div className="text-right">
                                  <p className="text-xs text-gray-500 mb-1">Starting from</p>
                                  <p className="text-lg font-bold text-gray-800">₹15,000</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Premium Badge */}
                          <div className="absolute top-6 right-6">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/50">
                              <span className="text-gray-800 text-sm font-semibold">Trending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-96 lg:h-[500px] rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-12 shadow-xl border border-gray-200/50">
                        <h2 
                          className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-800 mb-4 text-center"
                          style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                          {section.title}
                        </h2>
                        {section.subtitle && (
                          <p 
                            className="text-xl md:text-2xl text-gray-600 italic text-center font-light"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                          >
                            {section.subtitle}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Professional Products Grid */}
                  <div className="lg:col-span-2 flex flex-col h-full">
                    {/* Elegant Header */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-extralight text-gray-800" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          Trending Now
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                          <span className="text-xs text-gray-500">Live</span>
                        </div>
                      </div>
                      <div className="w-full h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>
                    </div>

                    {/* Professional Products Container */}
                    <div className="flex-1">
                      <div 
                        className="grid grid-cols-2 gap-4 h-full overflow-y-auto scrollbar-hide max-h-96 pr-2"
                        style={{ 
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                        }}
                      >
                        {section.items.map((item) => {
                          const product = allProducts.find(p => p.id === item.productId);
                          if (!product) return null;
                          
                          return (
                            <div 
                              key={item.id} 
                              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer group border border-gray-100"
                            >
                              <div className="aspect-square relative overflow-hidden">
                                <img
                                  src={product.images[0] || '/api/placeholder/200/200'}
                                  alt={product.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                                  <span className="text-gray-700 text-xs">🤍</span>
                                </div>
                              </div>
                              <div className="p-4">
                                <h4 className="font-medium text-sm text-gray-900 leading-tight mb-3 line-clamp-2 min-h-[2.5rem]">
                                  {product.name}
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex items-baseline justify-between">
                                    <p className="text-lg font-bold text-gray-900">
                                      {selectedCurrency === 'INR' 
                                        ? `₹${product.priceInr.toLocaleString()}`
                                        : `BD ${product.priceBhd}`
                                      }
                                    </p>
                                    <p className="text-xs text-gray-500 line-through">
                                      {selectedCurrency === 'INR' 
                                        ? `₹${(Number(product.priceInr) * 1.25).toLocaleString()}`
                                        : `BD ${(Number(product.priceBhd) * 1.25).toFixed(3)}`
                                      }
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-1 text-gray-600">
                                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                                      <span>{product.grossWeight}g • {product.purity || '22K'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-amber-400">★</span>
                                      <span className="text-gray-500">4.8</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Professional Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-2">
                          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300">
                            <span className="text-gray-600 text-lg">‹</span>
                          </button>
                          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                            1
                          </div>
                          <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300">
                            <span className="text-gray-600 text-lg">›</span>
                          </button>
                        </div>
                        <span className="text-xs text-gray-500">{section.items.length} items</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] shadow-lg" 
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        onClick={() => window.location.href = '/collections'}
                      >
                        View All Collection
                      </Button>
                    </div>
                  </div>
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
              background: '#ffffff'
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
        <section className="py-12" data-testid="section-new-arrivals" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-gold-plated-silver-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-gold-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-silver-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-diamond-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-platinum-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-gemstone-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-pearl-collection" style={{ background: '#ffffff' }}>
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
        <section className="py-12" data-testid="section-other-collection" style={{ background: '#ffffff' }}>
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