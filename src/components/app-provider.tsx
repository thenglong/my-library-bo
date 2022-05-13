import { ReactNode } from "react"

import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { CssBaseline } from "@mui/material"
import { SnackbarProvider } from "notistack"
import { HelmetProvider } from "react-helmet-async"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { SidebarProvider } from "contexts/SidebarContext"
import store from "redux/store"
import ThemeProvider from "theme/ThemeProvider"

interface AppProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider
              maxSnack={6}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <SidebarProvider>
                <CssBaseline />
                <BrowserRouter>
                  <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    {children}
                  </QueryClientProvider>
                </BrowserRouter>
              </SidebarProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </ReduxProvider>
    </HelmetProvider>
  )
}

export default AppProvider
