import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PlanetResponse } from 'services/model/PlanetsResponse';
import { useQuery } from 'react-query';
import PlanetService from 'services/PlanetsService';
import Layout from 'components/Layout';
import { useWishlist } from 'context/WishlistContext';

const PlanetDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { wishlist, addToWishlist } = useWishlist();

  const { data: detailData, isLoading: isLoadingDetail } = useQuery(
    ['planetDetail', id],
    () => PlanetService.getPlanetDetails(id as string),
    {
      enabled: !!id,

      onError: (error) => {
        console.log(error);
      }
    }
  );

  useEffect(() => {
    if (detailData) {
      setIsInWishlist(wishlist.some((planet) => planet.created === detailData.created));
    }
  }, [detailData, wishlist]);

  const handleAddToWishlist = () => {
    if (detailData) {
      addToWishlist(detailData);
      setIsAddedToWishlist(true);
      alert('Wishlist berhasil ditambahkan');
    }
  };

  return (
    <Layout>
      {isLoadingDetail ? (
        <div className="container mx-auto p-4 flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="my-10">
            <button onClick={() => router.back()} className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
              <span className="font-bold">Kembali</span>
            </button>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <div className="my-4">
              <h1 className="text-3xl font-bold mb-4">{detailData?.name}</h1>
              <h2 className="text-2xl font-semibold mb-3">Planet Details</h2>
              <p>
                <strong>Climate:</strong> {detailData?.climate}
              </p>
              <p>
                <strong>Diameter:</strong> {detailData?.diameter} km
              </p>
              <p>
                <strong>Gravity:</strong> {detailData?.gravity}
              </p>
              <p>
                <strong>Orbital Period:</strong> {detailData?.orbital_period} days
              </p>
              <p>
                <strong>Population:</strong> {detailData?.population}
              </p>
              <p>
                <strong>Rotation Period:</strong> {detailData?.rotation_period} hours
              </p>
              <p>
                <strong>Surface Water:</strong> {detailData?.surface_water}%
              </p>
              <p>
                <strong>Terrain:</strong> {detailData?.terrain}
              </p>
              <p>
                <strong>Created date:</strong> {detailData?.created}
              </p>
            </div>
            <hr />
            <div className="flex justify-end mt-5">
              <button
                className={`flex items-center gap-4 ${
                  isInWishlist ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => !isInWishlist && detailData && addToWishlist(detailData)}
                disabled={isInWishlist}
              >
                <span className="font-bold">
                  {isInWishlist ? 'Telah ditambahkan ke wishlist' : 'Tambah ke wishlist'}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={isAddedToWishlist ? 'red' : 'none'}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={isAddedToWishlist ? 'red' : 'currentColor'}
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlanetDetail;
