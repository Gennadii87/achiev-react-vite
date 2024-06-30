// RegistrationPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const { organizationId } = useParams();

  return (
    <div className='profile'>
      <div>
      <hr/>
      <h1>Registration Form</h1>
      <div className='registration_h'>Регистрация в <span className='id_org'>{organizationId}</span></div>
      <RegistrationForm organizationId={organizationId} />
      </div>
    </div>
  );
};

export default RegistrationPage;
