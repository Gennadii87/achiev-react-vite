import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [updatedAchievements, setAchievements] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.achiever.skroy.ru/avatar-images/');
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
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <img src={image.data.image} alt={image.data.title} />
          <div c><p>{image.data.title}</p></div>
          <button className='delete_img_achiev' onClick={(e) => {e.stopPropagation(); handleDeleteAchievement(image.id)}} disabled>удалить</button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
