import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

async function fetchUser() {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (err: any) {
    if (err.response?.status === 401) return null;
    throw err;
  }
}

export function useUser() {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: query.data ?? null,
    loading: query.isLoading,
    error: query.isError ? query.error : null,
    refetch: query.refetch,
  };
}