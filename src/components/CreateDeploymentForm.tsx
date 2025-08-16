import React, { useState } from 'react';
import { useCreateDeployment } from '@/hooks/useDeployments';

export const CreateDeploymentForm = () => {
  const [imageName, setImageName] = useState('');
  const mutation = useCreateDeployment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageName) return;
    mutation.mutate(imageName);
    setImageName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nouveau Déploiement</h3>
      <input
        type="text"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        placeholder="ex: nginx:latest"
        disabled={mutation.isPending}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Déploiement...' : 'Déployer'}
      </button>
      {mutation.isError && <p style={{ color: 'red' }}>Erreur: {mutation.error.message}</p>}
    </form>
  );
};