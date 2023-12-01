import React, { useState } from 'react';

function AddProductToDiet({ onAdd }) {
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(selectedProduct);
    setSelectedProduct('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Добавить Продукт:
        <input 
          type="text" 
          value={selectedProduct} 
          onChange={(e) => setSelectedProduct(e.target.value)} 
        />
      </label>
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddProductToDiet;
