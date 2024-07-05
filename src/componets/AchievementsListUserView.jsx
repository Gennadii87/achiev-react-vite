
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AchievementsList.css'; 

const AchievementsListUserView = ({}) => {
  const [achievements, setAchievements] = useState([]);

  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
      // Чтение organization_id из локального хранилища
      const proId = localStorage.getItem('profile_id');
      setProfileId(proId);
    }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.achiever.skroy.ru/user-achievements/${profileId}`);
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
    if (profileId) {
      fetchData();
    }
  }, [profileId]); // Добавляем updateAchievements в зависимости


  return (
    <div className="achievements-list-user">
      {achievements.map((connect) => (
        <div key={connect.id} className="achievement-card-user with-background" style={{ backgroundImage: `url(${connect.data.achievement.data.achiev_style})` }}>
          <img src={connect.data.achievement.data.image} alt=''/>
          <p>{connect.data.achievement.data.title}</p>
          <p>ID: {connect.data.achievement.id}</p>
        </div>
      ))}
    </div>
  );
};

export default AchievementsListUserView;