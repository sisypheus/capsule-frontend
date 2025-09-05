import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRepos } from '@/features/repo/api';

export const useRepos = () => {
  return useQuery({
    queryKey: ['repos'],
    queryFn: getRepos,
  });
};

export const useGetRepos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repos'] });
    },
  });
};