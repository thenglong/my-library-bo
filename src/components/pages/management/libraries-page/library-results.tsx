import { useDeferredValue } from "react"

import { Box } from "@mui/material"

import ConfirmDeleteLibraryDialog from "components/pages/management/libraries-page/confirm-delete-library-dialog"
import LibrariesTableView from "components/pages/management/libraries-page/libraries-table-view"
import useLibrariesQuery from "hooks/queries/use-libraries-query"

const LibraryResults = () => {
  const { data } = useLibrariesQuery()
  const libraries = useDeferredValue(data?.items || [])

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        pb={3}
      />

      <LibrariesTableView libraries={libraries} />
      <ConfirmDeleteLibraryDialog />
    </>
  )
}

export default LibraryResults
