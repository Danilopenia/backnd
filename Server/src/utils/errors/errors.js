const errors = {
    error: { message: "Error", statusCode: 400 },
    message: (message) =>({statusCode:400, message}),
    callBackPass: (message, statusCode) =>({statusCode, message}),
    invalidId: { message: "invalid Id", statusCode: 400 },
    //register: { message: "User already exists", statusCode: 400 },
    token: { message: "Invalid verified token!", statusCode: 400 },
    existPass:{message: "user already exist", statusCode: 401},
    auth: { message: "Invalid credentials", statusCode: 401 },
    forbidden: { message: "Forbidden", statusCode: 403 },
    notFound: { message: "Not Found", statusCode: 404 },
    fatal: { message: "Fatal", statusCode: 500 },
  };
  
  export default errors;