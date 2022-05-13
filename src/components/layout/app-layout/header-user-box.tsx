import { useRef, useState } from "react"

import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone"
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone"
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone"
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone"
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone"
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  styled,
  ListItemButton,
} from "@mui/material"
import { NavLink, useNavigate, useLocation } from "react-router-dom"

import useFirebaseAuthState from "hooks/firebase/use-firebase-auth-state"
import firebaseService from "services/firebase-service"

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding: ${theme.spacing(0, 1)};
        height: ${theme.spacing(7)};
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
        color: ${theme.palette.secondary.main};
        display: block;
`
)

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
)

function HeaderUserbox() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useFirebaseAuthState()

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

  return (
    <>
      <UserBoxButton color="primary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={user?.displayName || ""}
          src={user?.photoURL || ""}
        />
        <Box
          component="span"
          sx={{
            display: { xs: "none", md: "inline-block" },
          }}
        >
          <UserBoxText>
            <UserBoxLabel variant="body1">
              {user?.displayName || ""}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam,
              repudiandae.
            </UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: "none", sm: "inline-block" },
          }}
        >
          <ExpandMoreTwoToneIcon
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
            <UserBoxLabel variant="body1">
              {user?.displayName || ""}
            </UserBoxLabel>
            <UserBoxDescription variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam,
              voluptate.
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
          <ListItemButton
            onClick={() => {
              handleClose()
            }}
            to={`/${location.pathname.split("/")[1]}/management/users/single/1`}
            component={NavLink}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItem
            button
            onClick={() => {
              handleClose()
            }}
            to="applications/mailbox/inbox"
            component={NavLink}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleClose()
            }}
            to="applications/projects-board"
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

export default HeaderUserbox
