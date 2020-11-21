import React from 'react';
import { priceFormat } from '../../utils/priceFormat';
import { ProductItemQuantity } from '../ProductItemQuantity/ProductItemQuantity';
import './ProductItem.css';

export const ProductItem = ({
  pid,
  name,
  price,
  max,
  min,
  isBlocked,
  quantity,
  latestCorrectQuantity,
}) => (
  <li className="product-item">
    <div>
      {name}, cena: {priceFormat(price)}
    </div>
    <ProductItemQuantity
      pid={pid}
      max={max}
      min={min}
      isBlocked={isBlocked}
      quantity={quantity}
      latestCorrectQuantity={latestCorrectQuantity}
    />
  </li>
);
