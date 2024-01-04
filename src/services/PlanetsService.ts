import { ResponseDtoObject } from './model/ResponseDtoObject';
import { apiClient } from './axios';
import { PlanetResponse } from './model/PlanetsResponse';

const getPlanetList = async () => {
  const response = await apiClient.get<ResponseDtoObject<PlanetResponse[]>>('planets');

  return response.data;
};

const getPlanetDetails = async (id: string) => {
  const response = await apiClient.get<PlanetResponse>(`planets/${id}/`);
  return response.data;
};

const PlanetService = {
  getPlanetList,
  getPlanetDetails
};

export default PlanetService;
