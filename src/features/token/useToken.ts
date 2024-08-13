import { useQuery } from '@tanstack/react-query';
import { tokenService } from '../../services/token/token';

export const usetoken = (enabled = false) => {
  const { data: token, isLoading } = useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      try {
        const response = await tokenService.getToken();
        localStorage.setItem('token', response.data.token);
        return response.data.token;
      } catch (error) {
        throw new Error('Error');
      }
    },
    enabled,
  });
  return { token, isLoading };
};
