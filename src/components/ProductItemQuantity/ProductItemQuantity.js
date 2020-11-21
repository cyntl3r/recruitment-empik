import debounce from 'lodash.debounce';
import React, { useCallback, useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/productContext';
import { useApiRequest } from '../../hooks/useApiRequest';
import { checkProductQuantity } from '../../services';
import { polishPlural } from '../../utils/polishPlural';
import './ProductItemQuantity.css';

export const ProductItemQuantity = ({
  pid,
  max,
  min,
  isBlocked,
  quantity,
  latestCorrectQuantity,
}) => {
  const {
    downProductQuantity,
    upProductQuantity,
    resetProductQuantityToMinValue,
    setLatestCorrectQuantity,
  } = useContext(ProductContext);
  const {
    makeRequest: makeCheckProductQuantityRequest,
    data: checkProductQuantityData,
    error: checkProductQuantityError,
  } = useApiRequest({
    service: checkProductQuantity,
  });

  const handleQuantityDown = () => {
    downProductQuantity(pid);
  };

  const handleQuantityUp = () => {
    upProductQuantity(pid);
  };

  const makeRequestWithDebounce = useCallback(
    debounce((pid, quantity, latestCorrectQuantity) => {
      if (quantity !== latestCorrectQuantity) {
        makeCheckProductQuantityRequest(pid, quantity);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    makeRequestWithDebounce(pid, quantity, latestCorrectQuantity);
  }, [quantity, latestCorrectQuantity]);

  useEffect(() => {
    if (checkProductQuantityError) {
      resetProductQuantityToMinValue(pid);
    } else if (checkProductQuantityData && checkProductQuantityData.success) {
      setLatestCorrectQuantity(pid, quantity);
    }
  }, [checkProductQuantityData, checkProductQuantityError]);

  return (
    <div className="product-item-quantity">
      <span>
        Obecnie masz {quantity}{' '}
        {polishPlural('sztukę', 'sztuki', 'sztuk', quantity)} produktu
      </span>
      <button
        type="button"
        className="product-item-quantity__button"
        disabled={isBlocked || quantity - 1 < min}
        onClick={handleQuantityDown}
      >
        -
      </button>
      <button
        type="button"
        className="product-item-quantity__button"
        disabled={isBlocked || quantity + 1 > max}
        onClick={handleQuantityUp}
      >
        +
      </button>
    </div>
  );
};
