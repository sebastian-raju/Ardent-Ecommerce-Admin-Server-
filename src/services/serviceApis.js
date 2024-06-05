import { BASE_URL } from "./baseUrl";
import { commonStructure } from "./commonStructure";





// getting all products in descending order

export const getAllProductsApi = async () => {
  return commonStructure('GET', `${BASE_URL}/products?_sort=id&_order=desc`, {});
}

// getting a product

export const getSingleProductApi = async (id) => {
  return commonStructure('GET', `${BASE_URL}/products/${id}`, {})
}

// adding new product

export const createNewProductApi = async (data) => {
  return commonStructure('POST', `${BASE_URL}/products`, data);
}


// editing a product

export const editProductApi = async (id, data) => {
  return commonStructure('PATCH', `${BASE_URL}/products/${id}`, data);
}

// deleting a product

export const deleteProductApi = async (id) => {
  return commonStructure('DELETE', `${BASE_URL}/products/${id}`, {});
}