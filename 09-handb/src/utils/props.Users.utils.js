function propsUsersUtils(data) {
    const { name, lastname } = data;
    if (!name || !lastname) {
      const error = new Error("name & lastname are required");
      error.statusCode = 404;
      throw error;
    }
  }
  
  export default propsUsersUtils;