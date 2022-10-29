import axios from "axios";
import React, { useState } from "react";

const Admin = ({ products, orders }) => {
  const [productsState, setProductsState] = useState(products);
  const [ordersState, setOrdersState] = useState(orders);

  const status = ["preparing", "on the way", "delivered"];

  const deleteProduct = async id => {
    try {
      await axios.delete(`https://pizza-ordering.vercel.app/api/products/${id}`);
      setProductsState(productsState.filter(p => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateOrder = async id => {
    const currentOrder = ordersState.find(o => o._id === id);
    try {
      const res = await axios.put(`https://pizza-ordering.vercel.app/api/orders/${id}`, {
        status: currentOrder.status + 1,
      });
      setOrdersState([...ordersState.filter(o => o._id !== id), res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div
        style={{ marginTop: "80px" }}
        className="py-5 row justify-content-between g-2"
      >
        <div className="col-xl-6 ">
          <span className="h2">Products</span>
          <table className="table table-borderless mt-3">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Id</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {productsState.map(product => (
                <tr key={product._id}>
                  <th>
                    <img width="80" src={product.img} alt={product.name} />
                  </th>
                  <td>{product._id.slice(0, 5)}...</td>
                  <td>{product.name}</td>
                  <td>{product.prices[0]}</td>
                  <td className="d-flex gap-1">
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-xl-6 ">
          <span className="h2">Orders</span>
          <table className="table table-borderless mt-3">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Customer</th>
                <th scope="col">Total</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersState.map(order => (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 8)}...</td>
                  <td>{order.customer}</td>
                  <td>${order.total}</td>
                  <td>{order.method === 0 ? "Cash" : "Paid"}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button
                      disabled={order.status >= 2}
                      onClick={() => updateOrder(order._id)}
                      className="btn btn-success"
                      style={{
                        opacity: order.status >= 2 ? "0.5" : "1",
                      }}
                    >
                      Next Step
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;

export const getServerSideProps = async ctx => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        parmanent: false,
      },
    };
  }

  const productsRes = await axios.get("https://pizza-ordering.vercel.app/api/products");
  const ordersRes = await axios.get("https://pizza-ordering.vercel.app/api/orders");

  return {
    props: {
      products: productsRes.data || [],
      orders: ordersRes.data || [],
    },
  };
};
