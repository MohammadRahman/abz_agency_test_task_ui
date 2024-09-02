import { useQuery } from '@tanstack/react-query';
import { tokenService } from '../../services/token/token';
import toast from 'react-hot-toast';

export const usetoken = (enabled = false) => {
  const {
    data: token,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      try {
        const response = await tokenService.getToken();
        localStorage.setItem('token', response.data.token);
        toast.success('token added successfuly.');
        return response.data.token;
      } catch (error) {
        throw new Error('Error');
      }
    },

    enabled,
  });
  return { token, isLoading, isFetched };
};
