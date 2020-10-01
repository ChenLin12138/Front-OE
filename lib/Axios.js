import axios from "axios";
import User from "./user";

class Axios {
  // static _baseURL = "http://t.ztest.org/api/";
  static _baseURL = "http://localhost:8080/api/";
  static init() {
    const config = {
      //.. configuration
      withCredentials: true,
      baseURL: Axios._baseURL,
    };

    if (typeof window !== "undefined") {
      const token = User.getToken();
      config.headers = { token };
    }
    return axios.create(config);
  }
}

export default Axios;
