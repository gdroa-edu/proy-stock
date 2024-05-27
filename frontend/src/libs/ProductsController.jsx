import axios from "axios";

const api = process.env.NEXT_PUBLIC_API_URL+"producto/";

class ProductsController {
  getProducts() {
    return axios.get(api);
  }

  getProduct(id) {
    return axios.get(`${api}${id}`);
  }

  createProduct(product) {
    return axios.post(api, product);
  }

  updateProduct(id) {
    return axios.put(`${api}/${id}`);
  }

  deleteProduct(id) {
    return axios.delete(`${api}/${id}`);
  }
}

export default new ProductsController();
