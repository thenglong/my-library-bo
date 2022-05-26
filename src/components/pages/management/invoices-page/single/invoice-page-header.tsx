import { ArrowBackTwoTone as ArrowBackTwoToneIcon } from "@mui/icons-material"
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom"

import { Invoice } from "typings/api-model"

interface InvoicePageHeaderProps {
  invoice: Invoice
}

const InvoicePageHeader = ({ invoice }: InvoicePageHeaderProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    return navigate(`/${location.pathname.split("/")[1]}/management/invoices`)
  }

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
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
                #{invoice.number}
              </Typography>
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link color="inherit" href="#">
                  {t("Home")}
                </Link>
                <Link color="inherit" href="#">
                  {t("Management")}
                </Link>
                <Link color="inherit" href="#">
                  {t("Commerce")}
                </Link>
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={`/${location.pathname.split("/")[1]}/management/invoices`}
                >
                  {t("Invoices")}
                </Link>
                <Typography color="text.primary">
                  {t("Invoice")} #{invoice.number}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleBack}
            variant="contained"
          >
            {t("View all invoices")}
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default InvoicePageHeader
