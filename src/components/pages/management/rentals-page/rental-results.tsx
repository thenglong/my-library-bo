import { useDeferredValue } from "react"

import { Box } from "@mui/material"

import ConfirmDeleteRetalsDialog from "components/pages/management/rentals-page/confirm-delete-retals-dialog"
import RentalTableView from "components/pages/management/rentals-page/rental-table-view"
import useRentalsQuery from "hooks/queries/use-rentals-query"

const RentalResults = () => {
  const { data } = useRentalsQuery()
  const rentals = useDeferredValue(data?.items || [])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        pb={3}
      />

      <RentalTableView rentals={rentals} />
      <ConfirmDeleteRetalsDialog />
    </>
  )
}

export default RentalResults
