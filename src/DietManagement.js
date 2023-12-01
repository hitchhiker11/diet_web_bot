import React, { useState, useEffect } from 'react';

function DietManagement() {
  const [diet, setDiet] = useState([]);

  useEffect(() => {
    // Здесь должен быть запрос к API для получения текущего рациона пользователя
    // setDiet(response.data);
  }, []);

  const handleRemoveProduct = productId => {
    setDiet(diet.filter(product => product.id !== productId));
  };

  return (
    <div>
      <h2>Ваш Рацион</h2>
      {diet.length === 0 ? (
        <p>Рацион пока пуст</p>
      ) : (
        <ul>
          {diet.map(product => (
            <li key={product.id}>
              {product.name}
              <button onClick={() => handleRemoveProduct(product.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DietManagement;
