import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App/App';
import { ProductContextProvider } from './contexts/productContext';

render(
  <ProductContextProvider>
    <App />
  </ProductContextProvider>,
  document.getElementById('root')
);
