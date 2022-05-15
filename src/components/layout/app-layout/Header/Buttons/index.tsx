import { Box } from "@mui/material"

import Chat from "components/layout/app-layout/Header/Buttons/Chat"
import LanguageSwitcher from "components/layout/app-layout/Header/Buttons/LanguageSwitcher"
import HeaderNotifications from "components/layout/app-layout/Header/Buttons/Notifications"

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
