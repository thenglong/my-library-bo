// eslint-disable-next-line import/no-unresolved
import { faker } from "@faker-js/faker" // TODO
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { DatePicker } from "@mui/lab"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import * as Yup from "yup"

const defaultValues = {
  userId: 1,
  bookId: 1,
  startDate: new Date() as Date | null,
  endDate: new Date() as Date | null,
  price: new Date() as Date | null,
  finePerDay: new Date() as Date | null,
}

const validationSchema = Yup.object().shape({
  userId: Yup.mixed(),
  bookId: Yup.mixed(),
  startDate: Yup.mixed(),
  endDate: Yup.mixed(),
})

interface CreateRentalDialogProps {
  open: boolean
  onClose: () => void
}

const CreateRentalDialog = ({ open, onClose }: CreateRentalDialogProps) => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = handleSubmit((_data) => {
    //
  })

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {t("Create a new rental")}
        </Typography>
        <Typography variant="subtitle2">
          {t("Fill in the fields below to create and add a new rental")}
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
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="userId">Select Customer</InputLabel>
                    <Select labelId="userid" label="Select Customer">
                      {new Array(20).fill(0).map((_, index) => {
                        const name =
                          faker.name.firstName() + " " + faker.name.lastName()
                        return (
                          <MenuItem key={index} value={name}>
                            {name}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="bookId">Select Book</InputLabel>
                    <Select labelId="bookId" label="Select Book">
                      {new Array(20).fill(0).map((_, index) => {
                        const bookName = faker.name.firstName()
                        return (
                          <MenuItem key={index} value={bookName}>
                            {bookName}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    value={watch("startDate")}
                    onChange={(newValue) => {
                      setValue("startDate", newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t("Select end date...")}
                        margin="normal"
                        label="Start Date"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    value={watch("endDate")}
                    onChange={(newValue) => {
                      setValue("endDate", newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t("Select end date...")}
                        label="End Date"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            p: 3,
          }}
        >
          <Button color="secondary" onClick={onClose}>
            {t("Cancel")}
          </Button>
          <Button
            type="submit"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            variant="contained"
          >
            {t("Create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateRentalDialog
