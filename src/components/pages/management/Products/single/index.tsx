/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback, useEffect } from "react"

import { Grid } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router-dom"

import Footer from "components/footer"
import PageTitleWrapper from "components/page-title-wrapper"
import PageHeader from "components/pages/management/Products/single/PageHeader"
import ProductBody from "components/pages/management/Products/single/ProductBody"
import useRefMounted from "hooks/use-ref-mounted"
import axios from "utils/axios"

function ManagementProductSingle() {
  const isMountedRef = useRefMounted()
  const [product, setProduct] = useState<any>(null)

  const { productId } = useParams()

  const getProduct = useCallback(async () => {
    try {
      const response = await axios.get("/api/product", {
        params: {
          productId,
        },
      })
      if (isMountedRef.current) {
        setProduct(response.data.product)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }, [productId, isMountedRef])

  useEffect(() => {
    getProduct()
  }, [getProduct])

  if (!product) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} - Products Management`}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader product={product} />
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
          <ProductBody product={product} />
        </Grid>
      </Grid>
      <Footer />
    </>
  )
}

export default ManagementProductSingle
