import fetch from '../utils/fetch';

export const getProducts = async ()=>{
  return fetch('api/v2/merchant/products')
}