import {appConstants} from "../constants";

export const initialState = {
  products: [],
  errors: [],
  contentSlots: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appConstants.GET_CONTENT_SLOTS_SUCCESS:
      return {
        ...state,
        contentSlots: action.payload
      };

    case appConstants.UPDATE_CONTENT_SLOTS_SUCCESS:
      return {
        ...state,
        contentSlots: action.payload
      };

    case appConstants.UPLOAD_PRODUCT_SUCCESS:
      return action.payload.reduce(
        (
          state,
          {
            id,
            productCode,
            productName,
            productCategory,
            imageFile,
            imageFileName,
            imageUrl,
            slot,
            checked
          }
        ) => {
          const shouldUpdate = state.products.some(
            (product) => product.productCode === productCode
          );

          if (shouldUpdate) {
            return {
              ...state,
              products: state.products.map((product) =>
                product.productCode === productCode
                  ? {
                    ...product,
                    productImages: product.productImages.concat({
                      id,
                      imageFile,
                      imageFileName,
                      imageUrl,
                      slot,
                      checked
                    })
                  }
                  : product
              )
            };
          }

          return {
            ...state,
            products: state.products.concat({
              id,
              productCode,
              productName,
              productCategory,
              productExisting: true,
              productImages: [
                {
                  id,
                  imageFile,
                  imageFileName,
                  imageUrl,
                  slot,
                  checked
                }
              ]
            })
          };
        },
        state
      );

    case appConstants.VALIDATE_SUCCESS:
      return {
        ...state,
        errors: [
          ...state.errors,
          ...action.payload.data.filter((data, idx) => {
            return action.payload.images.some(
              (image) => data.id === image.imageFileName
            );
          })
        ]
      };

    case appConstants.UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
};

export default appReducer;
