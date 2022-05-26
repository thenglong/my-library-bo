import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import InvoicePageHeader from "components/pages/management/invoices-page/invoice-page-header"
import InvoiceResults from "components/pages/management/invoices-page/invoice-results"
import InvoiceStatistics from "components/pages/management/invoices-page/invoice-statistics"
import useInvoicesQuery from "hooks/queries/use-invoices-query"

const ManagementInvoices = () => {
  const { data: invoices } = useInvoicesQuery()
  return (
    <>
      <Helmet>
        <title>Invoices - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <InvoicePageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <InvoiceStatistics />
        </Grid>
        <Grid item xs={12}>
          <InvoiceResults invoices={invoices || []} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementInvoices
