import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

const TemplateGallery = () => {
  const [images, setImages] = useState([]);

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
  }, []);

  return (
    <div className="image-gallery">
      {images.map((image) => (
        <div key={image.id} className="image-card">
          <img src={image.data.image} alt={image.data.title} />
          <p>{image.data.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;
