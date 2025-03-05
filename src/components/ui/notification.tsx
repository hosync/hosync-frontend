import React, { useEffect, useState } from 'react'

import cx from '@/lib/utils/cx'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose?: () => void
  duration?: number
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000
}) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, duration)

    const closeTimer = setTimeout(() => {
      if (onClose) {
        onClose()
      }
    }, duration + 500)

    return () => {
      clearTimeout(timer)
      clearTimeout(closeTimer)
    }
  }, [onClose, duration])

  return show ? (
    <div
      className={`w-full fixed mt-[-82px] left-0 right-0 space-y-2 z-50 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'} text-white p-2 flex items-center justify-between transform transition-all duration-500 mt-0`}
    >
      <span className="block text-sm text-center w-full">{message}</span>

      <button
        onClick={() => setShow(false)}
        className={cx.join('text-lg h-14', onClose ? 'visible' : 'invisible')}
        style={{ marginTop: '-3px', marginRight: '10px' }}
      >
        &times;
      </button>
    </div>
  ) : null
}

export { Notification }
