import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Button } from './Button'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}

// {
//   id: 4,
//   href: '#',
//   projectName: 'api.protocol.chat',
//   teamName: 'Protocol',
//   status: 'error',
//   statusText: 'Failed to deploy 6d ago',
//   description: 'Deploys from GitHub',
//   environment: 'Preview',
// }

export default function Deployments({ deployments, show = 5, emptyAction, onShowMore, footer, isLoading }: any) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  if (isLoading)
    return <SkeletonDeployments show={show}/>

  const visible = deployments.slice(0, show);

  if (!deployments || deployments.length === 0) {
    return (
      <div className="text-center">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="mx-auto h-12 w-12 text-gray-400"
        >
          <path
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No deployments</h3>
        <p className="mt-1 text-sm text-gray-500">Create a new one from the projects page</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={emptyAction}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            <ArrowRightIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
            Deploy project
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ul role="list" className="divide-y divide-white/5">
        {visible.map((deployment: any) => (
          <li key={deployment.id} className="relative flex items-center space-x-4 py-4">
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div className={classNames(statuses[deployment.status], 'flex-none rounded-full p-1')}>
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                  <a href={deployment.href} className="flex gap-x-2">
                    <span className="truncate text-gray-800">{deployment.name}</span>
                    <span className="text-gray-800">/</span>
                    <span className="whitespace-nowrap text-gray-800">{deployment.id}</span>
                    <span className="absolute inset-0" />
                  </a>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-500">
                <p className="truncate">{deployment.description}</p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="whitespace-nowrap">{deployment.statusText}</p>
              </div>
            </div>
            <div
              className={classNames(
                environments[deployment.environment],
                'flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
              )}
            >
              {deployment.environment}
            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </li>
        ))}
      </ul >
      {
        footer ? (
          <div className="w-full flex items-center justify-center py-8">{footer}</div>
        ) : onShowMore && deployments.length > show ? (
          <div className="w-full flex items-center justify-center py-8">
            <Button onClick={onShowMore} className="cursor-pointer">
              Show more
            </Button>
          </div>
        ) : null
      }
    </>
  )
}

export function SkeletonDeployments({show = 5}) {
  return (
    <ul role="list" className="divide-y divide-white/5">
      {Array.from({length: show}).map((placeholder: any, index: number) => (
        <li key={index} className="relative flex items-center space-x-4 py-4">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div>
                <div className="h-2 w-2 rounded-full bg-gray-200 animate-pulse" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <div className="flex gap-x-2">
                  <span className="truncate text-gray-200 animate-pulse w-32 rounded-2xl bg-gray-200"></span>
                  <span className="text-gray-200">/</span>
                  <span className="whitespace-nowrap text-gray-200 animate-pulse w-32 rounded-2xl bg-gray-200"></span>
                  <span className="absolute inset-0" />
                </div>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-200">
              <p className="truncate animate-pulse bg-gray-200"></p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="whitespace-nowrap animate-pulse bg-gray-200"></p>
            </div>
          </div>
          <div
            className="flex-none rounded-full px-2 py-1 text-xs font-medium animate-pulse bg-gray-200"
          >
          </div>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-200 animate-pulse bg-gray-200 rounded-2xl" />
        </li>
      ))}
    </ul >
  )
}