import { createContext, useEffect, useReducer } from "react";
import { cartReducer } from "./CartReducer";

const INITIAL_STATE = {
  products: [],
  quantity: 0,
  total: 0,
};

export const CartContext = createContext(INITIAL_STATE);

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("products"))?.length > 0) {
      dispatch({
        type: "INIT_STORED",
        payload: {
          products: JSON.parse(localStorage.getItem("products")),
          quantity: JSON.parse(localStorage.getItem("quantity")),
          total: JSON.parse(localStorage.getItem("total")),
        },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state.products));
    localStorage.setItem("quantity", JSON.stringify(state.quantity));
    localStorage.setItem("total", JSON.stringify(state.total));
  }, [state]);

  return (
    <CartContext.Provider
      value={{
        products: state.products,
        quantity: state.quantity,
        total: state.total,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
