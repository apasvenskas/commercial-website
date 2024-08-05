import { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

const initialState = {
  cart: []
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case "CLEAR_CART":
      return {
        ...state,
        cart: []
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  const addToCart = (id, title, stock, price, discountPercent, mainImgSrc, numItems) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { id, title, stock, price, discountPercent, mainImgSrc, numItems }
    });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <ProductContext.Provider value={{ cart: state.cart, addToCart, removeItem, clearCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
