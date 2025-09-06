import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppLayout>
      <div>
        {reposError &&
          // TODO: env variable
          <a href="http://localhost:3000/github/install">
            Installer l'App GitHub pour lister vos dépôts
          </a>
        }

        <h3>Mes Déploiements</h3>
        <ul>
          {deployments?.map((dep) => (
            <li key={dep.id}>
              <strong>{dep.image_name}</strong> - Status: {dep.status}
              {dep.status === 'provisioning' && ' (création...)'}
              {dep.status === 'active' && dep.url && (
                <> - <a href={dep.url} target="_blank" rel="noopener noreferrer">Accéder à l'app</a> </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
