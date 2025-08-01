import axiosInstance from "../lib/axiosInstance";

const productServices = {
  product: () => axiosInstance.get(`/products`),
  productDetail: (id: any) => axiosInstance.get(`/products/` + id),
  updateProduct: (id, formData) => {
    return axiosInstance.put(`/products/${id}`, formData);
  },
  addProduct: (payload: FormData) =>
    axiosInstance.post(`/add-products`, payload),
  deleteData: (payload: any) =>
    axiosInstance.delete(`/products/delete`, {
      data: payload,
    }),
};

export default productServices;
