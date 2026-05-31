import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

export const getProducts = async (limit = 40) => {
  const res = await api.get(`/products?limit=${limit}`);
  return res.data.products;
};

export const getProductById = async (id: string | number) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const searchProducts = async (query: string) => {
  const res = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
  return res.data.products;
};

export const createProduct = async (formData: FormData) => {
  const res = await api.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export default api;
