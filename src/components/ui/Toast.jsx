import { useEffect } from 'react'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const icons = {
  success: <CheckCircle size={16} className="text-green-400" />,
  error:   <XCircle    size={16} className="text-red-400"   />,
  info:    <Info       size={16} className="text-blue-400"  />,
}

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="fixed bottom-20 right-5 z-[9999] flex items-center gap-3 bg-navy text-white text-sm px-4 py-3 rounded-xl shadow-2xl slide-up">
      {icons[type]}
      {message}
    </div>
  )
}
