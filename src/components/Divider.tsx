export default function Divider({ text, ...props }: { text?: string }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 bg-gray-100 text-base font-semibold leading-6 text-gray-900">{text}</span>
      </div>
    </div>
  )
}
