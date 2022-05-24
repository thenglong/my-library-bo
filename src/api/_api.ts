import axios from "axios"
import AxiosMockAdapter from "axios-mock-adapter"

import { getRandomInt } from "utils/number-utils"

const api = axios.create()

// TODO: remove
const delayResponse = getRandomInt(1, 2) === 1 ? 1000 : 2000

export const mock = new AxiosMockAdapter(api, { delayResponse })

export default api
