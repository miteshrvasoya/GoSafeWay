export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/20">
      {children}
    </div>
  )
}
