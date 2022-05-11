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
  Typography,
  styled,
  ListItemButton,
} from "@mui/material"
import { useAuthState } from "react-firebase-hooks/auth"
import { NavLink, useNavigate, useLocation } from "react-router-dom"

import firebaseService from "services/firebase-service"

const UserBoxButton = styled(Button)(
  ({ theme }) => `
      padding: ${theme.spacing(1)};
      background-color: ${alpha(theme.colors.alpha.black[100], 0.08)};
  
      .MuiButton-label {
        justify-content: flex-start;
      }
  
      &:hover {
        background-color: ${alpha(theme.colors.alpha.black[100], 0.12)};
      }
  `
)

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
      color: ${alpha(theme.sidebar.menuItemColor || "#000", 0.6)};
  
      &.popoverTypo {
        color: ${theme.palette.secondary.light};
      }
  `
)

const { auth } = firebaseService

function SidebarTopSection() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

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
      await auth.signOut()
      navigate("/")
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <>
      <UserBoxButton fullWidth color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={user?.displayName || ""}
          src={user?.photoURL || ""}
        />
        <Box
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.displayName}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio, illo.
            </UserBoxDescription>
          </UserBoxText>
          <UnfoldMoreTwoToneIcon
            fontSize="small"
            sx={{
              ml: 1,
            }}
          />
        </Box>
      </UserBoxButton>
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla,
              voluptatum!
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
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItemButton
            onClick={() => {
              handleClose()
            }}
            to={`/${
              location.pathname.split("/")[1]
            }/applications/mailbox/inbox`}
            component={NavLink}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Inbox" />
          </ListItemButton>
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
            <ListItemText primary="Projects" />
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
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default SidebarTopSection
