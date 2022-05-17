import { useRef, useState } from "react"

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
import khFlag from "country-flag-icons/3x2/KH.svg"
import usFlag from "country-flag-icons/3x2/US.svg"
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

const ImageWrapper = styled("img")(
  () => `
          width: 30px;
  `
)

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    border-radius: ${theme.general.borderRadiusLg};
  `
)

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { t } = useTranslation()
  const getLanguage = i18n.language
  const theme = useTheme()

  const switchLanguage = ({ lng }: { lng: string }) => {
    internationalization.changeLanguage(lng)
  }
  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
          {getLanguage === "en" && <ImageWrapper alt="English" src={usFlag} />}
          {getLanguage === "en-US" && (
            <ImageWrapper alt="English" src={usFlag} />
          )}
          {getLanguage === "en-GB" && (
            <ImageWrapper alt="English" src={usFlag} />
          )}
          {getLanguage === "km" && <ImageWrapper alt="Spanish" src={khFlag} />}
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
              className={
                getLanguage === "en" || getLanguage === "en-US" ? "active" : ""
              }
              onClick={() => {
                switchLanguage({ lng: "en" })
                handleClose()
              }}
            >
              <ImageWrapper alt="English" src={usFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="English"
              />
            </ListItemButton>
            <ListItemButton
              className={getLanguage === "km" ? "active" : ""}
              onClick={() => {
                switchLanguage({ lng: "km" })
                handleClose()
              }}
            >
              <ImageWrapper alt="Chinese" src={khFlag} />
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
