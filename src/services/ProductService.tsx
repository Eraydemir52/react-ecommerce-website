import axios, { AxiosResponse } from "axios";
import { ProductType } from "../types/types";

class ProductService {
  BASE_URL = "https://fakestoreapi.com";
  getAllProducts(): Promise<ProductType[]> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${this.BASE_URL}` + "/products")
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
  getProductsById(id: number): Promise<ProductType> {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(`${this.BASE_URL}` + "/products/" + id)
        .then((response: AxiosResponse<any, any>) => resolve(response.data))
        .catch((error: any) => reject(error));
    });
  }
}

export default new ProductService();
