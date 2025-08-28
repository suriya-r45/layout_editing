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

      {/* Custom Admin Sections */}
      {homeSections.length > 0 && homeSections.map((section) => {
        if (section.items.length === 0) return null;
        
        // Split layout rendering
        if (section.layoutType === 'split') {
          const leftItems = section.items.slice(0, Math.ceil(section.items.length / 2));
          const rightItems = section.items.slice(Math.ceil(section.items.length / 2));
          
          return (
            <section 
              key={section.id} 
              className="py-16 relative" 
              data-testid={`section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ background: '#f5f5f0' }}
            >
              {/* Section Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-gray-700 mb-4">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto font-light">
                    {section.description}
                  </p>
                )}
              </div>
              
              {/* Split Layout Container */}
              <div className="flex flex-col md:flex-row h-auto md:h-96">
                {/* Left Section */}
                <div 
                  className="flex-1 relative overflow-hidden flex items-center justify-center p-8"
                  style={{ backgroundColor: section.splitLeftColor || '#E0F2FE' }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-6">
                      {section.splitLeftTitle || 'Category 1'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {leftItems.slice(0, 4).map((item) => (
                        <div key={item.id} className="transform hover:scale-105 transition-transform duration-300">
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
                
                {/* Right Section */}
                <div 
                  className="flex-1 relative overflow-hidden flex items-center justify-center p-8"
                  style={{ backgroundColor: section.splitRightColor || '#F0FDF4' }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-6">
                      {section.splitRightTitle || 'Category 2'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      {rightItems.slice(0, 4).map((item) => (
                        <div key={item.id} className="transform hover:scale-105 transition-transform duration-300">
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">
                  {section.title}
                </h2>
                {section.description && (
                  <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">{section.description}</p>
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
                  className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                  onClick={() => window.location.href = '/collections'}
                >
                  View All <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </div>
            </div>
          </section>
        );
      })}

      {/* New Arrivals */}
      {newArrivalProducts.length > 0 && (
        <section className="py-12" data-testid="section-new-arrivals" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">New Arrivals</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Latest additions to our collection</p>
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
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?category=new-arrivals'}
              >
                View All New Arrivals <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Gold Plated Silver Collection */}
      {goldPlatedSilverProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-plated-silver-collection" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Gold Plated Silver</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Affordable luxury with gold plated silver elegance</p>
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
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=gold-plated-silver'}
              >
                View Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Material-Based Sections - Always show these regardless of custom sections */}
      
      {/* Gold Collection */}
      {goldProducts.length > 0 && (
        <section className="py-12" data-testid="section-gold-collection" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Gold Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Exquisite gold jewelry crafted to perfection</p>
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
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=gold'}
              >
                View Gold Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Silver Collection */}
      {silverProducts.length > 0 && (
        <section className="py-12" data-testid="section-silver-collection" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Silver Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Elegant silver jewelry for every occasion</p>
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
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
                onClick={() => window.location.href = '/collections?material=silver'}
              >
                View Silver Collection <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Diamond Collection */}
      {diamondProducts.length > 0 && (
        <section className="py-12" data-testid="section-diamond-collection" style={{ background: '#ffffff' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Diamond Collection</h2>
              <p className="text-base text-gray-500 max-w-2xl mx-auto font-light">Brilliant diamonds for life's special moments</p>
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
                className="bg-white border border-gray-200 text-gray-600 px-6 py-2 text-sm font-light rounded hover:bg-gray-50 transition-colors duration-200" 
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Platinum Collection</h2>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Gemstone Collection</h2>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Pearl Collection</h2>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-700 mb-4">Other Materials Collection</h2>
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