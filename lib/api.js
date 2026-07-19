import axios from 'axios';

const API_BASE = "https://sistech-ecommerce-api.leficullen.xyz/api";

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await axios({
      url: `${API_BASE}${endpoint}`,
      method: options.method || 'GET',
      data: options.body,
      headers: options.headers,
    });
    return res.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    // cegah error crash jika api gagal (404, 502, masalah jaringan)
    return { data: null };
  }
}

export async function getProducts() {
  const res = await fetchAPI("/products");
  return res.data || [];
}

export async function getProduct(id) {
  const res = await fetchAPI(`/products/${id}`);
  return res.data || null;
}

export async function getStores() {
  const res = await fetchAPI("/stores");
  return res.data || [];
}

export async function getStore(id) {
  const res = await fetchAPI(`/stores/${id}`);
  return res.data || null;
}

export async function getStoreProducts(id) {
  const res = await fetchAPI(`/stores/${id}/products`);
  return res.data || [];
}

export async function getCategories() {
  const res = await fetchAPI("/categories");
  return res.data || [];
}

export async function getBrands() {
  const res = await fetchAPI("/brands");
  return res.data || [];
}

export async function getStats() {
  const res = await fetchAPI("/stats");
  return res.data || null;
}
