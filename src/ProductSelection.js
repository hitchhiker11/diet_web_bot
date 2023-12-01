import React, { useState, useEffect } from 'react';

function ProductSelection() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    // Здесь должен быть запрос к API для получения списка продуктов
    // setProducts(response.data);
  }, []);

  const handleSelectProduct = product => {
    setSelectedProducts([...selectedProducts, product]);
  };

  return (
    <div>
      <h2>Выберите Продукты</h2>
      <div>
        {products.map(product => (
          <button key={product.id} onClick={() => handleSelectProduct(product)}>
            {product.name}
          </button>
        ))}
      </div>
      <div>
        <h3>Выбранные Продукты:</h3>
        {selectedProducts.map(product => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </div>
  );
}

export default ProductSelection;
