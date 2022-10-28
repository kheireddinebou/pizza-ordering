import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import styles from "../styles/Cart.module.css";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import axios from "axios";
import DeliveryForm from "../components/DeliveryForm";

const cart = () => {
  const [open, setOpen] = useState(false);
  const [openCash, setOpenCash] = useState(false);
  const { products, total, dispatch } = useContext(CartContext);
  const router = useRouter();

  const createOrder = async data => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      router.push(`/orders/${res.data._id}`);
      dispatch({ type: "RESET" });
    } catch (error) {
      console.log(error);
    }
  };

  const amount = total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then(orderId => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  console.log(products);

  return (
    <div className="container" style={{ paddingTop: "90px" }}>
      {openCash && (
        <DeliveryForm
          total={total}
          createOrder={createOrder}
          setOpenCash={setOpenCash}
        />
      )}
      <div className="row py-5">
        <div className="col-xl-8">
          <table className="table ">
            <thead>
              <tr>
                <th className={styles.head} scope="col ">
                  Product
                </th>
                <th className={styles.head} scope="col">
                  Name
                </th>
                <th className={styles.head} scope="col">
                  Extras
                </th>
                <th className={styles.head} scope="col">
                  Price
                </th>
                <th className={styles.head} scope="col">
                  Quantity
                </th>
                <th className={styles.head} scope="col">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className={styles.tBody}>
              {products.map(product => (
                <tr key={product._id}>
                  <th scope="row">
                    <img src={product.img} alt={product.name} />
                  </th>
                  <td>{product.name} </td>
                  <td> {product.options.map(o => `${o.text}, `)}</td>
                  <td>${product.price} </td>
                  <td>{product.quantity} </td>
                  <td>${product.quantity * product.price} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-xl-4 bg-dark d-flex flex-column p-5 text-white">
          <span className="fw-bolder fs-2">CART TOTAL</span>

          <div className="mt-3">
            <span className="fw-semibolder fs3">Subtotal : </span>
            <span className="fw-semibolder fs3"> ${total}</span>
          </div>

          <div>
            <span className="fw-semibolder fs3">Discounts :</span>
            <span className="fw-semibolder fs3"> $0.00</span>
          </div>

          <div>
            <span className="fw-semibolder fs3">Total :</span>
            <span className="fw-semibolder fs3"> ${total}</span>
          </div>

          {open ? (
            <div className={styles.paymentMethodes}>
              <button onClick={() => setOpenCash(true)}>
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AQwF5y9fe05T6dJLoRTapEIkGSQ9ke4frKEWQarRTSzxwR9sblFxGdPmCWvNVy1VAm_m_bXiQrbXV1RY",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className={styles.checkoutBtn}
            >
              Checkout now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default cart;
