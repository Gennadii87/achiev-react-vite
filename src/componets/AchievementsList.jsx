import React, { useState, useEffect } from 'react';
import './AchievementsList.css'; 

const AchievementsList = ({ updateObject, onSelectAchievement, updateAchievements }) => {
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievUuid, setSelectedAchievUuid] = useState(null); 
  const [organizationId, setOrganizationId] = useState(null);

  useEffect(() => {
    // Чтение organization_id из локального хранилища
    const orgId = localStorage.getItem('organization_id');
    setOrganizationId(orgId);
  }, [updateObject]);

  useEffect(() => {
    const fetchData = async () => {
      if (!organizationId) return; // Проверяем, есть ли organizationId

      try {
        const response = await fetch('https://api.achiever.skroy.ru/achievements/', {
          headers: {
            'ORGANIZATION-ID': organizationId // Используем значение из локального хранилища
          }
        });
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error('Ошибка при получении данных о достижениях:', error);
      }
    };

    fetchData();
  }, [organizationId, updateAchievements]);

  const handleSelectAchievement = (achievUuid) => {
    setSelectedAchievUuid(achievUuid); // Обновляем состояние с выбранным achievUuid
    onSelectAchievement(achievUuid); // Передаем выбранный achievUuid в родительский компонент
  };


  const handleDeleteAchievement = async (achievementId) => {
    try {
      await fetch(`https://api.achiever.skroy.ru/achievements/${achievementId}/`, {
        method: 'DELETE'
      });
      // Обновляем список достижений после удаления
      const updatedAchievements = achievements.filter(achievement => achievement.id !== achievementId);
      setAchievements(updatedAchievements);
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  return (
    <div className="achievements-list">
      {Array.isArray(achievements) && achievements.map((achievement) => (
        <div 
          key={achievement.id} 
          className="achievement-card with-background" 
          style={{ backgroundImage: `url(${achievement.data.achiev_style})` }}
          onClick={() => handleSelectAchievement(achievement.id)} // обработчик события onClick к карточке
        >
          <img src={achievement.data.image} alt={achievement.data.title} />
          <p>{achievement.data.title}</p>
          <button className='delete_card_achiev' onClick={(e) => {e.stopPropagation(); handleDeleteAchievement(achievement.id)}}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AchievementsList;
