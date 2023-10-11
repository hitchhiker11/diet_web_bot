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

  const handleSubmit = e => {
    e.preventDefault();
    // здесь код для отправки данных на сервер
    console.log(userData);
  };

  return (
    <div className="App">
      <h1>Diet App</h1>
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
          <button type="button" onClick={() => setShowAdditionalFields(true)}>
            Не знаю свой метаболизм
          </button>
        }
        {showAdditionalFields && (
          <>
            <label>
              Рост:
              <input type="number" name="height" value={userData.height} onChange={handleChange} />
            </label>
            <label>
              Вес:
              <input type="number" name="weight" value={userData.weight} onChange={handleChange} />
            </label>
            <label>
              Окружность бедра:
              <input type="number" name="hipCircumference" value={userData.hipCircumference} onChange={handleChange} />
            </label>
            <label>
              Окружность запястья:
              <input type="number" name="wristCircumference" value={userData.wristCircumference} onChange={handleChange} />
            </label>
          </>
        )}
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}

export default App;
