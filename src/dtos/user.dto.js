export const bodyToUser = (body) => {
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

export const responseFromUser = (response) => {
    return {
        userId: response.userId,
        responseContent: response.content,
        timestamp: new Date(response.timestamp),
    };
};