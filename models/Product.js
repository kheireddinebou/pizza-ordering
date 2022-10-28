import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    desc: {
      type: String,
      requied: true,
    },
    img: {
      type: String,
      requied: true,
    },
    prices: {
      type: [Number],
      requied: true,
    },
    extraOptions: {
      type: [
        {
          text: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
      requied: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
