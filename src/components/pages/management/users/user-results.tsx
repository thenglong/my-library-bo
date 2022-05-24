import {
  MouseEvent,
  SyntheticEvent,
  useCallback,
  useDeferredValue,
} from "react"

import {
  GridViewTwoTone as GridViewTwoToneIcon,
  TableRowsTwoTone as TableRowsTwoToneIcon,
} from "@mui/icons-material"
import {
  Box,
  styled,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { useTranslation } from "react-i18next"

import ConfirmDeleteUserDialog from "components/pages/management/users/confirm-delete-user-dialog"
import UsersGridView from "components/pages/management/users/users-grid-view"
import UsersTableView from "components/pages/management/users/users-table-view"
import { VIEW_ORIENTATION } from "constants/common-constants"
import useUsersQuery from "hooks/queries/use-users-query"
import useActions from "hooks/redux/use-actions"
import { useTypedSelector } from "hooks/redux/use-typed-selector"
import { UserRole } from "typings/api-model"

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
    label: "All Users",
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

const UserResults = () => {
  const { data } = useUsersQuery()
  const users = useDeferredValue(data?.items || [])
  const { t } = useTranslation()

  const { viewOrientation, selectedRole } = useTypedSelector(
    (state) => state.user
  )

  const { changeViewOrientation, changeRole } = useActions()

  const handleTabsChange = (_event: SyntheticEvent, tabsValue: string) => {
    changeRole(tabsValue as UserRole)
  }

  const handleViewOrientation = useCallback(
    (_event: MouseEvent<HTMLElement>, newValue: string) => {
      if (newValue) changeViewOrientation(newValue as VIEW_ORIENTATION)
    },
    [changeViewOrientation]
  )

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

      <ConfirmDeleteUserDialog />
    </>
  )
}

export default UserResults
