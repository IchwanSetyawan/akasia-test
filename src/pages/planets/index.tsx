import PlanetCard from 'components/PlanetCard';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import PlanetService from 'services/PlanetsService';
import { PlanetResponse } from 'services/model/PlanetsResponse';
import { ResponseDtoObject } from 'services/model/ResponseDtoObject';

const Planet = () => {
  const { data: dataList, isLoading: isLoadingList } = useQuery<
    ResponseDtoObject<PlanetResponse[]>
  >({
    queryKey: 'planets',
    queryFn: PlanetService.getPlanetList
  });

  const [visibleCount, setVisibleCount] = useState(2);
  const loaderRef = useRef(null);

  const loadMorePlanets = (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisibleCount((prevCount) => prevCount + 2);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(loadMorePlanets, {
      root: null,
      rootMargin: '20px',
      threshold: 0.5
    });

    const currentLoaderRef = loaderRef.current; // Menyalin referensi ke dalam variabel lokal
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef); // Menggunakan variabel lokal di fungsi bersih
      }
    };
  }, []); // Dependensi kosong berarti efek ini hanya dijalankan pada mount dan unmount

  return (
    <div className="flex justify-center h-auto mt-20">
      <div className="flex flex-col ">
        {isLoadingList ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-slate-100 rounded shadow p-4 w-[600px] flex flex-col gap-24">
            {dataList?.results.slice(0, visibleCount).map((item, idx) => (
              <Link key={idx} href={`/planets/${idx + 1}/`} passHref>
                <a>
                  <PlanetCard
                    climate={item.climate}
                    diameter={item.diameter}
                    gravity={item.gravity}
                    name={item.name}
                    orbital_period={item.orbital_period}
                    population={item.population}
                    terrain={item.terrain}
                    showRemoveButton={false}
                  />
                </a>
              </Link>
            ))}
          </div>
        )}
        <div ref={loaderRef} className="h-20 my-10 flex justify-center items-center">
          {visibleCount < (dataList?.results.length ?? 0) && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
};

export default Planet;
