import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AchievementsList.css'; 

const AchievementsListUser = ({ userId, updateAchievements }) => {
  const [achievements, setAchievements] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.achiever.skroy.ru/user-achievements/${userId}`);
      const extractedAchievements = response.data.map(item => ({
        id: item.id,
        data: item.data
      }));
      setAchievements(extractedAchievements);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId, updateAchievements]); // Добавляем updateAchievements в зависимости

  const handleDeleteAchievement = async (id) => {
    try {
      await axios.delete(`https://api.achiever.skroy.ru/user-achievements/${id}`);
      const updatedAchievements = achievements.filter(connect => connect.id !== id);
      setAchievements(updatedAchievements);
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div className="achievements-list-user">
      {achievements.map((connect) => (
        <div key={connect.id} className="achievement-card-user with-background" style={{ backgroundImage: `url(${connect.data.achievement.data.achiev_style})` }}>
          <img src={connect.data.achievement.data.image} alt=''/>
          <p>{connect.data.achievement.data.title}</p>
          <p>ID: {connect.data.achievement.id}</p>
          <button className='delete_bt_connect' onClick={() => handleDeleteAchievement(connect.id)}>Лишить награды</button>
        </div>
      ))}
    </div>
  );
};

export default AchievementsListUser;