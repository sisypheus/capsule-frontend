import api from '@/api/axios';

export interface Deployment {
  id: string;
  created_at: string;
  user_id: string;
  image_name: string;
  status: 'provisioning' | 'active' | 'destroyed';
  url: string | null;
}

export const getDeployments = async (): Promise<Deployment[]> => {
  const response = await api.get('/deployments');
  return response.data;
};

export const createDeployment = async (imageName: string): Promise<Deployment> => {
  const response = await api.post('/deployments', { imageName }, {withCredentials: true});
  return response.data;
};
