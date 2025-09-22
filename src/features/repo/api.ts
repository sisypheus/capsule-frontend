import api from '@/api/axios';

// TODO: update type from supabase schema
export interface Deployment {
  id: string;
  created_at: string;
  user_id: string;
  image_name: string;
  status: 'provisioning' | 'active' | 'destroyed';
  url: string | null;
}

export const getRepos = async (page: any, perPage: any): Promise<Deployment[]> => {
  const response = await api.get('/github/repos' + "?page=" + page + "&per_page=" + perPage);
  return response.data;
};

export const searchRepos = async (search: string, page: any, perPage: any): Promise<Deployment[]> => {
  const response = await api.get('/github/repos' + "?search=" + search + "?page=" + page + "&per_page=" + perPage);
  return response.data;
};
