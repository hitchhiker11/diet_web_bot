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
    console.log(userData);
  };

  return (
    <div className="App">
      <h1>Diet App</h1>
      <form onSubmit={handleSubmit} style={{textAlign: 'left', marginLeft: '40px'}}>
        <div style={{maxWidth: '300px'}}>
          <label>
            ФИО:
            <input type="text" name="name" value={userData.name} onChange={handleChange} style={{width: '100%'}} />
          </label>
          <label>
            Возраст:
            <input type="number" name="age" value={userData.age} onChange={handleChange} style={{width: '100%'}} />
          </label>
          <label>
            Пол:
            <select name="gender" value={userData.gender} onChange={handleChange} style={{width: '100%'}}>
              <option value="">Выбрать...</option>
              <option value="male">Мужчина</option>
              <option value="female">Женщина</option>
            </select>
          </label>
          <label>
            Уровень активности:
            <select name="activity" value={userData.activity} onChange={handleChange} style={{width: '100%'}}>
              <option value="">Выбрать...</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </label>
          {!showAdditionalFields && (
            <label>
              Метаболизм:
              <input type="number" name="metabolism" value={userData.metabolism} onChange={handleChange} style={{width: '100%'}} />
            </label>
          )}
          <button type="button" onClick={() => setShowAdditionalFields(!showAdditionalFields)}>
            Не знаю свой метаболизм
          </button>
          {showAdditionalFields && (
            <>
              <label>
                Рост:
                <input type="number" name="height" value={userData.height} onChange={handleChange} style={{width: '100%'}} />
              </label>
              <label>
                Вес:
                <input type="number" name="weight" value={userData.weight} onChange={handleChange} style={{width: '100%'}} />
              </label>
              <label>
                Окружность бедра:
                <input type="number" name="hipCircumference" value={userData.hipCircumference} onChange={handleChange} style={{width: '100%'}} />
              </label>
              <label>
                Окружность запястья:
                <input type="number" name="wristCircumference" value={userData.wristCircumference} onChange={handleChange} style={{width: '100%'}} />
              </label>
            </>
          )}
        </div>
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}

export default App;
