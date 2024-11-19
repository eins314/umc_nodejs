import { getStoreById } from "../repositories/store.repository.js";

const checkStoreExists = async (storeId) => {
  const store = await getStoreById(storeId);
  return store !== null;
};
