import { MouseEvent, SyntheticEvent, useCallback } from "react"

import {
  Close as CloseIcon,
  GridViewTwoTone as GridViewTwoToneIcon,
  TableRowsTwoTone as TableRowsTwoToneIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Dialog,
  styled,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Zoom,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useTranslation } from "react-i18next"

import UsersGridView from "components/pages/management/users/users-grid-view"
import UsersTableView from "components/pages/management/users/users-table-view"
import Transition from "components/transition"
import { VIEW_ORIENTATION } from "constants/common-constants"
import useActions from "hooks/redux/use-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { User, UserRole } from "typings/api-model"

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
)

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
)

const ErrorButton = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
)

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.md}px) {
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          box-shadow: none;
      }
    }
    `
)

const tabs = [
  {
    value: "all",
    label: "All users",
  },
  {
    value: UserRole.ADMIN,
    label: "Administrators",
  },
  {
    value: UserRole.LIBRARIAN,
    label: "Library Managers",
  },
  {
    value: UserRole.CUSTOMER,
    label: "Customers",
  },
]

interface UserResultsProps {
  users: User[]
}

const UserResults = ({ users }: UserResultsProps) => {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const { viewOrientation, selectedRole, isConfirmDeleteModalOpen } =
    useTypedSelector((state) => state.user)

  const { changeViewOrientation, changeRole, closeConfirmDeleteModal } =
    useActions()

  const handleTabsChange = (_event: SyntheticEvent, tabsValue: string) => {
    changeRole(tabsValue as UserRole)
  }

  const handleViewOrientation = useCallback(
    (_event: MouseEvent<HTMLElement>, newValue: string) => {
      if (newValue) changeViewOrientation(newValue as VIEW_ORIENTATION)
    },
    [changeViewOrientation]
  )

  const handleDeleteCompleted = () => {
    closeConfirmDeleteModal()
    enqueueSnackbar(t("The user account has been removed"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        pb={3}
      >
        <TabsWrapper
          onChange={handleTabsChange}
          scrollButtons="auto"
          textColor="secondary"
          value={selectedRole || "all"}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={t(tab.label)} />
          ))}
        </TabsWrapper>
        <ToggleButtonGroup
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
          value={viewOrientation}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value={VIEW_ORIENTATION.TABLE}>
            <TableRowsTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value={VIEW_ORIENTATION.GRID}>
            <GridViewTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {viewOrientation === VIEW_ORIENTATION.TABLE && (
        <UsersTableView users={users} />
      )}
      {viewOrientation === VIEW_ORIENTATION.GRID && (
        <UsersGridView users={users} />
      )}

      <DialogWrapper
        open={isConfirmDeleteModalOpen}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDeleteModal}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 6,
            }}
            variant="h3"
          >
            {t("Are you sure you want to permanently delete this user account")}
            ?
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1,
              }}
              onClick={closeConfirmDeleteModal}
            >
              {t("Cancel")}
            </Button>
            <ErrorButton
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              {t("Delete")}
            </ErrorButton>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  )
}

export default UserResults
