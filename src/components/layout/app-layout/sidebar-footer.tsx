import {
  EventTwoTone as EventTwoToneIcon,
  PowerSettingsNewTwoTone as PowerSettingsNewTwoToneIcon,
  SmsTwoTone as SmsTwoToneIcon,
} from "@mui/icons-material"
import {
  Box,
  IconButton,
  Badge,
  Tooltip,
  alpha,
  tooltipClasses,
  styled,
  useTheme,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link as RouterLink, useNavigate } from "react-router-dom"

import firebaseService from "services/firebase-service"

const LightTooltip = styled<typeof Tooltip>(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }}>
    {props.children}
  </Tooltip>
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    boxShadow: theme.shadows[24],
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(12),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}))

const SidebarFooter = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await firebaseService.auth.signOut()
      navigate("/")
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <Box
      sx={{
        height: 60,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LightTooltip placement="top" arrow title={t("Events Calendar")}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(["all"])}`,

            "&:hover": {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            },
          }}
          to="/extended-sidebar/applications/calendar"
          component={RouterLink}
        >
          <EventTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
      <LightTooltip placement="top" arrow title={t("Messenger")}>
        <Badge
          color="success"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiBadge-badge": {
              animation: "pulse 1s infinite",
              top: "5%",
              transition: `${theme.transitions.create(["all"])}`,
            },
          }}
          variant="dot"
          overlap="circular"
        >
          <IconButton
            to="/extended-sidebar/applications/messenger"
            component={RouterLink}
            sx={{
              background: `${theme.colors.alpha.trueWhite[10]}`,
              color: `${theme.colors.alpha.trueWhite[70]}`,
              transition: `${theme.transitions.create(["all"])}`,

              "&:hover": {
                background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`,
              },
              mx: 1,
            }}
          >
            <SmsTwoToneIcon fontSize="small" />
          </IconButton>
        </Badge>
      </LightTooltip>
      <LightTooltip placement="top" arrow title={t("Logout")}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(["all"])}`,

            "&:hover": {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            },
          }}
          onClick={handleLogout}
        >
          <PowerSettingsNewTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
    </Box>
  )
}

export default SidebarFooter
