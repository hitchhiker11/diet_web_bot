import React from 'react';
import { Link } from 'react-router-dom';
import './MainScreen.css';

function MainScreen() {
  return (
    <div className="MainScreen">
      <div className="profile-container">
        <div className="profile-image">
          {/* Это место для изображения пользователя, вы можете заменить следующую строку URL вашего изображения */}
          <img src="path_to_your_image" alt="Профиль" />
        </div>
        <h2>Имя из телеграма</h2> 
        {/* Замените "Имя из телеграма" на переменную, содержащую имя пользователя */}
      </div>

      <div className="info-container">
        <p>Возраст (предпросмотр)</p>
        <p>Вес (предпросмотр)</p>
        <p>метаболизм (предпр.)</p>
      </div>

      <div className="buttons-container">
        <Link to="/my-parameters" className="button">Мои параметры</Link>
        <Link to="/my-diet" className="button">Мой рацион</Link>
      </div>
    </div>
  );
}

export default MainScreen;
