import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { tokenService } from '../../services/token/token';
import { userService } from '../../services/users/users';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isPending: isCreating } = useMutation({
    mutationKey: ['user'],
    mutationFn: async (data: any) => {
      const accessToken = tokenService.getLocalStorageToken();
      if (accessToken) {
        try {
          const response = await userService.createUser(data, accessToken);
          if (response.data.success) {
            return response.data.user;
          } else {
            throw new Error(response.data.message);
          }
        } catch (error: any) {
          // Throw the error to be caught by onError
          throw new Error(error.response?.data?.message || error.message);
        }
      } else {
        throw new Error('No access token found');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('New user created successfully.');
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return { createUser, isCreating };
}
