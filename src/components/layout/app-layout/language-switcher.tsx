import { useCallback, useRef, useState } from "react"

import {
  Alert,
  alpha,
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import { ReactComponent as KHFlag } from "country-flag-icons/3x2/KH.svg"
import { ReactComponent as USFlag } from "country-flag-icons/3x2/US.svg"
import { useTranslation } from "react-i18next"

import internationalization from "i18n/i18n"

const SectionHeading = styled(Typography)(
  ({ theme }) => `
          font-weight: ${theme.typography.fontWeightBold};
          color: ${theme.palette.secondary.main};
          display: block;
          padding: ${theme.spacing(2, 2, 0)};
  `
)

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    border-radius: ${theme.general.borderRadiusLg};
  `
)

const LanguageSwitcher = () => {
  const {
    i18n: { language },
  } = useTranslation()
  const { t } = useTranslation()
  const theme = useTheme()

  const switchLanguage = ({ lng }: { lng: string }) => {
    internationalization.changeLanguage(lng)
  }

  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const isEnglish =
    language === "en" || language === "en-US" || language === "en-GB"
  const isKhmer = language === "km" || language === "km-KH"

  return (
    <>
      <Tooltip arrow title={t("Language Switcher")}>
        <IconButtonWrapper
          color="secondary"
          ref={ref}
          onClick={handleOpen}
          sx={{
            mx: 1,
            background: alpha(theme.colors.error.main, 0.1),
            transition: `${theme.transitions.create(["background"])}`,
            color: theme.colors.error.main,

            "&:hover": {
              background: alpha(theme.colors.error.main, 0.2),
            },
          }}
        >
          {isEnglish && <USFlag width="30px" />}
          {isKhmer && <KHFlag width="30px" />}
        </IconButtonWrapper>
      </Tooltip>
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
        <Box
          sx={{
            maxWidth: 240,
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {t("Language Switcher")}
          </SectionHeading>
          <List
            sx={{
              p: 2,
              "& .active": {
                background: theme.palette.primary.light,
              },
            }}
            component="nav"
          >
            <ListItemButton
              className={isEnglish ? "active" : ""}
              onClick={() => {
                switchLanguage({ lng: "en" })
                handleClose()
              }}
            >
              <USFlag width="30px" />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="English"
              />
            </ListItemButton>
            <ListItemButton
              className={isKhmer ? "active" : ""}
              onClick={() => {
                switchLanguage({ lng: "km" })
                handleClose()
              }}
            >
              <KHFlag width="30px" />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="Khmer"
              />
            </ListItemButton>
          </List>
          <Divider />
          <Alert
            severity="warning"
            sx={{ mt: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant="body1"
              sx={{
                pl: 1,
                fontSize: theme.typography.pxToRem(12),
              }}
            >
              {t(
                "Please contact us (fake.email@mailinator.com) if you want to add the language to the website!"
              )}
            </Typography>
          </Alert>
        </Box>
      </Popover>
    </>
  )
}

export default LanguageSwitcher
