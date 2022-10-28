import React, { useRef } from "react";
import styles from "../styles/Delivery.module.css";
import { AiOutlineClose } from "react-icons/ai";

const DeliveryForm = ({ total, createOrder, setOpenCash }) => {
  const customer = useRef();
  const address = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    createOrder({
      customer: customer.current.value,
      address: address.current.value,
      total: total,
      method: 0,
    });
  };

  return (
    <div className={styles.deliveryPage}>
      <div className={styles.delivery}>
        <AiOutlineClose
          className={styles.closeBtn}
          onClick={() => setOpenCash(false)}
        />
        <span className="h3">Please write your informations</span>
        <form onSubmit={handleSubmit}>
          <label className="h5">Name Surname</label>
          <input ref={customer} type="text" placeholder="John Doe" required />

          <label className="h5">Phone Number</label>
          <input type="text" placeholder="+1 234 567 89" required />

          <label className="h5">Address</label>
          <input ref={address} type="text" placeholder="Address" required />

          <button type="submit">Order</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryForm;
