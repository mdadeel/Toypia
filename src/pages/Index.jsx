import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModernToyCard from '@/components/ModernToyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Star, ChevronLeft, ChevronRight, ShoppingBag, Truck, Shield, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useToyFilter } from '@/hooks/useToyFilter';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import toysData from '@/data/toys.json';

const categories = [
  'All Categories',
  'Building Blocks',
  'Plush',
  'Puzzles',
  'Educational',
  'Outdoor',
  'Arts & Crafts',
  'Action Figures',
  'Board Games'
];

const Index = () => {
  const toys = toysData.toys;
  const {
    filteredToys,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    resetFilters
  } = useToyFilter(toys);
  const [visibleToysCount, setVisibleToysCount] = useState(8);

  useEffect(() => {
    document.title = 'ToyTopia - Local Kids Toy Store';
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleToysCount(8);
  }, [searchQuery, selectedCategory]);

  const scrollToToys = () => {
    const toysSection = document.getElementById('toys-section');
    if (toysSection) {
      toysSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-white border-b-4 border-blue-500">
        <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-blue-50 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg border-2 border-blue-200">
                <span className="text-xl sm:text-2xl">🇧🇩</span>
                <span className="text-xs sm:text-sm font-semibold text-blue-700">Bangladesh's Trusted Toy Store</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-tight">
                Welcome to
                <span className="block text-blue-600 mt-1 sm:mt-2">ToyTopia</span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-[100%] sm:max-w-xl">
                Discover amazing toys from local sellers in <span className="font-bold text-gray-900">Chittagong</span>. Quality products for happy children! 🎉
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button 
                  onClick={scrollToToys}
                  size="lg"
                  className="px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg shadow-lg"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                  Shop Now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-3 sm:pt-6">
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-yellow-700 mb-0.5 sm:mb-1">{toys.length}+</div>
                  <div className="text-xs sm:text-sm font-semibold text-yellow-600">Toys Available</div>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-green-700 mb-0.5 sm:mb-1">100%</div>
                  <div className="text-xs sm:text-sm font-semibold text-green-600">Quality</div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-black text-purple-700 mb-0.5 sm:mb-1">24/7</div>
                  <div className="text-xs sm:text-sm font-semibold text-purple-600">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border-4 border-blue-300">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {toys.slice(0, 4).map((toy) => (
                    <div 
                      key={toy.id}
                      className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl"
                    >
                      <div className="relative">
                        <img 
                          src={toy.image} 
                          alt={toy.name}
                          className="w-full h-20 sm:h-24 md:h-32 object-cover rounded-lg sm:rounded-xl mb-1.5 sm:mb-2"
                        />
                        <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-1 py-0.5 sm:px-2 sm:py-1 rounded-full">
                          ⭐ {toy.rating}
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 text-xs sm:text-xs mb-0.5 truncate">{toy.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-black text-sm">${toy.price}</span>
                        <span className="text-xs sm:text-xs text-gray-500">{toy.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 sm:mt-6 text-center">
                  <Link to="/all-toys">
                    <Button className="w-full text-sm sm:text-base">
                      View All Toys →
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="absolute -top-2.5 sm:-top-3 md:-top-4 -right-2.5 sm:-right-3 md:-right-4 bg-yellow-400 text-yellow-900 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-full font-black text-xs sm:text-sm shadow-lg border-3 border-yellow-500 hidden md:block">
                🎁 Special Offers!
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 md:p-6 flex items-center gap-2.5 sm:gap-3 md:gap-4">
              <div className="bg-blue-600 p-2.5 sm:p-3 md:p-4 rounded-xl">
                <Truck className="h-4 sm:h-5 md:h-7 w-4 sm:w-5 md:w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">Fast Delivery</h3>
                <p className="text-xs sm:text-sm md:text-sm text-gray-600">Across Chittagong</p>
              </div>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-5 md:p-6 flex items-center gap-2.5 sm:gap-3 md:gap-4">
              <div className="bg-green-600 p-2.5 sm:p-3 md:p-4 rounded-xl">
                <Shield className="h-4 sm:h-5 md:h-7 w-4 sm:w-5 md:w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">Quality Assured</h3>
                <p className="text-xs sm:text-sm md:text-sm text-gray-600">100% Authentic</p>
              </div>
            </div>
            
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 sm:p-5 md:p-6 flex items-center gap-2.5 sm:gap-3 md:gap-4">
              <div className="bg-purple-600 p-2.5 sm:p-3 md:p-4 rounded-xl">
                <ShoppingBag className="h-4 sm:h-5 md:h-7 w-4 sm:w-5 md:w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">Local Store</h3>
                <p className="text-xs sm:text-sm md:text-sm text-gray-600">Visit us in Agrabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Featured Toys</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={12}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
            className="pb-8"
          >
            {toys.slice(0, 6).map((toy) => (
              <SwiperSlide key={`slider-${toy.id}`}>
                <div className="bg-white rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-48 sm:h-56 overflow-hidden">
                    {toy.image ? (
                      <img 
                        src={toy.image} 
                        alt={toy.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <Star className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-base sm:text-lg mb-1">{toy.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 sm:h-4 w-3.5 sm:w-4 ${
                            i < Math.floor(toy.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs sm:text-sm text-gray-600 ml-1">({toy.rating})</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-lg sm:text-xl font-bold text-primary">${toy.price.toFixed(2)}</span>
                      <Link 
                        to={`/toy/${toy.id}`} 
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-primary/90"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next absolute right-2 sm:right-4 top-1/2 z-10 text-gray-700 !w-8 sm:!w-10 !h-8 sm:!h-10 !rounded-full !border !border-gray-300 !bg-white !flex !items-center !justify-center hover:!bg-gray-50">
              <ChevronRight className="!h-4 sm:!h-5 !w-4 sm:!w-5" />
            </div>
            <div className="swiper-button-prev absolute left-2 sm:left-4 top-1/2 z-10 text-gray-700 !w-8 sm:!w-10 !h-8 sm:!h-10 !rounded-full !border !border-gray-300 !bg-white !flex !items-center !justify-center hover:!bg-gray-50">
              <ChevronLeft className="!h-4 sm:!h-5 !w-4 sm:!w-5" />
            </div>
          </Swiper>
        </div>
      </section>

      <main id="toys-section" className="flex-1 container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="mb-8 sm:mb-10 md:mb-12 space-y-5 sm:space-y-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Find Your Perfect Toy
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Search our toy collection
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 h-10 sm:h-12 text-sm sm:text-base rounded-lg border-gray-300 focus:border-primary"
              />
            </div>

            <div className="relative flex-1 sm:w-64">
              <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 sm:h-5 w-4 sm:w-5 text-gray-400 z-10 pointer-events-none" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-10 sm:h-12 pl-10 sm:pl-12 text-sm sm:text-base rounded-lg border-gray-300 focus:border-primary">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Showing <span className="font-semibold text-primary">{filteredToys.length}</span> toys
              {selectedCategory !== 'All Categories' && (
                <> in <span className="font-semibold text-primary">{selectedCategory}</span></>
              )}
            </p>
          </div>
        </div>

        {/* Toys Grid */}
        {filteredToys.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              No Toys Found
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Try adjusting your search or filters
            </p>
            <Button onClick={resetFilters} size="sm">
              Reset Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {filteredToys.slice(0, visibleToysCount).map((toy) => (
                <ModernToyCard
                  key={toy.id}
                  toy={toy}
                />
              ))}
            </div>
            
            {filteredToys.length > visibleToysCount && (
              <div className="text-center mt-6 sm:mt-8">
                <Button
                  onClick={() => setVisibleToysCount(prev => prev + 8)}
                  size="lg"
                  className="px-6 py-5 text-base sm:text-lg"
                >
                  Load More Toys
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;