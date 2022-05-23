import { ChangeEvent, MouseEvent, SyntheticEvent, useState } from "react"

import {
  Close as CloseIcon,
  GridViewTwoTone as GridViewTwoToneIcon,
  TableRowsTwoTone as TableRowsTwoToneIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
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

const ButtonError = styled(Button)(
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

export type UserRoleOptions = UserRole | "all"

interface UserResultsProps {
  users: User[]
  onRoleChange: (role: UserRoleOptions) => void
  selectedRole: UserRoleOptions
}

const UserResults = ({
  users,
  onRoleChange,
  selectedRole,
}: UserResultsProps) => {
  const [selectedUserIds, setSelectedUserIds] = useState<User["id"][]>([])
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const handleTabsChange = (_event: SyntheticEvent, tabsValue: string) => {
    onRoleChange(tabsValue as UserRole)
    setSelectedUserIds([])
  }

  const handleSelectAllUsers = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedUserIds(event.target.checked ? users.map((user) => user.id) : [])
  }

  const handleSelectOneUser = (userId: User["id"]) => {
    if (!selectedUserIds.includes(userId)) {
      setSelectedUserIds((prevSelected) => [...prevSelected, userId])
    } else {
      setSelectedUserIds((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      )
    }
  }

  const isSelectedBulkActions = selectedUserIds.length > 0
  const isSelectedSomeUsers =
    selectedUserIds.length > 0 && selectedUserIds.length < users.length
  const isSelectedAllUsers = selectedUserIds.length === users.length

  const [toggleView, setToggleView] = useState("table_view")

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    setToggleView(newValue)
  }

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true)
  }

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false)
  }

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false)

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
          value={toggleView}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="table_view">
            <TableRowsTwoToneIcon />
          </ToggleButton>
          <ToggleButton disableRipple value="grid_view">
            <GridViewTwoToneIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {toggleView === "table_view" && (
        <UsersTableView
          isSelectedBulkActions={isSelectedBulkActions}
          users={users}
          isSelectedSome={isSelectedSomeUsers}
          isSelectedAll={isSelectedAllUsers}
          onSelectOne={handleSelectOneUser}
          onConfirmDelete={handleConfirmDelete}
          onSelectAll={handleSelectAllUsers}
          selectedUserIds={selectedUserIds}
        />
      )}
      {toggleView === "grid_view" && (
        <UsersGridView
          isSelectedBulkActions={isSelectedBulkActions}
          users={users}
          isSelectedSome={isSelectedSomeUsers}
          isSelectedAll={isSelectedAllUsers}
          onSelectOne={handleSelectOneUser}
          onConfirmDelete={handleConfirmDelete}
          onSelectAll={handleSelectAllUsers}
          selectedUserIds={selectedUserIds}
        />
      )}
      {!toggleView && (
        <Card
          sx={{
            textAlign: "center",
            p: 3,
          }}
        >
          <Typography
            align="center"
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            sx={{
              my: 5,
            }}
            gutterBottom
          >
            {t(
              "Choose between table or grid views for displaying the users list."
            )}
          </Typography>
        </Card>
      )}

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
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
              onClick={closeConfirmDelete}
            >
              {t("Cancel")}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3,
              }}
              variant="contained"
            >
              {t("Delete")}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  )
}

export default UserResults
