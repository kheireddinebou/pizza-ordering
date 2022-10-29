import Order from "../../../models/Order";
import dbConnect from "../../../util/mongodb.js";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }

  if (method === "POST") {
    try {
      const newOrder = await Order.create(req.body);
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
}
