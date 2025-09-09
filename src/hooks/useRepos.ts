import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRepos } from '@/features/repo/api';

export const useRepos = (page = 1, perPage = 12) => {
  return useQuery({
    queryKey: ['repos', pageXOffset, perPage],
    queryFn: () => getRepos(page, perPage),
    staleTime: 1000 * 60 * 2,
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