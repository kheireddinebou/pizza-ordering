import React, { useContext, useRef, useState } from "react";
import styles from "../../styles/ProductPage.module.css";
import axios from "axios";
import { CartContext } from "../../context/CartContext";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [optionsPrice, setOptionsPrice] = useState(0);
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useContext(CartContext);

  const handleOptions = (e, option) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setOptionsPrice(optionsPrice + option.price);
      setOptions([...options, option]);
    } else {
      setOptionsPrice(optionsPrice - option.price);
      setOptions(options.filter(o => o._id !== option._id));
    }
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        ...pizza,
        quantity,
        options,
        price: pizza.prices[size] + optionsPrice,
      },
    });
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ marginTop: "90px", height: "calc(100vh - 90px)" }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <img className="img-fluid" src={pizza.img} alt={pizza.name} />
        </div>
        <div className="col-md-6 d-flex flex-column gap-3 ">
          <span className="fw-bolder fs-1">{pizza.name}</span>

          <span className={styles.price}>
            ${pizza.prices[size] + optionsPrice}
          </span>
          <p className="h5">{pizza.desc}</p>

          <span className="h3 fw-bolder">Choose the size</span>
          <div className="d-flex gap-5">
            <div className={styles.size} onClick={() => setSize(0)}>
              <img src="/img/size.png" alt="" />
              <span>Small</span>
            </div>

            <div className={styles.size} onClick={() => setSize(1)}>
              <img src="/img/size.png" alt="" />
              <span>Medium</span>
            </div>

            <div className={styles.size} onClick={() => setSize(2)}>
              <img src="/img/size.png" alt="" />
              <span>Large</span>
            </div>
          </div>
          <span className="h3 fw-bolder">Choose additional ingredients</span>
          <div className="d-flex alig-items-center gap-2">
            {pizza.extraOptions.map(option => (
              <div key={option._id} className="d-flex  gap-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  onClick={e => handleOptions(e, option)}
                />
                <label className="h5">{option.text}</label>
              </div>
            ))}
          </div>
          <div className={styles.pizzaNumber}>
            <input
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              min="1"
              type="number"
            />
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://pizza-ordering.vercel.app/api/products/${params.id}`
  );

  return {
    props: {
      pizza: res.data,
    },
  };
};
