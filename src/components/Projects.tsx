import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from './Button';
import { Link } from '@tanstack/react-router';

const clients = [
  {
    id: 1,
    name: 'Tuple',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/tuple.svg',
    lastInvoice: { date: 'December 13, 2022', dateTime: '2022-12-13', amount: '$2,000.00', status: 'Overdue' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  },
  {
    id: 4,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  }
]

export default function Projects({ projects, emptyAction, show = 5, onShowMore, footer, isLoading}: any) {

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  if (isLoading)
    return <SkeletonProjects show={show}/>

  if (!projects || projects.length === 0) {
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
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by allowing access to github.</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={emptyAction}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
          >
            <PlusIcon aria-hidden="true" className="-ml-0.5 mr-1.5 h-5 w-5" />
            Allow access
          </button>
        </div>
      </div>
    );
  }

  const visible = projects.slice(0, show);

  return (
    <>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {visible.map((project: any) => (
          <li key={project.id} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <img
                alt={project.name}
                src={project.icon}
                className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
              />
              <div className="text-sm font-medium leading-6 text-gray-900">{project.name}</div>

              <Menu as="div" className="relative ml-auto">
                <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
                </MenuButton>
                <MenuItems
                  className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem>
                    {() => (
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        View<span className="sr-only">, {project.name}</span>
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {() => (
                      <Link to="/deploy"
                      state={{project: project}}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        Deploy
                      </Link>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Full name</dt>
                <dd className="text-gray-700">
                  <time dateTime={project.lastInvoice?.dateTime}>{project.lastInvoice?.date}</time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Status</dt>
                <dd className="flex items-start gap-x-2">
                  <span>{project?.private ? "🔒" : "🔓"}</span>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {footer ? (
        <div className="w-full flex items-center justify-center py-8">{footer}</div>
      ) : onShowMore && projects.length > show ? (
        <div className="w-full flex items-center justify-center py-8">
          <Button onClick={onShowMore} className="cursor-pointer">
            Show more
          </Button>
        </div>
      ) : null}
    </>
  );
}

export function SkeletonProjects({show = 3}) {
  console.log(show)
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
      {Array.from({length: show}).map((project: any, index: number) => (
        <li key={index} className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
            <img
              className="h-12 w-12 flex-none rounded-lg object-cover bg-gray-200 animate-pulse"
            />
            <div className="text-sm font-medium leading-6 bg-gray-200 rounded-2xl w-32 h-4 animate-pulse"></div>

            <Menu as="div" className="relative ml-auto">
              <MenuButton className="-m-2.5 block p-2.5 text-gray-200 animate-pulse">
                <span className="sr-only">Open options</span>
                <EllipsisHorizontalIcon aria-hidden="true" className="h-5 w-5" />
              </MenuButton>
            </Menu>
          </div>

          <dl className="-my-3 divide-y divide-gray-100 px-6 text-sm leading-6 bg-white py-8">
            <div className="flex justify-between gap-x-4 py-3 bg-gray-200 rounded-2xl animate-pulse">
              <dt className="text-gray-500 w-32 h-6"></dt>
              <dd className="text-gray-700 ">
                <span className='bg-gray-200 animate-pulse w-32'></span>
              </dd>
            </div>

            <div className="flex mt-4 justify-between gap-x-4 py-3 bg-gray-200 rounded-2xl animate-pulse">
              <dt className="text-gray-500 w-32 h-6"></dt>
              <dd className="flex items-start gap-x-2 animate-pulse rounded-2xl bg-gray-200">
                <span className='bg-gray-200 animate-pulse w-32 rounded-2xl'></span>
              </dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}
