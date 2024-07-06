import React, { useState, useEffect } from 'react';
import './TemplateGallery.css';

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
    <div className="template-gallery">
      {images.map((image) => (
        <div key={image.id}  className="template-card with-background" style={{ backgroundImage: `url(${image.data.image})` }}>
          {/* <img src={image.data.image} alt={image.data.title} /> */}
          <div className='template_text'><p>{image.data.title}</p></div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGallery;
