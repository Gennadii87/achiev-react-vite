import React, { useState, useEffect } from 'react';
import './AchievForm.css'; 

const AchievForm = ({ }) => {
  const initialFormData = {
    tag: 'Failure',
    rank: 101,
    color: 'green',
    image: 'https://api.achiever.skroy.ru/media/image/Image=Failure.svg',
    title: 'Failure',
    description: 'Achiev1',
    achiev_style: 'https://api.achiever.skroy.ru/media/template/CardAchievementMediumPrimaryCircle.png'
  };

  const [formData, setFormData] = useState(initialFormData);
  const [response, setResponse] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [organizationId, setOrganizationId] = useState(null);

  useEffect(() => {
    // Чтение organization_id из локального хранилища
    const orgId = localStorage.getItem('organization_id');
    setOrganizationId(orgId);
  }, []);

  useEffect(() => {
    setPreviewData(formData);
  }, [formData]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://api.achiever.skroy.ru/achievements/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'ORGANIZATION-ID': organizationId
          },
          body: JSON.stringify(formData)
        });
        const responseData = await response.json();
        setResponse(responseData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (

    <div className="achiev-container">
      <div className="response-container">
        <h2>Response</h2>
        <div className="response-card">
          {response && response.data && (
            <div className="achievement-card-user with-background" style={{ backgroundImage: `url(${response.data.achiev_style})` }}>
              <img src={response.data.image} alt={response.data.title} />
              <p>{response.data.title}</p>
              <p>ID: {response.id}</p>
            </div>
          )}
        </div>
      </div>
      <div className="form-container">
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tag:
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Rank:
            <input
              type="number"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Color:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Image:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Achiev Style:
            <input
              type="text"
              name="achiev_style"
              value={formData.achiev_style}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
        <div className="preview-container">
          <h2>Preview</h2>
          {previewData && (
            <div className="achievement-card-user with-background" style={{ backgroundImage: `url(${previewData.achiev_style})` }}>
              <img src={previewData.image} alt={previewData.title} />
              <div className='text_ach_pre'>              
              <p>{previewData.title}</p>
              <p>{previewData.description}</p>
              <p>{previewData.rank}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievForm;
