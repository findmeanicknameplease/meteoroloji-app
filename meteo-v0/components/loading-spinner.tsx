export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-teal-700 to-teal-900 z-50">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 border-4 border-t-white border-r-white border-b-white/30 border-l-white/30 rounded-full animate-spin"></div>
        <p className="mt-4 text-white font-medium">Yükleniyor...</p>
      </div>
    </div>
  )
}
