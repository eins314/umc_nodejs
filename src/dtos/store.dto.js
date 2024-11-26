export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};

// src/dtos/store.dto.js

export class StoreRequestDto {
    constructor(storeId) {
      this.storeId = storeId;
    }
  }
  