import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [productsData, setProductsData] = useState([]);

  const setFetchedProducts = (products) => {
    setProductsData(
      products.map((product) => {
        product.quantity = product.min || 1;
        product.latestCorrectQuantity = product.quantity;
        return product;
      })
    );
  };

  const downProductQuantity = (pid) =>
    setProductsData(
      productsData.map((product) => {
        if (product.pid === pid) {
          product.quantity -= 1;
        }
        return product;
      })
    );

  const upProductQuantity = (pid) =>
    setProductsData(
      productsData.map((product) => {
        if (product.pid === pid) {
          product.quantity += 1;
        }
        return product;
      })
    );

  const resetProductQuantityToMinValue = (pid) =>
    setProductsData(
      productsData.map((product) => {
        if (product.pid === pid) {
          product.quantity = product.min || 1;
        }
        return product;
      })
    );

  const setLatestCorrectQuantity = (pid, quantity) => {
    setProductsData(
      productsData.map((product) => {
        if (product.pid === pid) {
          product.latestCorrectQuantity = quantity;
        }
        return product;
      })
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products: productsData,
        setFetchedProducts,
        downProductQuantity,
        upProductQuantity,
        resetProductQuantityToMinValue,
        setLatestCorrectQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
