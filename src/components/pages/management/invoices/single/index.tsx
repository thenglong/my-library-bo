import { useState, useCallback, useEffect } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import InvoiceBody from "components/pages/management/invoices/single/InvoiceBody"
import PageHeader from "components/pages/management/invoices/single/PageHeader"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

const ManagementInvoicesView = () => {
  const isMountedRef = useRefMounted()
  const [invoice, setInvoice] = useState(null)

  const { invoiceId } = useParams()

  const getInvoice = useCallback(async () => {
    try {
      const response = await axios.get("/api/invoice", {
        params: {
          invoiceId,
        },
      })
      if (isMountedRef.current) {
        setInvoice(response.data.invoice)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [invoiceId, isMountedRef])

  useEffect(() => {
    getInvoice()
  }, [getInvoice])

  if (!invoice) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Invoice Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader invoice={invoice} />
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
