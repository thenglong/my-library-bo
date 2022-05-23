import { ReactNode } from "react"

import { Box, styled } from "@mui/material"

const PageTitle = styled(Box)(
  ({ theme }) => `
          padding: ${theme.spacing(4)};
  `
)

const PageTitleWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PageTitle className="MuiPageTitle-wrapper">{children}</PageTitle>
    </>
  )
}

export default PageTitleWrapper
