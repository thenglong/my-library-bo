import { useState, useRef } from "react"

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone"
import VerifiedUserTwoToneIcon from "@mui/icons-material/VerifiedUserTwoTone"
import {
  Box,
  Menu,
  Tooltip,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  styled,
} from "@mui/material"
import { useTranslation } from "react-i18next"

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
)

const BulkActions = () => {
  const [onMenuOpen, menuOpen] = useState(false)
  const moreRef = useRef(null)
  const { t } = useTranslation()

  const openMenu = () => {
    menuOpen(true)
  }

  const closeMenu = () => {
    menuOpen(false)
  }

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {t("Bulk actions")}:
          </Typography>
          <Tooltip arrow placement="top" title={t("Resend verification email")}>
            <IconButton
              color="primary"
              sx={{
                ml: 1,
                p: 1,
              }}
            >
              <VerifiedUserTwoToneIcon />
            </IconButton>
          </Tooltip>
          <ButtonError
            sx={{
              ml: 1,
            }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
          >
            {t("Delete")}
          </ButtonError>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{
            ml: 2,
            p: 1,
          }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItem button>
            <ListItemText primary={t("Bulk edit accounts")} />
          </ListItem>
          <ListItem button>
            <ListItemText primary={t("Close selected accounts")} />
          </ListItem>
        </List>
      </Menu>
    </>
  )
}

export default BulkActions
