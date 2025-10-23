import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ModernToyCard from '@/components/ModernToyCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useToyFilter } from '@/hooks/useToyFilter';
import toysData from '@/data/toys.json';

const categories = [
  'All Categories',
  'Building Blocks',
  'Plush',
  'Stuffed Animals',
  'Puzzles',
  'Arts & Crafts',
  'Vehicles & Playsets',
  'Action Figures',
  'Educational',
  'Musical Instruments',
  'Outdoor',
  'Board Games'
];

const AllToys = () => {
  const toys = toysData.toys || [];
  const {
    filteredToys,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    resetFilters
  } = useToyFilter(toys);

  useEffect(() => {
    document.title = 'All Toys | ToyTopia';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-blue-600 text-white py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">All Toys Collection</h1>
          <p className="text-base sm:text-lg text-blue-100">Browse our complete collection of {toys.length} amazing toys</p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="mb-8 sm:mb-10 md:mb-12 space-y-5 sm:space-y-6">
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

        {filteredToys.length === 0 ? (
          <div className="text-center py-10 sm:py-16">
            <p className="text-lg sm:text-xl text-gray-500 mb-3 sm:mb-4">No toys found matching your criteria</p>
            <Button onClick={resetFilters} size="lg" className="px-6 py-5 text-base sm:text-lg">
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {filteredToys.map((toy) => (
              <ModernToyCard key={toy.id} toy={toy} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllToys;
