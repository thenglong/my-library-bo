import { Box } from "@mui/material"

import Chat from "./Chat"
import LanguageSwitcher from "./LanguageSwitcher"
import HeaderNotifications from "./Notifications"

function HeaderButtons() {
  return (
    <Box>
      <HeaderNotifications />
      <LanguageSwitcher />
      <Chat />
    </Box>
  )
}

export default HeaderButtons
