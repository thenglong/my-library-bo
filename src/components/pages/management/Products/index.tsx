import { useState, useEffect, useCallback } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import PageHeader from "components/pages/management/Products/PageHeader"
import Results from "components/pages/management/Products/Results"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

function ManagementProducts() {
  const isMountedRef = useRefMounted()
  const [products, setProducts] = useState([])

  const getProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/products")

      if (isMountedRef.current) {
        setProducts(response.data.products)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [isMountedRef])

  useEffect(() => {
    getProducts()
  }, [getProducts])

  return (
    <>
      <Helmet>
        <title>Products - Management</title>
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
          <Results products={products} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementProducts
