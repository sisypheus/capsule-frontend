import api from '@/api/axios';

export interface Deployment {
  id: string;
  created_at: string;
  user_id: string;
  image_name: string;
  status: 'provisioning' | 'active' | 'destroyed';
  url: string | null;
}

export type DeploymentDto = {
  project: string;
  project_name: string;
  branch?: string;
  dockerfile_path?: string;
  port?: number
}

export const getDeployments = async (page: number, perPage: number): Promise<any> => {
  const response = await api.get('/deployments?page=' + page + "&per_page=" + perPage);
  return response.data;
};

export const getDeployment = async (id: string): Promise<any> => {
  const response = await api.get('/deployments/' + id);
  return response.data;
};

export const createDeployment = async (deploymentDto: DeploymentDto): Promise<Deployment> => {
  const response = await api.post('/deployments', { ...deploymentDto }, { withCredentials: true });
  return response.data;
};
