import React, { useEffect, useState } from 'react';
import './App.css';
const tg = window.Telegram.WebApp;
function App() {

  useEffect (() => {
    tg.ready()
  }, [])

  const onClose = () => {
    tg.close();
  }

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    activity: "",
    metabolism: "",
    // добавьте другие необходимые поля
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
          <input type="number" name="metabolism" value={userData.metabolism} onChange={handleChange} />
        </label>
        {/* Добавьте другие поля по необходимости */}
        <button type="submit">Подтвердить</button>
      </form>
    </div>
  );
}

export default App;
