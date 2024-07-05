import React, { useState } from 'react';

const LoginForm = ({  }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://api.achiever.skroy.ru/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      // Сохраняем данные в локальное хранилище
      localStorage.setItem('organization_id', data.organization_id);
      localStorage.setItem('link_weight', data.link_weight);
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('profile_id', data.profile_id);

      setErrorMessage('');

      // Обновляем объект после успешного логина
      // updateObject();
    } catch (error) {
      setErrorMessage('Failed to login. Please try again.');
      console.error(error);
    }
    
  };

  const handleLogout = () => {
    // Очищаем локальное хранилище
    // localStorage.removeItem('organization_id');
    // localStorage.removeItem('link_weight');
    // localStorage.removeItem('user_id');
    // localStorage.removeItem('profile_id');
    localStorage.clear();
  };

  return (
    <div>
      <div className="user-form-add">
        <div className="user-form-container-add">
          <form onSubmit={handleSubmit}>
            <label>
              Login:
              <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
          <button className='delete-btn' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
