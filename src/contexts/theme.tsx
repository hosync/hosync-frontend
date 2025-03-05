'use client'

import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

import * as cookies from '@/lib/utils/cookies'

type ThemeContextType = {
  darkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

type Props = {
  children: ReactNode
  defaultDarkMode?: boolean
}

export const ThemeProvider: FC<Props> = ({ children, defaultDarkMode }) => {
  const isDarkMode = !!defaultDarkMode
  const [darkMode, setDarkMode] = useState<boolean>(isDarkMode)

  useEffect(() => {
    // On initial load, remove the 'dark' class to ensure light mode is the default
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }

    cookies.set({
      name: 'darkMode',
      value: darkMode ? 'false' : 'true'
    })

    setDarkMode(!darkMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
