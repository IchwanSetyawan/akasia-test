import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { PlanetResponse } from 'services/model/PlanetsResponse';

interface WishlistContextProps {
  wishlist: PlanetResponse[];
  addToWishlist: (planet: PlanetResponse) => void;
  removeFromWishlist: (planetId: string) => void; // Memperbaiki definisi fungsi ini
}

const WishlistContext = createContext<WishlistContextProps>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {} // Memperbaiki ini
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<PlanetResponse[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem('wishlist');
    if (localData) {
      setWishlist(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (planet: PlanetResponse) => {
    setWishlist((currentWishlist) => {
      const isExisting = currentWishlist.some((item) => item.created === planet.created);
      if (!isExisting) {
        return [...currentWishlist, planet];
      }
      return currentWishlist;
    });
  };

  const removeFromWishlist = (planetId: string) => {
    setWishlist(wishlist.filter((item) => item.created !== planetId)); // Asumsi 'created' adalah identifikasi unik
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
