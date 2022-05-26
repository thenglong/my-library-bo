import {
  ArrowBackTwoTone as ArrowBackTwoToneIcon,
  UploadTwoTone as UploadTwoToneIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Card,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useLocation, useNavigate } from "react-router-dom"

import { User } from "typings/api-model"

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
      position: relative;
      overflow: visible;
      display: inline-block;
      margin-top: -${theme.spacing(9)};
      margin-left: ${theme.spacing(2)};
  
      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
)

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(1)};
      right: -${theme.spacing(1)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
)

interface ProfileCoverProps {
  user: User
}

const ProfileCover = ({ user }: ProfileCoverProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    return navigate(`/${location.pathname.split("/")[1]}/management/users/list`)
  }

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title={t("Go back")}>
          <IconButton
            onClick={handleBack}
            color="primary"
            sx={{
              p: 2,
              mr: 2,
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Profile for")} {user.name}
          </Typography>
          <Typography variant="subtitle2">
            {t("This is a profile page. Easy to modify, always blazing fast")}
          </Typography>
        </Box>
      </Box>
      <AvatarWrapper sx={{ mt: 5 }}>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
        <ButtonUploadWrapper>
          <input
            hidden
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.name}
        </Typography>
        <Typography
          sx={{
            py: 2,
          }}
          variant="subtitle2"
          color="text.primary"
        >
          {user.jobTitle}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
      </Box>
    </>
  )
}

export default ProfileCover
