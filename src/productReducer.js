import {configureStore} from '@reduxjs/toolkit'
import { SET_PRODUCT_DETAILS } from './constants';

function productReducer(state = { productDetails: null }, action) {
  switch (action.type) {
    case SET_PRODUCT_DETAILS:
        return {productDetails: action.payload}
    default:
      return state;
  }
}

export default configureStore({reducer:{productReducer}});