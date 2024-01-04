// pages/wishlist.tsx
import React, { useState } from 'react';
import Layout from 'components/Layout';
import PlanetCard from 'components/PlanetCard';
import { useWishlist } from 'context/WishlistContext';
import { PlanetResponse } from 'services/model/PlanetsResponse';
import Pagination from 'components/pagiantion';

const WishList: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <h1
        className="text-3xl font-semibold
       text-gray-800"
      >
        My Wishlist
      </h1>

      {wishlist.length === 0 && (
        <div className="text-center text-gray-400 h-[400px] flex justify-center items-center">
          Tidak ada wishlist
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 my-4">
        {currentItems.map((item: PlanetResponse, idx: number) => (
          <PlanetCard
            key={idx}
            climate={item.climate}
            diameter={item.diameter}
            gravity={item.gravity}
            name={item.name}
            orbital_period={item.orbital_period}
            population={item.population}
            terrain={item.terrain}
            onRemove={() => removeFromWishlist(item.created)}
            showRemoveButton={true}
          />
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={wishlist.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </Layout>
  );
};

export default WishList;
