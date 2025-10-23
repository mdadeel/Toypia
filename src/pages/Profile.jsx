import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Trash2, Heart, User, Image, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = 'My Profile | ToyTopia';
  }, []);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      navigate('/auth');
      return;
    }
    setName(user.displayName || user.email?.split('@')[0] || '');
    setPhotoURL(user.photoURL || '');
    fetchUserData();
  }, [user, authLoading, navigate]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      const userReviews = allReviews.filter(review => review.userId === user.uid);
      setReviews(userReviews);

      const allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const userFavoriteIds = allFavorites
        .filter(fav => fav.userId === user.uid)
        .map(fav => fav.toyId);
      
      const toysData = await import('@/data/toys.json');
      const favoriteToys = toysData.toys.filter(toy => userFavoriteIds.includes(toy.id));
      setFavorites(favoriteToys);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updatedUser = await updateProfile(name, photoURL);
      if (updatedUser) {
        setEditing(false);
        setName(updatedUser.displayName || updatedUser.email?.split('@')[0] || '');
        setPhotoURL(updatedUser.photoURL || '');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      let allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      allReviews = allReviews.filter(review => review.id !== reviewId);
      localStorage.setItem('reviews', JSON.stringify(allReviews));

      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
      fetchUserData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeFavorite = async (toyId) => {
    try {
      let allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      allFavorites = allFavorites.filter(fav => !(fav.toyId === toyId && fav.userId === user.uid));
      localStorage.setItem('favorites', JSON.stringify(allFavorites));

      toast({
        title: "Success",
        description: "Removed from favorites",
      });
      fetchUserData();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Loading your profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        {/* User Info - Editable Profile */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                  <AvatarImage src={photoURL || user?.photoURL} alt="Profile" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {(name || user?.displayName)?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 w-full text-center sm:text-left">
                {editing ? (
                  <div className="w-full space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-center text-sm sm:text-base"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photoURL">Photo URL</Label>
                      <Input
                        id="photoURL"
                        type="url"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="text-center text-sm sm:text-base"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                      <Button 
                        onClick={handleSaveProfile} 
                        disabled={saving}
                        className="gap-2 text-sm"
                      >
                        <Save className="h-4 w-4" />
                        {saving ? 'Saving...' : 'Save Profile'}
                      </Button>
                      <Button 
                        onClick={() => {
                          setEditing(false);
                          setName(user.displayName || user.email?.split('@')[0] || '');
                          setPhotoURL(user.photoURL || '');
                        }} 
                        variant="outline"
                        className="text-sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <CardTitle className="text-xl sm:text-2xl">
                      {name || user?.displayName || user?.email?.split('@')[0] || 'User'}!
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {user?.email}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Member since {new Date(user?.metadata?.creationTime || '').toLocaleDateString()}
                    </p>
                    <Button 
                      onClick={() => setEditing(true)} 
                      variant="outline" 
                      className="mt-2 gap-2 w-full sm:w-auto text-sm"
                    >
                      <User className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                My Reviews ({reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-3 sm:py-4 text-sm">
                  No reviews yet. Start reviewing toys!
                </p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="p-3 sm:p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base">Toy Review</h4>
                        <div className="flex items-center gap-0.5 sm:gap-1 my-0.5 sm:my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteReview(review.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 sm:h-8 sm:w-8 p-1.5"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                    {review.comment && (
                      <p className="text-xs sm:text-sm text-muted-foreground">{review.comment}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
                      Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 fill-current" />
                My Favorites ({favorites.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {favorites.length === 0 ? (
                <p className="text-center text-muted-foreground py-3 sm:py-4 text-sm">
                  No favorites yet. Start adding toys!
                </p>
              ) : (
                favorites.map((favorite) => (
                  <div key={favorite.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-gray-200">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      {favorite.image ? (
                        <img
                          src={favorite.image}
                          alt={favorite.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base">{favorite.name}</h4>
                      <p className="text-xs sm:text-sm text-primary font-medium">
                        ${favorite.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(favorite.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-7 w-7 sm:h-8 sm:w-8 p-1.5"
                    >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;