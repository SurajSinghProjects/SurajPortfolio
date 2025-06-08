export const successResponse = (message, data, statusCode = 200) => {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  };

  export const errorResponse = (message, statusCode = 500) => {
    return {
      success: false,
      error: {
        message,
        statusCode,
      },
    };
  };
