import api from "api/_api"
import "./mock-invoices"
import { Invoice } from "typings/api-model"

const getInvoices = async () => {
  const res = await api.get<Invoice[]>("/api/v1/invoices")
  return res.data
}

const getInvoiceById = async (id: Invoice["id"]) => {
  const res = await api.get<Invoice>(`/api/v1/invoices/:id`, {
    params: { id },
  })
  return res.data
}

const invoiceApi = {
  getInvoices,
  getInvoiceById,
}

export default invoiceApi
