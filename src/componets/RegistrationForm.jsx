// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = ({ organizationId }) => {
  const [formData, setFormData] = useState({
    login: 'UserGS',
    specialty: 'Бармен_GS',
    start_work_date: '2024-05-12',
    password: '123456',
    first_name: 'Иван_GS',
    last_name: 'Васильевв',
    phone: '+79244663456',
    email: 'user@example.com'
  });

  const apiUrl = `https://reg.achiever.skroy.ru/registrations/?organization_id=${organizationId}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Registration successful!');
      
    } catch (error) {
      alert('Registration failed: ' + error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='user-form-add'>
      <div className="user-form-container-add">
    <form onSubmit={handleSubmit}>
      <label>
        Login:
        <input type="text" name="login" value={formData.login} onChange={handleChange} />
      </label><br />
      <label>
        Specialty:
        <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
      </label><br />
      <label>
        Start Work Date:
        <input type="text" name="start_work_date" value={formData.start_work_date} onChange={handleChange} />
      </label><br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label><br />
      <label>
        First Name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </label><br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </label><br />
      <label>
        Phone:
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </label><br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label><br />
      <button type="submit">Register</button>
    </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
