import checkoutRepository from "../repositories/payments.rep.js"


const checkoutService = async (filter) => {
    try {
      const response = await checkoutRepository(filter);
      return response;
    } catch (error) {
      throw error;
    }
  };
  
  export default checkoutService;