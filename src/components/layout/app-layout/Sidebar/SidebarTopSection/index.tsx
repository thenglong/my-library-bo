import { useRef, useState } from "react"

import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone"
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone"
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone"
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone"
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone"
import {
  Avatar,
  Box,
  Button,
  Divider,
  alpha,
  List,
  ListItem,
  ListItemText,
  Popover,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { NavLink, useNavigate, useLocation } from "react-router-dom"

import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"
import firebaseService from "services/firebase-service"

const MenuUserBox = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
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
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor as string, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`
)

function SidebarTopSection() {
  const { t } = useTranslation()
  const theme = useTheme()

  const navigate = useNavigate()
  const location = useLocation()

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

  const { user } = useFirebaseAuthState()

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: 2,
        pt: 1,
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          width: 68,
          height: 68,
          mb: 2,
          mx: "auto",
        }}
        alt={user?.displayName || ""}
        src={user?.photoURL || ""}
      />

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`,
        }}
      >
        {user?.displayName}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: `${theme.colors.alpha.trueWhite[70]}`,
        }}
      >
        Lorem ipsum.
      </Typography>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: theme.spacing(0),
          color: `${theme.colors.alpha.trueWhite[70]}`,
          top: theme.spacing(0),
          background: `${theme.colors.alpha.trueWhite[10]}`,

          "&:hover": {
            color: `${theme.colors.alpha.trueWhite[100]}`,
            background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
          },
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <UnfoldMoreTwoToneIcon fontSize="small" />
      </IconButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
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
            <UserBoxLabel className="popoverTypo" variant="body1">
              {user?.displayName}
            </UserBoxLabel>
            <UserBoxDescription className="popoverTypo" variant="body2">
              Lorem ipsum.
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItem
            onClick={() => {
              handleClose()
            }}
            button
            to={`/${location.pathname.split("/")[1]}/management/users/single/1`}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Profile")} />
          </ListItem>
          <ListItem
            onClick={() => {
              handleClose()
            }}
            button
            to={`/${
              location.pathname.split("/")[1]
            }/applications/mailbox/inbox`}
            component={NavLink}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Inbox")} />
          </ListItem>
          <ListItem
            onClick={() => {
              handleClose()
            }}
            button
            to={`/${
              location.pathname.split("/")[1]
            }/applications/projects-board`}
            component={NavLink}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary={t("Projects")} />
          </ListItem>
        </List>
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
    </Box>
  )
}

export default SidebarTopSection
