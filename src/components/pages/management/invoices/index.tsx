import { useState, useEffect, useCallback } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import PageHeader from "components/pages/management/invoices/PageHeader"
import Results from "components/pages/management/invoices/Results"
import Statistics from "components/pages/management/invoices/Statistics"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

const ManagementInvoices = () => {
  const isMountedRef = useRefMounted()
  const [invoices, setInvoices] = useState([])

  const getInvoices = useCallback(async () => {
    try {
      const response = await axios.get("/api/invoices")

      if (isMountedRef.current) {
        setInvoices(response.data.invoices)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getInvoices()
  }, [getInvoices])

  return (
    <>
      <Helmet>
        <title>Invoices - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
          <Statistics />
        </Grid>
        <Grid item xs={12}>
          <Results invoices={invoices} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementInvoices
