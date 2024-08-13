import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const url = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions';

export const usePosition = () => {
  const { data: positions, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await axios.get(url);
        return response.data.positions;
      } catch (error) {
        throw new Error('Error');
      }
    },
  });
  return { positions, isLoading };
};
