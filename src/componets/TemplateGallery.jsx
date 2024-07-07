import React, { useState, useEffect } from 'react';
import './TemplateGallery.css';

const TemplateGallery = () => {
  const [images, setImages] = useState([]);
  const [updatedAchievements, setAchievements] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.achiever.skroy.ru/templates-images/');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, [updatedAchievements]);
  const handleDeleteAchievement = async (imageId) => {
    try {
      await fetch(`https://api.achiever.skroy.ru/achievements/${imageId}/`, {
        method: 'DELETE'
      });
      // Обновляем список достижений после удаления
      setAchievements();
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };
  return (
    <div className="template-gallery">
      {images.map((image) => (
        <div key={image.id}  className="template-card with-background" style={{ backgroundImage: `url(${image.data.image})` }}>
          <div className='template_text'><p>{image.data.title}</p></div>
          <div className='container_delete'><button className='delete_template_achiev' onClick={(e) => {e.stopPropagation(); handleDeleteAchievement(image.id)}} disabled>удалить</button></div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;
