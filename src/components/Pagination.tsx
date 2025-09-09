export default function Pagination({current, total = 0, onChange}: any) {
  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 sm:px-6"
    >
      <div className="hidden sm:block px-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
          <span className="font-medium">20</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={() => onChange(current - 1)}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 cursor-pointer"
        >
          Previous
        </button>
        <button
          onClick={() => onChange(current + 1)}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 cursor-pointer"
        >
          Next
        </button>
      </div>
    </nav>
  )
}
