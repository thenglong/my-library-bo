import { ChangeEvent, useState } from "react"

import {
  Close as CloseIcon,
  DeleteTwoTone as DeleteTwoToneIcon,
  LaunchTwoTone as LaunchTwoToneIcon,
  SearchTwoTone as SearchTwoToneIcon,
} from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material"
import { format, formatDistance } from "date-fns"
import { useSnackbar } from "notistack"
import numeral from "numeral"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "react-router-dom"

import InvoiceBulkActions from "components/pages/management/invoices/invoice-bulk-actions"
import InvoiceStatusLabel from "components/pages/management/invoices/invoice-status-label"
import Transition from "components/transition"
import { Invoice } from "typings/api-model"

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

const statusOptions = [
  {
    id: "all",
    name: "Show all",
  },
  {
    id: "pending",
    name: "Pending Payment",
  },
  {
    id: "completed",
    name: "Completed",
  },
  {
    id: "draft",
    name: "Draft",
  },
  {
    id: "progress",
    name: "In Progress",
  },
]

interface InvoiceResultsProps {
  invoices: Invoice[]
}

const InvoiceResults = ({ invoices = [] }: InvoiceResultsProps) => {
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<Invoice["id"][]>(
    []
  )
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const handleStatusChange = () => {
    // TODO
  }

  const handleSelectAllInvoices = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedInvoiceIds(
      event.target.checked ? invoices.map((invoice) => invoice.id) : []
    )
  }

  const handleSelectOneInvoice = (invoiceId: Invoice["id"]) => {
    if (!selectedInvoiceIds.includes(invoiceId)) {
      setSelectedInvoiceIds((prevSelected) => [...prevSelected, invoiceId])
    } else {
      setSelectedInvoiceIds((prevSelected) =>
        prevSelected.filter((id) => id !== invoiceId)
      )
    }
  }

  const isSelectedBulkActions = selectedInvoiceIds.length > 0
  const isSelectedSomeInvoices =
    selectedInvoiceIds.length > 0 && selectedInvoiceIds.length < invoices.length
  const isSelectedAllInvoices = selectedInvoiceIds.length === invoices.length

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

  const handleConfirmDelete = () => {
    setOpenConfirmDelete(true)
  }

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false)
  }

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false)

    enqueueSnackbar(t("Delete action completed successfully"), {
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
      <Card
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} lg={7} md={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                m: 0,
              }}
              placeholder={t("Search invoices by client name ...")}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={5} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t("Status")}</InputLabel>
              <Select onChange={handleStatusChange} label={t("Status")}>
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Box pl={2} display="flex" alignItems="center">
          <Checkbox
            checked={isSelectedAllInvoices}
            indeterminate={isSelectedSomeInvoices}
            onChange={handleSelectAllInvoices}
          />
          {isSelectedBulkActions && (
            <Box flex={1} p={2}>
              <InvoiceBulkActions />
            </Box>
          )}
          {!isSelectedBulkActions && (
            <Box
              flex={1}
              p={2}
              display={{ xs: "block", sm: "flex" }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  {t("Showing")}:
                </Typography>{" "}
                <b>{invoices.length}</b> <b>{t("invoices")}</b>
              </Box>
              <TablePagination
                component="div"
                count={invoices.length}
                onPageChange={() => {
                  // TODO
                }}
                onRowsPerPageChange={() => {
                  // TODO
                }}
                page={1}
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          )}
        </Box>
        <Divider />

        {invoices.length === 0 ? (
          <Typography
            sx={{
              py: 10,
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t("We couldn't find any invoices matching your search criteria")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t("#")}</TableCell>
                    <TableCell>{t("Date")}</TableCell>
                    <TableCell>{t("Client")}</TableCell>
                    <TableCell>{t("Amount")}</TableCell>
                    <TableCell>{t("Status")}</TableCell>
                    <TableCell align="center">{t("Actions")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((invoice) => {
                    const isInvoiceSelected = selectedInvoiceIds.includes(
                      invoice.id
                    )
                    return (
                      <TableRow
                        hover
                        key={invoice.id}
                        selected={isInvoiceSelected}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={isInvoiceSelected}
                              onChange={(_event) =>
                                handleSelectOneInvoice(invoice.id)
                              }
                              value={isInvoiceSelected}
                            />
                            <Box pl={1}>
                              <Typography noWrap variant="subtitle2">
                                {invoice.number}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {format(invoice.issuedDate, "MMMM dd yyyy")}
                          </Typography>
                          <Typography noWrap variant="subtitle1">
                            {t("Due")}{" "}
                            <b>
                              {formatDistance(
                                invoice.dueDate,
                                invoice.issuedDate,
                                {
                                  addSuffix: true,
                                }
                              )}
                            </b>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Avatar
                              sx={{
                                mr: 1,
                              }}
                              src={invoice.clientAvatar}
                            />
                            <Typography variant="h5">
                              {invoice.clientName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {numeral(invoice.amount).format(
                            `${invoice.currency}0,0.00`
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            <InvoiceStatusLabel
                              invoiceStatus={invoice.status}
                            />
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={t("View")} arrow>
                              <IconButton
                                component={RouterLink}
                                // to={`/${
                                //   location.pathname.split("/")[1]
                                // }/management/invoices/single/${invoice.id}`}
                                to="#"
                                color="primary"
                              >
                                <LaunchTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t("Delete")} arrow>
                              <IconButton
                                onClick={handleConfirmDelete}
                                color="primary"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={invoices.length}
                onPageChange={() => {
                  // TODO
                }}
                onRowsPerPageChange={() => {
                  // TODO
                }}
                page={1}
                rowsPerPage={10}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>

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
              pt: 4,
              px: 6,
            }}
            variant="h3"
          >
            {t("Do you really want to delete this invoice")}?
          </Typography>

          <Typography
            align="center"
            sx={{
              pt: 2,
              pb: 4,
              px: 6,
            }}
            fontWeight="normal"
            color="text.secondary"
            variant="h4"
          >
            {t("You won't be able to revert after deletion")}
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

export default InvoiceResults
