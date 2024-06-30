import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reg.achiever.skroy.ru/avatar-images/');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteAchievement = async (imageId) => {
    try {
      await fetch(`https://reg.achiever.skroy.ru/achievements/${imageId}/`, {
        method: 'DELETE'
      });
      // Обновляем список достижений после удаления
      const updatedAchievements = images.filter(image => image.id !== imageId);
      setAchievements(updatedAchievements);
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };
  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <img src={image.data.image} alt={image.data.title} />
          <p>{image.data.title}</p>
          <button className='delete_card_achiev' onClick={(e) => {e.stopPropagation(); handleDeleteAchievement(image.id)}}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
