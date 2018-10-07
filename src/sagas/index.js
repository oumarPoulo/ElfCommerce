import { takeEvery, takeLatest, all } from 'redux-saga/effects';
import {
  FETCH_PRODUCTS,
  FETCH_NEW_PRODUCTS,
  FETCH_FEATURED_PRODUCTS,
  FETCH_PRODUCT_DETAIL,
  FETCH_CART,
  FETCH_SITE_SETTINGS,
  FETCH_ACCOUNT_SETTINGS,
} from '../actions';
import {
  fetchProducts,
  fetchNewProducts,
  fetchFeaturedProducts,
  fetchProductDetail,
} from './product';
import { fetchSiteSettings } from './admin/setting';
import { fetchCart } from './cart';
import { fetchAccountSettings } from './account';

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_PRODUCTS, fetchProducts),
    takeLatest(FETCH_NEW_PRODUCTS, fetchNewProducts),
    takeLatest(FETCH_FEATURED_PRODUCTS, fetchFeaturedProducts),
    takeLatest(FETCH_PRODUCT_DETAIL, fetchProductDetail),
    takeLatest(FETCH_CART, fetchCart),
    takeLatest(FETCH_SITE_SETTINGS, fetchSiteSettings),
    takeLatest(FETCH_ACCOUNT_SETTINGS, fetchAccountSettings),
  ]);
}
