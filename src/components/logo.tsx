import { Badge, Box, styled, Tooltip, useTheme } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: inline-flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
)

const LogoSignWrapper = styled("h1")(
  ({ theme }) => `
        color: ${theme.palette.success.contrastText};
        background: #E84D8A;
        border-radius: 50%;
        margin: 0;
        height: 45px;
        width: 45px;
        display: inline-block;
        text-align: center;
`
)

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        height: 45px;
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
        color: #E84D8A;
        margin-top: .25rem;

`
)

function Logo() {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <LogoWrapper to="/">
      <LogoSignWrapper>ll</LogoSignWrapper>
      <LogoTextWrapper>
        <Tooltip title={`${t("Are you happy")}`} arrow placement="right">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              ".MuiBadge-badge": {
                animation: "pulse 1s infinite",
                top: "-5%",
                right: "-5%",
                transition: `${theme.transitions.create(["all"])}`,
                backgroundColor: "#E84D8A",
              },
            }}
            variant="dot"
            overlap="circular"
          >
            <VersionBadge>??</VersionBadge>
          </Badge>
        </Tooltip>
        <LogoText>Library</LogoText>
      </LogoTextWrapper>
    </LogoWrapper>
  )
}

export default Logo
