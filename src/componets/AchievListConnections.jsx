import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AchievListConnections = ({ updateObject }) => {
  const [achievements, setAchievements] = useState([]);

  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
      // Чтение profile_id из локального хранилища
      const proId = localStorage.getItem('profile_id');
      setProfileId(proId);
    }, [updateObject]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://reg.achiever.skroy.ru/user-achievements/${profileId}`);
        const extractedAchievements = response.data.map(item => ({
          id: item.id,
          data: item.data
        }));
        setAchievements(extractedAchievements);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (profileId) { // Делаем запрос только если profileId определен
      fetchData();
    }
  }, [profileId]); // Добавляем profileId в зависимости

  const handleDeleteAchievement = async (id) => {
    try {
      await axios.delete(`https://reg.achiever.skroy.ru/user-achievements/${id}`);
      // Успешно удалено, обновим список достижений
      const updatedAchievements = achievements.filter(connect => connect.id !== id);
      setAchievements(updatedAchievements);
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div className="achievements-list">
    
      {achievements.map((connect, index) => (
        <div key={index} className="achievement-card-conn">
          <p>ID: {connect.id}</p>
          <p>User ID: {connect.data.user_id}</p>
          <p>Achievement: {connect.data.achievement.id}</p>
          <div className="achievement-card-user with-background" style={{ backgroundImage: `url(${connect.data.achievement.data.achiev_style})` }}>
          <img src={connect.data.achievement.data.image} alt=''/>
          <p>{connect.data.achievement.data.title}</p>
          </div>
          <button className='delete_bt' onClick={() => handleDeleteAchievement(connect.id)}>Удалить</button>
        </div>
        
      ))}
    </div>
  );
};

export default AchievListConnections;

