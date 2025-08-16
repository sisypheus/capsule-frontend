import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDeployments, createDeployment } from '@/features/deployments/api';

export const useDeployments = () => {
  return useQuery({
    queryKey: ['deployments'],
    queryFn: getDeployments,
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