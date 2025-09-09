import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDeployments, createDeployment } from '@/features/deployments/api';

export const useDeployments = (page = 1, perPage = 10) => {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: () => getDeployments(page, perPage),
  });
};

export const useCreateDeployment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageName: string) => createDeployment(imageName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deployments'] });
    },
  });
};