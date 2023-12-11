// FoodSelection.js
import React, { useState } from 'react';

const PRODUCTS = {
  'Б': [
    { id: 1, name: 'Творог', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
    { id: 2, name: 'Куриная грудка', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
    // Добавьте здесь другие белковые продукты
  ],
  'М': [
    { id: 3, name: 'Кефир', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
    { id: 4, name: 'Молоко', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
    // Добавьте здесь другие белковые продукты
  ],
  'Ф': [
    { id: 3, name: 'Арбуз', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
    { id: 4, name: 'Дыня', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
    // Добавьте здесь другие белковые продукты
  ],
  'О': [
    { id: 3, name: 'Кефир', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
    { id: 4, name: 'Молоко', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
    // Добавьте здесь другие белковые продукты
  ],
  'К': [
    { id: 3, name: 'Булгур крупа', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
    { id: 4, name: 'Картофель', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
    // Добавьте здесь другие белковые продукты
  ],
  'Ж': [
    { id: 3, name: 'Авокадо', mass: 50, unit: 'гр', macro: 'Б', restrictions: [], quantity: 1 },
    { id: 4, name: 'Оливки', mass: 30, unit: 'гр', macro: 'Б', restrictions: ['vegetarian'], quantity: 1 },
    // Добавьте здесь другие белковые продукты
  ],
  // ... другие группы продуктов
};

const FoodSelection = ({ userRestrictions, selectedGroup, onSelectionChange }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const availableProducts = PRODUCTS[selectedGroup].filter(product =>
    !userRestrictions.some(restriction => product.restrictions.includes(restriction))
  );

  const handleProductSelect = (product) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      } else {
        return [...prev, product];
      }
    });
    onSelectionChange(selectedProducts);
  };

  const handleProductQuantityChange = (id, delta) => {
    setSelectedProducts(prev => prev.map(p => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p)));
    onSelectionChange(selectedProducts);
  };

  const handleProductRemove = (id) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== id));
    onSelectionChange(selectedProducts);
  };

  return (
    <div>
      <p>Выберите продукт:</p>
      {availableProducts.map((product) => (
        <div key={product.id}>
          <button onClick={() => handleProductSelect(product)}>{product.name}</button>
        </div>
      ))}
      {selectedProducts.map((product) => (
        <div key={product.id}>
          <span>{product.name} {product.mass * product.quantity}{product.unit} – {product.macro}{product.quantity}</span>
          <button onClick={() => handleProductQuantityChange(product.id, 1)}>+</button>
          <button onClick={() => handleProductQuantityChange(product.id, -1)}>-</button>
          <button onClick={() => handleProductRemove(product.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
};

export default FoodSelection;
