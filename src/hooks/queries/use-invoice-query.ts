import { useQuery } from "react-query"

import invoiceApi from "api/invoices-api"
import { Invoice } from "typings/api-model"

const useInvoiceQuery = (id: Invoice["id"]) => {
  return useQuery(["invoice", id], () => invoiceApi.getInvoiceById(id))
}

export default useInvoiceQuery
