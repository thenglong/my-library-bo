import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import InvoiceBody from "components/pages/management/invoices-page/single/invoice-body"
import InvoicePageHeader from "components/pages/management/invoices-page/single/invoice-page-header"
import useInvoiceQuery from "hooks/queries/use-invoice-query"

const ManagementInvoicesView = () => {
  const { invoiceId } = useParams()
  const { data: invoice } = useInvoiceQuery(invoiceId as string)

  if (!invoice) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Invoice Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <InvoicePageHeader invoice={invoice} />
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
          <InvoiceBody invoice={invoice} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementInvoicesView
