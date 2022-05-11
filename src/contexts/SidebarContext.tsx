import { createContext, ReactNode, useState } from "react"

type SidebarContext = {
  sidebarToggle: boolean
  closeSidebar: () => void
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
)

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [sidebarToggle, setSidebarToggle] = useState(false)

  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle)
  }
  const closeSidebar = () => {
    setSidebarToggle(false)
  }

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
