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

export const getRepos = async (): Promise<Deployment[]> => {
  const response = await api.get('/github/repos');
  return response.data;
};

// export const connectRepos = async (imageName: string): Promise<Deployment> => {
//   const response = await api.post('/deployments', { imageName }, {withCredentials: true});
//   return response.data;
// };
