import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "There is an error!"
    )
)

export const mock = new AxiosMockAdapter(axiosInstance, { delayResponse: 0 })

export default axiosInstance
