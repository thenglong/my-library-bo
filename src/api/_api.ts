import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"

const api = axios.create()

export const mock = new AxiosMockAdapter(api, { delayResponse: 100 })

export default api
