

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
    weight: ""
  });
  const [calculatedMetabolism, setCalculatedMetabolism] = useState(null);
  const [finalMetabolism, setFinalMetabolism] = useState(null);
  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const calculateMetabolism = () => {
    const M = 10 * parseFloat(userData.weight) + 6.25 * parseFloat(userData.height) - 5 * parseFloat(userData.age);
    if (userData.gender === 'female') M -= 161;
    return M >= 1200 ? M : 1200;
  };

  const calculatePM1 = () => {
    if (calculatedMetabolism < 1400) return 1400;
    return calculatedMetabolism;
  };

  const calculatePM2 = () => {
    const activityMultiplier = {
      low: 0,
      medium: 300,
      high: 500
    };
    const pm1 = calculatePM1();
    return pm1 + activityMultiplier[userData.activity];
  };

  const handleSubmit = e => {
    e.preventDefault();
    const initialMetabolism = calculateMetabolism();
    setCalculatedMetabolism(initialMetabolism);
    const finalValue = calculatePM2();
    setFinalMetabolism(finalValue);
  };

  return (
    <div className="App">
      <h2>Ассистент-диетолог</h2>
      <form onSubmit={handleSubmit}>
      <label>
          ФИО:
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </label>
        <label>
          Возраст:
          <input type="number" name="age" value={userData.age} onChange={handleChange} />
        </label>
        <label>
          Пол:
          <select name="gender" value={userData.gender} onChange={handleChange}>
            <option value="">Выбрать...</option>
            <option value="male">Мужчина</option>
            <option value="female">Женщина</option>
          </select>
        </label>
        <label>
          Уровень активности:
          <select name="activity" value={userData.activity} onChange={handleChange}>
            <option value="">Выбрать...</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </label>
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

        {!userData.metabolism && 
          <button type="button" onClick={() => setShowAdditionalFields(!showAdditionalFields)}>
            Не знаю свой метаболизм
          </button>
        }
        {showAdditionalFields && (
          <>
            <label>
              Рост, см:
              <input type="number" name="height" value={userData.height} onChange={handleChange} />
            </label>
            <label>
              Вес, кг:
              <input type="number" name="weight" value={userData.weight} onChange={handleChange} />
            </label>
          </>
        )}

        <button type="submit">Подтвердить</button>
      </form>
      {finalMetabolism && (
        <p>Итоговый метаболизм: {finalMetabolism}</p>
      )}
    </div>
  );
}

export default App;
