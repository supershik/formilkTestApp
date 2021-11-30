import { appConstants } from "../constants";
import { contentSlots } from "../data";

export const getContentSlots = (payload) => {
  return {
    type: appConstants.GET_CONTENT_SLOTS_SUCCESS,
    payload: contentSlots
  };
};

export const updateContentSlots = (payload) => {
  return {
    type: appConstants.UPDATE_CONTENT_SLOTS_SUCCESS,
    payload: payload
  };
};

export const uploadProduct = (payload) => {
  return {
    type: appConstants.UPLOAD_PRODUCT_SUCCESS,
    payload
  };
};

export const updateProduct = () => {
  return {
    type: appConstants.UPDATE_PRODUCT_SUCCESS
  };
};
