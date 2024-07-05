import React, { useState } from 'react';
import './PostRequestComponent.css'

const PostRequestComponent = ({ userUuid, achievUuid }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      const response = await fetch('https://api.achiever.skroy.ru/user-achievements/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userUuid,
          achievement_id: achievUuid
        })
      });
  
      const responseData = await response.json();
      setStatus('success');

      // Вызываем функцию обновления списка достижений, переданную извне
      // if (updateAchievements) {
      //   updateAchievements();
      // }
  
      // Сбросить статус через некоторое время
      setTimeout(() => {
        setStatus(null);
      }, 800); // Пример: сбросить через 
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {status === 'success' ? (
        <p>Награда успешно присвоена!</p>
      ) : status === 'error' ? (
        <p>Произошла ошибка при присвоении награды</p>
      ) : (
        <button className="add-button" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Подождите...' : 'Присвоить награду'}
        </button>
      )}
    </div>
  );
};

export default PostRequestComponent;