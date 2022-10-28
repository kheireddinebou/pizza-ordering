export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
        quantity: state.quantity + 1,
        total: state.total + action.payload.price * action.payload.quantity,
      };
    case "INIT_STORED":
      return {
        ...state,
        products: action.payload.products,
        quantity: action.payload.quantity,
        total: action.payload.total,
      };

    case "RESET":
      return {
        ...state,
        products: [],
        quantity: 0,
        total: 0,
      };
    default:
      return state;
  }
};
