import { Box, styled, Tooltip, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
)

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
)

const VersionBadge = styled(Box)(
  ({ theme }) => `
        background: ${theme.palette.success.main};
        color: ${theme.palette.success.contrastText};
        padding: ${theme.spacing(0.4, 1)};
        border-radius: ${theme.general.borderRadiusSm};
        text-align: center;
        display: inline-block;
        line-height: 1;
        font-size: ${theme.typography.pxToRem(11)};
`
)

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
)

function Logo() {
  return (
    <LogoWrapper to="/">
      <Typography variant="h1" color="#E84D8A" fontSize={44}>
        ll
      </Typography>
      <Box
        component="span"
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        <LogoTextWrapper>
          <Tooltip title="Are you happy?" arrow placement="right">
            <VersionBadge>???</VersionBadge>
          </Tooltip>
          <LogoText>Liz Library</LogoText>
        </LogoTextWrapper>
      </Box>
    </LogoWrapper>
  )
}

export default Logo
