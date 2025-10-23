import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Package, Heart, ShoppingBag, User, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toysData from '@/data/toys.json';

const Favorites = () => {
  const { user, loading: authLoading } = useAuth();
  const { favorites: favoriteIds, removeFromFavorites, loadFavorites, favoriteCount } = useFavorites();
  const [favoriteToys, setFavoriteToys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'My Favorites | ToyTopia';
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      const favoriteToys = toysData.toys.filter(toy => favoriteIds.map(fav => fav.toyId).includes(toy.id));
      setFavoriteToys(favoriteToys);
    } catch (error) {
      toast({
        title: "Error loading favorites",
        description: "Could not load your favorite toys",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, authLoading, favoriteIds]);

  const handleRemoveFavorite = (toyId, toyName) => {
    const success = removeFromFavorites(toyId);
    if (success) {
      toast({
        title: "Removed from favorites",
        description: `${toyName} is no longer in your favorites`,
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center">
            <p>Loading your favorites...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Favorites</h1>
            <p className="text-muted-foreground mb-8">
              Please log in to view your favorite toys
            </p>
            <div className="inline-flex gap-4">
              <button 
                onClick={() => window.location.href = '/auth'}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center">
            <p>Loading your favorites...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 sm:mb-3">
            My Favorite Toys
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {favorites.length > 0 
              ? `You have ${favorites.length} favorite toys saved` 
              : "You haven't added any toys to favorites yet"}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="relative inline-block mb-4 sm:mb-6">
              <Heart className="h-16 sm:h-24 w-16 sm:w-24 text-muted-foreground/30 mx-auto" />
              <div className="absolute inset-0 bg-muted-foreground/10 blur-2xl rounded-full" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No Favorites Yet</h3>
            <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6">
              Start exploring our toy collection and add your favorites here!
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-primary text-primary-foreground px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-primary/90 transition-colors text-sm sm:text-base"
            >
              Browse Toys
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((toy, index) => (
              <Card 
                key={toy.id} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 flex flex-col"
              >
                <div className="relative">
                  {toy.image ? (
                    <img
                      src={toy.image}
                      alt={toy.name}
                      className="w-full h-36 sm:h-40 md:h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-36 sm:h-40 md:h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <Package className="h-8 sm:h-12 w-8 sm:w-12 text-muted-foreground/30" />
                    </div>
                  )}
                  <button 
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    onClick={() => {
                      let userFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                      userFavorites = userFavorites.filter(fav => !(fav.toyId === toy.id && fav.userId === user.uid));
                      localStorage.setItem('favorites', JSON.stringify(userFavorites));
                      
                      // Update state
                      setFavorites(prev => prev.filter(favToy => favToy.id !== toy.id));
                      
                      toast({
                        title: "Removed from favorites",
                        description: `${toy.name} is no longer in your favorites`,
                      });
                    }}
                  >
                    <Heart className="h-3 sm:h-4 w-3 sm:w-4 fill-current" />
                  </button>
                </div>
                
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg line-clamp-1">{toy.name}</CardTitle>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(toy.rating)
                              ? 'fill-accent text-accent'
                              : 'text-muted-foreground/50'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground">({toy.rating})</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                      <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{toy.availableQuantity} available</span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Age: {toy.age_group}</span>
                    </div>
                    
                    <Badge variant="secondary" className="w-fit text-xs sm:text-sm">
                      {toy.category}
                    </Badge>
                    
                    <div className="flex items-center justify-between pt-2 sm:pt-3">
                      <span className="text-xl sm:text-2xl font-bold text-primary">
                        ${toy.price.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => window.location.href = `/toy/${toy.id}`}
                        className="bg-primary text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-primary/90 transition-colors text-xs sm:text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;