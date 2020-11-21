import React from 'react';
import './ProductList.css';
import { ProductItem } from '../ProductItem/ProductItem';

export const ProductList = ({ data }) => (
  <ul className="product-list">
    {data.map(
      ({
        pid,
        name,
        price,
        max,
        min,
        isBlocked,
        quantity,
        latestCorrectQuantity,
      }) => (
        <ProductItem
          key={pid}
          pid={pid}
          name={name}
          price={price}
          max={max}
          min={min}
          isBlocked={isBlocked}
          quantity={quantity}
          latestCorrectQuantity={latestCorrectQuantity}
        />
      )
    )}
  </ul>
);
