import Stripe from "stripe";
import ordersManager from "../data/mongo/orders.mongo.js";
import CheckoutProduct from "../dto/checkout.dto.js";
import winstonLog from "../utils/logger/index.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const checkoutRepository = async (filter) => {
  try {
    let productsOnCart = await ordersManager.read(filter)
    winstonLog.INFO(productsOnCart.docs);
    productsOnCart = productsOnCart.docs.map((each)=> new CheckoutProduct(each))
    
    const line_items = productsOnCart
    const mode = "payment";
    const success_url = "http://localhost:8000";
    const intent = await stripe.checkout.sessions.create({
      line_items,
      mode,
      success_url,
    });
    return intent;
  } catch (error) {
    throw error;
  }
};

export default checkoutRepository;
