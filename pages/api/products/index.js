import Product from "../../../models/Product";
import dbConnect from "../../../util/mongodb.js";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const newProduct = await Product.create(req.body);
      res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate");
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
