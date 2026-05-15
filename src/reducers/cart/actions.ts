import Types from "./types";
import { CartProduct } from "lib/interfaces";

export interface BulkAddAction {
  type: Types.bulkAdd;
  payload: CartProduct[];
}

export interface AddToCartAction {
  type: Types.addToCart;
  payload: CartProduct;
}

export interface RemoveSingleItemAction {
  type: Types.removeSingleItem;
  payload: string;
}

export interface RemoveWholeProduct {
  type: Types.removeWholeProduct;
  payload: string;
}

export interface RemoveAllItems {
  type: Types.removeAllItems;
}
