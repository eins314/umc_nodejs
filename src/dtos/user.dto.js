export const bodyToUser = (body) => {               //사용자 객체(User Object)를 생성하는 역할을 합니다.
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      phone_number: body.phone_number,
    };
  };



  export const responseFromUser = ({ user, preferences }) => {
    console.log('responseFromUser input:', { user, preferences });
  
    const preferFoods = (preferences || []).map(
      (preference) => preference.foodCategory.name
    );
  
    return {
      email: user.email,
      name: user.name,
      preferCategory: preferFoods,
    };
  };
  
  export const reviewToDto = (review) => {
    if (!review) return null;
  
    return {
      id: review.id,
      review: review.review,
      score: review.score,
      createdAt: review.created_at,
      userId: review.userId,
      storeId: review.storeId,  
    };
  };






/*
export const responseFromUser = (response) => {     //서버 응답 데이터를 클라이언트가 사용할 응답 객체로 변환합니다.
    return {
        userId: response.userId,
        responseContent: response.content,
        timestamp: new Date(response.timestamp),
    };
};*/