import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Eye, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ModernToyCard = ({ toy }) => {
  const { id, name, description, price, image, category, rating = 0 } = toy;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="rounded-lg sm:rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <div className="aspect-square overflow-hidden bg-gray-100">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <ShoppingBag className="h-12 sm:h-16 w-12 sm:w-16 text-gray-300" />
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-grow flex flex-col">
        {category && (
          <Badge variant="secondary" className="text-xs sm:text-xs w-fit">
            {category}
          </Badge>
        )}

        <h3 className="font-semibold text-base sm:text-lg line-clamp-1">{name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 ml-0.5 sm:ml-1">({rating.toFixed(1)})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg sm:text-xl font-bold text-primary">${price.toFixed(2)}</span>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isFavorite ? 'fill-current text-red-500' : 'text-gray-400'}`} />
            </button>
            
            <Link to={`/toy/${id}`}>
              <Button size="sm" variant="outline" className="text-xs sm:text-xs px-2 py-1 sm:px-3 sm:py-1">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ModernToyCard;
