import { useRef, useState } from "react"

import {
  LockOpenTwoTone as LockOpenTwoToneIcon,
  MonetizationOnTwoTone as MonetizationOnTwoToneIcon,
} from "@mui/icons-material"
import {
  alpha,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Popover,
  styled,
  Typography,
  useTheme,
} from "@mui/material"
import { ApexOptions } from "apexcharts"
import Chart from "react-apexcharts"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

import Text from "components/text"
import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"
import firebaseService from "services/firebase-service"

const UserBoxButton = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  padding: 0;
  height: ${theme.spacing(4)};
  margin-left: ${theme.spacing(1)};
  border-radius: ${theme.general.borderRadiusLg};

  &:hover {
    background: ${theme.colors.primary.main};
  }
`
)

const UserAvatar = styled(Avatar)(
  ({ theme }) => `
        height: 90%;
        width: 90%;
        border-radius: ${theme.general.borderRadiusLg};
`
)

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${alpha(theme.colors.alpha.black[100], 0.08)};
        padding: ${theme.spacing(2)};
`
)

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
)

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
)

const HeaderUserBox = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const navigate = useNavigate()

  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = async () => {
    try {
      handleClose()
      await firebaseService.auth.signOut()
      navigate("/")
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  const Box1Options: ApexOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Last Week",
      "Last Month",
      "Last Year",
      "Last Decade",
    ],
    theme: {
      mode: theme.palette.mode === "dark" ? "light" : "dark",
    },
    stroke: {
      colors: [theme.colors.error.main],
      curve: "smooth",
      width: 3,
    },
    grid: {
      padding: {
        right: 5,
        left: 5,
        bottom: 5,
      },
    },
    tooltip: {
      fixed: {
        enabled: true,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter() {
            return "Orders:"
          },
        },
      },
      marker: {
        show: true,
      },
    },
    colors: [theme.colors.error.main],
  }
  const Box1Data = [
    {
      name: "Revenue",
      data: [465, 546, 234, 576, 554, 338, 427, 348, 586, 254, 348],
    },
  ]

  const { user } = useFirebaseAuthState()

  return (
    <>
      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>
        <UserAvatar alt={user?.displayName || ""} src={user?.photoURL || ""} />
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar
            variant="rounded"
            alt={user?.displayName || ""}
            src={user?.photoURL || ""}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.displayName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              Adminisrator
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Box m={1}>
          <Box px={2} pt={1} pb={0.5} display="flex" alignItems="flex-start">
            <Text color="warning">
              <MonetizationOnTwoToneIcon fontSize="large" />
            </Text>
            <Box ml={1}>
              <Typography variant="h3">$14,264</Typography>
              <Typography noWrap variant="subtitle2">
                {t("total value")}
              </Typography>
            </Box>
          </Box>
          <Chart
            options={Box1Options}
            series={Box1Data}
            type="line"
            height={60}
          />
        </Box>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            {t("Sign out")}
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default HeaderUserBox
