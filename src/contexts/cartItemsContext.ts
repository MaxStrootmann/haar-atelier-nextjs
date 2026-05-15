import React from "react";
import { ACTIONTYPES } from "reducers/cart/reducer";
import { CartProduct } from "lib/interfaces";

const CartContext = React.createContext<{
  dispatch: React.Dispatch<ACTIONTYPES>;
  cart: CartProduct[];
}>({
  dispatch: () => null,
  cart: [],
});

export default CartContext;
