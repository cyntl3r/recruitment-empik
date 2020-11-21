import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/productContext';
import { useApiRequest } from '../../hooks/useApiRequest';
import { getCartService } from '../../services';
import { calculateTotalOrder } from '../../utils/calculateTotalOrder';
import { priceFormat } from '../../utils/priceFormat';
import { Loader } from '../Loader/Loader';
import { ProductList } from '../ProductList/ProductList';
import './App.css';

export const App = () => {
  const { setFetchedProducts } = useContext(ProductContext);
  const {
    makeRequest: makeGetCartRequest,
    data: products,
    loading,
  } = useApiRequest({
    service: getCartService,
    initialData: [],
    initialLoading: true,
  });

  useEffect(() => {
    makeGetCartRequest();
  }, []);

  useEffect(() => {
    if (products) {
      setFetchedProducts(products);
    }
  }, [products]);

  return (
    <div className="app">
      <h3>Lista produktów</h3>
      {loading ? <Loader /> : <ProductList data={products} />}
      <h4>Suma zamówienia: {priceFormat(calculateTotalOrder(products))}</h4>
    </div>
  );
};
