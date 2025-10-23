import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Custom hook to manage favorites across the application
export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Load favorites for current user from localStorage
  const loadFavorites = () => {
    if (!user) {
      setFavorites([]);
      return;
    }

    try {
      const allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const userFavorites = allFavorites.filter(fav => fav.userId === user.uid);
      setFavorites(userFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  };

  // Add toy to favorites
  const addToFavorites = (toyId) => {
    if (!user) return false;

    try {
      let allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const existingIndex = allFavorites.findIndex(fav => 
        fav.toyId === toyId && fav.userId === user.uid
      );

      if (existingIndex === -1) {
        allFavorites.push({ 
          toyId, 
          userId: user.uid, 
          date: new Date().toISOString() 
        });
        localStorage.setItem('favorites', JSON.stringify(allFavorites));
        setFavorites(allFavorites.filter(fav => fav.userId === user.uid));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return false;
    }
  };

  // Remove toy from favorites
  const removeFromFavorites = (toyId) => {
    if (!user) return false;

    try {
      let allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      allFavorites = allFavorites.filter(fav => 
        !(fav.toyId === toyId && fav.userId === user.uid)
      );
      localStorage.setItem('favorites', JSON.stringify(allFavorites));
      setFavorites(allFavorites.filter(fav => fav.userId === user.uid));
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return false;
    }
  };

  // Check if a toy is in favorites
  const isFavorite = (toyId) => {
    return favorites.some(fav => fav.toyId === toyId);
  };

  // Get user's favorite toy IDs
  const getFavoriteToyIds = () => {
    return favorites.map(fav => fav.toyId);
  };

  // Initialize and set up local storage listener
  useEffect(() => {
    loadFavorites();
    
    const handleStorageChange = () => {
      // Only update if it's a favorites-related change
      if (localStorage.getItem('favorites')) {
        loadFavorites();
      }
    };

    // Listen for changes to localStorage (from other components/tabs)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteToyIds,
    loadFavorites,
    favoriteCount: favorites.length
  };
};