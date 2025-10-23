import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Heart, Package, User, ShoppingBag, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import toysData from '@/data/toys.json';
import { z } from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().trim().max(500, { message: "Comment must be less than 500 characters" }),
});

const ToyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isFavorite: isToyFavorite, addToFavorites, removeFromFavorites, loadFavorites } = useFavorites();
  const navigate = useNavigate();
  const [toy, setToy] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [tryNowName, setTryNowName] = useState('');
  const [tryNowEmail, setTryNowEmail] = useState('');

  useEffect(() => {
    document.title = 'Toy Details | ToyTopia';
  }, []);

  useEffect(() => {
    fetchToyDetails();
  }, [id]);

  useEffect(() => {
    if (toy) {
      document.title = `${toy.name} | ToyTopia`;
    }
  }, [toy]);

  useEffect(() => {
    setIsFavorite(isToyFavorite(id));
  }, [isToyFavorite, id]);

  const fetchToyDetails = async () => {
    try {
      const foundToy = toysData.toys.find(t => t.id === id);
      if (!foundToy) {
        toast({
          title: "Toy not found",
          description: "The requested toy does not exist",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      
      setToy(foundToy);
      setReviews([]);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to continue",
      });
      navigate('/auth');
      return;
    }

    if (isFavorite) {
      const success = removeFromFavorites(id);
      if (success) {
        setIsFavorite(false);
        toast({ title: "Removed from favorites" });
      }
    } else {
      const success = addToFavorites(id);
      if (success) {
        setIsFavorite(true);
        toast({ title: "Added to favorites!" });
      }
    }
  };

  const submitReview = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to continue",
      });
      navigate('/auth');
      return;
    }

    try {
      reviewSchema.parse({ rating, comment });

      let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      
      if (editingReview) {
        reviews = reviews.map(review => 
          review.id === editingReview 
            ? { ...review, rating, comment, updatedAt: new Date().toISOString() } 
            : review
        );
        toast({ title: "Review updated!" });
        setEditingReview(null);
      } else {
        const newReview = {
          id: `review-${Date.now()}`,
          toyId: id,
          userId: user.uid,
          userEmail: user.email,
          rating,
          comment,
          createdAt: new Date().toISOString()
        };
        reviews.push(newReview);
        toast({ title: "Review submitted!" });
      }

      localStorage.setItem('reviews', JSON.stringify(reviews));
      setRating(5);
      setComment('');
      
      // Update local state with new reviews data
      const toyReviews = reviews.filter(r => r.toyId === id);
      setReviews(toyReviews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: "Please check your input",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred",
          variant: "destructive",
        });
      }
    }
  };

  const deleteReview = (reviewId) => {
    try {
      let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviews = reviews.filter(review => review.id !== reviewId);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      
      toast({ 
        title: "Review deleted"
      });
      
      // Update local state with new reviews data
      const toyReviews = reviews.filter(r => r.toyId === id);
      setReviews(toyReviews);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred",
        variant: "destructive",
      });
    }
  };

  const startEdit = (review) => {
    setEditingReview(review.id);
    setRating(review.rating);
    setComment(review.comment || '');
  };

  const cancelEdit = () => {
    setEditingReview(null);
    setRating(5);
    setComment('');
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (loading || !toy) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Loading toy details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Image */}
          <div>
            <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
              {toy.image ? (
                <img
                  src={toy.image}
                  alt={toy.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <Package className="h-16 sm:h-20 w-16 sm:w-20 text-gray-300" />
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge variant="secondary" className="text-xs sm:text-sm">{toy.category}</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold mt-2 mb-3 sm:mb-4">{toy.name}</h1>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        i < Math.floor(toy.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  ({toy.rating} from 0 reviews)
                </span>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base">
                {toy.description}
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {toy.age_group && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <User className="h-4 w-4" />
                  <span>Age Group: {toy.age_group}</span>
                </div>
              )}
              {toy.material && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Package className="h-4 w-4" />
                  <span>Material: {toy.material}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <ShoppingBag className="h-4 w-4" />
                <span>Stock: {toy.availableQuantity} available</span>
              </div>
            </div>

            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">Sold by</p>
                <p className="font-semibold text-sm sm:text-base">{toy.seller_name}</p>
                {toy.seller_info && (
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{toy.seller_info}</p>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <p className="text-2xl sm:text-3xl font-bold text-primary">
                ${toy.price.toFixed(2)}
              </p>
              <Button
                onClick={toggleFavorite}
                variant={isFavorite ? "default" : "outline"}
                size="lg"
                className="gap-2 text-sm sm:text-base px-4 py-5 sm:px-6"
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Button>
            </div>
          </div>
        </div>

        {/* Try Now Form */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Try This Toy Now
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={tryNowName}
                  onChange={(e) => setTryNowName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={tryNowEmail}
                  onChange={(e) => setTryNowEmail(e.target.value)}
                />
              </div>
            </div>
            <Button 
              className="w-full mt-3 sm:mt-4" 
              onClick={() => {
                if (!tryNowName.trim() || !tryNowEmail.trim()) {
                  toast({
                    title: "Form Error",
                    description: "Please fill in both name and email",
                    variant: "destructive",
                  });
                  return;
                }
                
                toast({
                  title: "Request Submitted!",
                  description: `Thank you ${tryNowName}, we'll contact you at ${tryNowEmail} about trying the ${toy.name}!`,
                });
                
                // Reset form
                setTryNowName('');
                setTryNowEmail('');
              }}
            >
              Submit Request
            </Button>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
              Customer Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Add Review Form */}
            {user && (
              <div className="p-3 sm:p-4 rounded-lg border border-dashed border-gray-300">
                <h3 className="font-semibold text-base mb-3 sm:mb-4">
                  {editingReview ? 'Edit Your Review' : 'Leave a Review'}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="flex gap-0.5 sm:gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${
                              star <= rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Comment (optional)</label>
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your experience with this toy..."
                      maxLength={500}
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={submitReview} className="text-sm">
                      {editingReview ? 'Update Review' : 'Submit Review'}
                    </Button>
                    {editingReview && (
                      <Button onClick={cancelEdit} variant="outline" className="text-sm">
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-3 sm:space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-muted-foreground py-3 sm:py-4 text-sm">
                  No reviews yet. Be the first to review this toy!
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-3 sm:p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 mb-2 sm:mb-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 mt-0.5">
                          <AvatarFallback className="text-xs sm:text-sm">
                            {review.userEmail.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">
                            {review.userEmail}
                          </p>
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
                      </div>
                      {user?.uid === review.userId && (
                        <div className="flex gap-1 sm:gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEdit(review)}
                            className="h-7 w-7 sm:h-8 sm:w-8 p-1.5"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteReview(review.id)}
                            className="text-destructive hover:text-destructive h-7 w-7 sm:h-8 sm:w-8 p-1.5"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {review.comment && (
                      <p className="text-muted-foreground text-sm">{review.comment}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 sm:mt-2">
                      Posted on {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ToyDetails;