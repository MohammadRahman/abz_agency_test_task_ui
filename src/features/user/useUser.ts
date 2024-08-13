import { useQuery } from '@tanstack/react-query';
import { userService } from '../../services/users/users';
import toast from 'react-hot-toast';

export const useUser = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await userService.getUsers();
        if (response.data.length == 0) {
          const mockUsers = await userService.getMockUsers();
          toast.success('you are watching mock users!');
          return mockUsers.data;
        }
        toast.success('you are watching users from database!');
        return response.data;
      } catch (error) {
        throw new Error('Error');
      }
    },
    retry: 3,
    retryDelay: (attempt) => 120000,
  });
  return { users, isLoading };
};
