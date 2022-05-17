import { useState } from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone"
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone"
import DatePicker from "@mui/lab/DatePicker"
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  lighten,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { useSnackbar } from "notistack"
import numeral from "numeral"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"

import ControlledTextField from "components/controlled-text-field"

const IconButtonError = styled(IconButton)(
  ({ theme }) => `
       background: ${theme.colors.error.lighter};
       color: ${theme.colors.error.main};
       padding: ${theme.spacing(0.5)};
  
       &:hover {
        background: ${lighten(theme.colors.error.lighter, 0.4)};
       }
  `
)

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .max(255)
    .required("The invoice number field is required"),
})

const defaultValues = {
  number: 0,
}

const PageHeader = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()

  const mobile = useMediaQuery(theme.breakpoints.down("sm"))

  const itemsList = [
    {
      id: 1,
      name: "Design services for March",
      quantity: 1,
      price: 8945,
      currency: "$",
    },
    {
      id: 2,
      name: "Website migration services",
      quantity: 3,
      price: 2367,
      currency: "$",
    },
  ]

  const members = [
    {
      avatar: "/static/images/avatars/1.jpg",
      name: "Maren Lipshutz",
    },
    {
      avatar: "/static/images/avatars/2.jpg",
      name: "Zain Vetrovs",
    },
    {
      avatar: "/static/images/avatars/3.jpg",
      name: "Hanna Siphron",
    },
    {
      avatar: "/static/images/avatars/4.jpg",
      name: "Cristofer Aminoff",
    },
    {
      avatar: "/static/images/avatars/5.jpg",
      name: "Maria Calzoni",
    },
  ]

  const [value, setValue] = useState(null)
  const [value1, setValue1] = useState(null)

  const [items] = useState(itemsList)

  const handleCreateInvoiceOpen = () => {
    setOpen(true)
  }

  const handleCreateInvoiceClose = () => {
    setOpen(false)
  }

  const _handleCreateInvoiceSuccess = () => {
    enqueueSnackbar(t("A new invoice has been created successfully"), {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    })

    setOpen(false)
  }

  const {
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
    control,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = handleSubmit((_data) => {
    //
  })

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Invoices")}
          </Typography>
          <Typography variant="subtitle2">
            {t("All recent invoices can be found below")}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleCreateInvoiceOpen}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {t("Add new invoice")}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleCreateInvoiceClose}
      >
        <DialogTitle
          sx={{
            p: 3,
          }}
        >
          <Typography variant="h4" gutterBottom>
            {t("Create invoice")}
          </Typography>
          <Typography variant="subtitle2">
            {t("Use this modal dialog to create a new invoice")}
          </Typography>
        </DialogTitle>

        <form onSubmit={onSubmit}>
          <DialogContent
            dividers
            sx={{
              p: 3,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box pb={1}>
                  <b>{t("Invoice Number")}:</b>
                </Box>
                <ControlledTextField
                  isError={Boolean(touchedFields.number && errors.number)}
                  placeholder="Invoice number here..."
                  name="number"
                  control={control}
                  touched={touchedFields.number}
                  errorMessage={errors.number?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Box pb={1}>
                  <b>{t("Recipient")}:</b>
                </Box>
                <Autocomplete
                  multiple
                  sx={{
                    m: 0,
                  }}
                  limitTags={2}
                  options={members}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Avatar
                        sx={{
                          mr: 1,
                        }}
                        src={option.avatar}
                      />
                      {option.name}
                    </li>
                  )}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder={t("Select invoice recipient...")}
                    />
                  )}
                  renderTags={(members, getTagProps) =>
                    members.map((ev, index) => (
                      <Chip
                        label={ev.name}
                        {...getTagProps({ index })}
                        key={ev.name}
                        avatar={<Avatar src={ev.avatar} />}
                      />
                    ))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box pb={1}>
                  <b>{t("Invoice Date")}:</b>
                </Box>
                <DatePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      placeholder={t("Select date...")}
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box pb={1}>
                  <b>{t("Due Date")}:</b>
                </Box>
                <DatePicker
                  value={value1}
                  onChange={(newValue1) => {
                    setValue1(newValue1)
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      placeholder={t("Select date...")}
                      {...params}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("Item")}</TableCell>
                  <TableCell>{t("Qty")}</TableCell>
                  <TableCell>{t("Price")}</TableCell>
                  <TableCell>{t("Total")}</TableCell>
                  <TableCell align="right">{t("Actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Typography noWrap>{item.name}</Typography>
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      {numeral(item.price).format(`${item.currency}0,0.00`)}
                    </TableCell>
                    <TableCell>
                      {numeral(item.price).format(`${item.currency}0,0.00`)}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip arrow title={t("Delete")}>
                        <IconButtonError>
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButtonError>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={0}>
                    <Button startIcon={<AddTwoToneIcon />} variant="outlined">
                      {t("Add item")}
                    </Button>
                  </TableCell>
                  <TableCell colSpan={4} align="right">
                    <Typography
                      gutterBottom
                      variant="caption"
                      color="text.secondary"
                      fontWeight="bold"
                    >
                      {t("Total")}:
                    </Typography>
                    <Typography variant="h3" fontWeight="bold">
                      {numeral(9458).format(`$0,0.00`)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Box px={3} pt={3}>
            <TextField
              label={t("Additional informations")}
              multiline
              placeholder={t(
                "Write here any additional informations you might have..."
              )}
              fullWidth
              minRows={3}
              maxRows={8}
            />
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <Box>
              <Button fullWidth={mobile} variant="outlined">
                {t("Preview invoice")}
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth={mobile}
                sx={{
                  mr: { xs: 0, sm: 2 },
                  my: { xs: 2, sm: 0 },
                }}
                color="secondary"
                variant="outlined"
                onClick={handleCreateInvoiceClose}
              >
                {t("Save as draft")}
              </Button>
              <Button
                fullWidth={mobile}
                type="submit"
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                size="large"
              >
                {t("Create invoice")}
              </Button>
            </Box>
          </Box>
        </form>
      </Dialog>
    </>
  )
}

export default PageHeader
