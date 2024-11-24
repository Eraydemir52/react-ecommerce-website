import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/types";

const BASE_URL = "https://fakestoreapi.com";

class CategoryService {
  getAllCategories(): Promise<string[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${BASE_URL}` + "/products/categories")
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }

  getProductByCategorName(categoryName: string): Promise<ProductType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${BASE_URL}` + `/products/category/${categoryName}`)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new CategoryService();
