import axios from "axios";
import config from "../api/config"

axios.defaults.baseURL = config.api

export default axios;