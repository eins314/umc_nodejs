// src/repositories/store.repository.js

import { pool } from "../db.config.js";

export const checkStoreExists = async (storeId) => {
  try {
    const [rows] = await pool.query(`SELECT 1 FROM stores WHERE id = ?`, [storeId]);
    return rows.length > 0;
  } catch (error) {
    throw new Error("가게 존재 여부 확인 중 오류가 발생했습니다.");
  }
};

export const getStoreById = async (storeId) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM stores WHERE id = ?`, [storeId]);
    return rows[0] || null;
  } catch (error) {
    throw new Error("가게 정보를 가져오는 중 오류가 발생했습니다.");
  }
};
