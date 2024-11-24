import { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import { UserType } from "../types/types";

class LoginPageService {
  login(): Promise<UserType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get("/users")
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}
export default new LoginPageService();
