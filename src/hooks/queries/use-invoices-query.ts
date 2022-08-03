import { useQuery } from "@tanstack/react-query"

import invoiceApi from "api/invoices-api"

const useInvoicesQuery = () => {
  return useQuery("invoices", invoiceApi.getInvoices)
}

export default useInvoicesQuery
