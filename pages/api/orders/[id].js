import Order from "../../../models/Order";
import dbConnect from "../../../util/Mongodb.js";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }

  if (method === "PUT") {
    try {
      const newOrder = await Order.findByIdAndUpdate(id, req.body, {
        new: true,

      });
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
}
