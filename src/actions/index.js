import {appConstants} from "../constants";
import {contentSlots} from "../data";

export const getContentSlots = (payload) => {
  return {
    type: appConstants.GET_CONTENT_SLOTS_SUCCESS,
    payload: contentSlots
  };
};

export const uploadProduct = (payload) => {
  return {
    type: appConstants.UPLOAD_PRODUCT_SUCCESS,
    payload
  };
};

export const updateProducts = (payload) => {
  return {
    type: appConstants.UPDATE_PRODUCTS_SUCCESS,
    payload: payload
  };
};
