import React, { useState, useEffect } from 'react';
import './RankSetter.css';

const RankSetter = ({ rankId, updateAchievements }) => {
  const [rank, setRank] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSetRank = async () => {
    try {
      if (rankId === null) {
        setErrorMessage('Присвойте награду');
        setTimeout(() => {
          setRank(0); // Сброс ранга после отображения сообщения
          setErrorMessage(null); // Скрытие сообщения через секунду
        }, 1000);
        return;
      }

      const response = await fetch(`https://reg.achiever.skroy.ru/rank/${rankId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            rank: rank
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Ошибка при установке ранга');
      }
      
      setSuccessMessage('Успех!');
      // Вызов функции updateAchievements для обновления данных достижений
      updateAchievements();
      
      // Сброс ранга после установки через секунду
      setTimeout(() => {
        setRank(0);
        setSuccessMessage(null); // Сброс сообщения об успешной установке ранга
      }, 1000);
    } catch (error) {
      console.error('Error setting rank:', error);
    }
  };

  useEffect(() => {
    // При изменении rankId сбрасываем сообщение об ошибке
    setErrorMessage(null);
  }, [rankId]);

  return (
    <div className="rank-container">
      {errorMessage ? (
        <input 
          className="rank-form-container-error"
          type="text" 
          value={errorMessage} 
          readOnly
        />
      ) : (
        <input 
          className="rank-form-container"
          type="number" 
          value={rank} 
          onChange={(e) => setRank(parseInt(e.target.value))} 
        />
      )}
      <button className='edit-button-rank' onClick={handleSetRank}>
        {successMessage ? successMessage : 'Начилсить'}
      </button>
    </div>
  );
};

export default RankSetter;
