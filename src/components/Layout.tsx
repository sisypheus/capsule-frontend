export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={'h-full scroll-smooth bg-white antialiased'}
    >
      <div className="flex h-full flex-col">{children}</div>
    </div>
  )
}
