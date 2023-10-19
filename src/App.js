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

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const calculateMetabolism = () => {
    let B = 10 * parseFloat(userData.weight) + 6.25 * parseFloat(userData.height) - 5 * parseFloat(userData.age) - 300;
    return B >= 1200 ? B : 1200;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (showAdditionalFields && userData.gender === 'female') {
      const metabolismValue = calculateMetabolism();
      setUserData({ ...userData, metabolism: metabolismValue });
      setCalculatedMetabolism(metabolismValue);
    } else {
      setCalculatedMetabolism(userData.metabolism);
    }
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
      {calculatedMetabolism && (
        <p>Вычисленный метаболизм: {calculatedMetabolism}</p>
      )}
    </div>
  );
}

export default App;
