import React from 'react';

type PlanetProps = {
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  onRemove?: () => void;
  showRemoveButton?: boolean;
};

const PlanetCard: React.FC<PlanetProps> = ({
  name,
  climate,
  terrain,
  population,
  diameter,
  gravity,
  orbital_period,
  onRemove,
  showRemoveButton
}) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-xl mb-2">Planet: {name}</div>
          <div className="flex justify-between">
            <div className="text-gray-700 text-base">Climate:</div>
            <div className="text-gray-700 text-base">{climate}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-700 text-base">Terrain:</div>
            <div className="text-gray-700 text-base">{terrain}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-700 text-base">Population:</div>
            <div className="text-gray-700 text-base">{population}</div>
          </div>
        </div>
      </div>

      <hr />
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Diameter: {diameter}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Gravity: {gravity}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Orbital Periode: {orbital_period}
        </span>
      </div>
      {showRemoveButton && onRemove && (
        <>
          <hr />
          <div className="flex justify-end my-4">
            <button className="bg-red-500 text-white rounded-md p-2" onClick={onRemove}>
              Hapus
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlanetCard;
