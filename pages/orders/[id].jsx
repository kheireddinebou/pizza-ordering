import axios from "axios";
import React from "react";
import styles from "../../styles/Order.module.css";

const Order = ({ order }) => {
  const status = order.status;

  const statusClass = index => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className="container" style={{ paddingTop: "90px" }}>
      <div className="row py-5 g-5 ">
        <div className="col-xl-8">
          <div className="d-flex align-items-center justify-content-around">
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bolder">Order ID</span>
              <span className="fs-5">{order._id}</span>
            </div>
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bolder">Customer</span>
              <span className="fs-5">{order.customer}</span>
            </div>{" "}
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bolder">Address</span>
              <span className="fs-5">{order.address}</span>
            </div>{" "}
            <div className="d-flex flex-column">
              <span className="fs-4 fw-bolder">Total</span>
              <span className="fs-5">${order.total}</span>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-around mt-5">
            <div className={statusClass(0)}>
              <img className={styles.statusImg} src="/img/paid.png" alt="" />
              <span className="fs-5 fw-semibold">Payment</span>
              <img
                src="/img/checked.png"
                className={styles.checkedImg}
                alt=""
              />
            </div>
            <div className={statusClass(1)}>
              <img className={styles.statusImg} src="/img/bake.png" alt="" />
              <span className="fs-5 fw-semibold">Preparing</span>
              <img
                src="/img/checked.png"
                className={styles.checkedImg}
                alt=""
              />
            </div>
            <div className={statusClass(2)}>
              <img className={styles.statusImg} src="/img/bike.png" alt="" />
              <span className="fs-5 fw-semibold">One the way</span>
              <img
                src="/img/checked.png"
                className={styles.checkedImg}
                alt=""
              />
            </div>
            <div className={statusClass(3)}>
              <img
                className={styles.statusImg}
                src="/img/delivered.png"
                alt=""
              />
              <span className="fs-5 fw-semibold">Delivered</span>
              <img
                src="/img/checked.png"
                className={styles.checkedImg}
                alt=""
              />
            </div>
            `
          </div>
        </div>
        <div className="col-xl-4 bg-dark d-flex flex-column p-5 text-white">
          <span className="fw-bolder fs-2">CART TOTAL</span>

          <div className="mt-3">
            <span className="fw-semibolder fs3">Subtotal : </span>
            <span className="fw-semibolder fs3"> ${order.total}</span>
          </div>

          <div>
            <span className="fw-semibolder fs3">Discounts :</span>
            <span className="fw-semibolder fs3"> $0.00</span>
          </div>

          <div>
            <span className="fw-semibolder fs3">Total :</span>
            <span className="fw-semibolder fs3"> ${order.total}</span>
          </div>

          <button disabled className={styles.paidBtn}>
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};
