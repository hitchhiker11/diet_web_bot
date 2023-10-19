import React, { useState } from 'react';
import './App.css';

function App() {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    activity: "",
    metabolism: "",
    height: "",
    weight: "",
    hipCircumference: "",
    wristCircumference: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const calculateMetabolism = () => {
    if (userData.gender === 'female') {
      let B = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 300;
      return B >= 1200 ? B : 1200;
    }
    // Добавьте расчет для мужчин, если это необходимо
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (showAdditionalFields) {
      userData.metabolism = calculateMetabolism();
    }
    console.log(userData);
  };

  const handleDontKnowClick = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  return (
    <div className="App">
      <h2>Ассистент-диетолог</h2>
      <form onSubmit={handleSubmit}>
        {/* Остальные поля */}
        <label>
          Метаболизм:
          <input 
            type="number" 
            name="metabolism" 
            value={userData.metabolism} 
            onChange={handleChange} 
            disabled={showAdditionalFields}
          />
        </label>
        <button type="button" onClick={handleDontKnowClick}>
          {!showAdditionalFields ? 'Не знаю свой метаболизм' : 'Я знаю свой метаболизм'}
        </button>
        {showAdditionalFields && (
          <>
            {/* Поля для ввода роста, веса и других параметров */}
            <label>
              Рост, см:
              <input type="number" name="height" value={userData.height} onChange={handleChange} />
            </label>
            <label>
              Вес, кг:
              <input type="number" name="weight" value={userData.weight} onChange={handleChange} />
            </label>
            {/* Добавьте другие поля, если это необходимо */}
          </>
        )}
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}

export default App;
