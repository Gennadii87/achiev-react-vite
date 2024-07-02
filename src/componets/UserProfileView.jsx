import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Man_silhouette.svg/640px-Man_silhouette.svg.png';

const UserProfileView = ({ updateObject }) => {
    const [userData, setUserData] = useState(null);
    const [loadingError, setLoadingError] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        birth_date: '',
        phone: '',
        email: '',
        photo_main: '',
        photo_small: '',
    });
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [avatarSrc, setAvatarSrc] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [profileId, setProfileId] = useState(null);

    useEffect(() => {
        const proId = localStorage.getItem('profile_id');
        setProfileId(proId);
    }, [updateObject]);

    useEffect(() => {
        const fetchData = async () => {
            if (profileId) {
                try {
                    const response = await fetch(`https://api.achiever.skroy.ru/profiles/${profileId}/`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await response.json();
                    setUserData(userData);
                    setFormData({
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        middle_name: userData.middle_name,
                        birth_date: userData.birth_date,
                        phone: userData.phone,
                        email: userData.email,
                        photo_main: userData.photo_main,
                        photo_small: userData.photo_small
                    });

                    if (userData.photo_main) {
                        const img = new Image();
                        img.src = userData.photo_main;
                        img.onload = () => {
                            setAvatarSrc(userData.photo_main);
                        };
                        img.onerror = () => {
                            setAvatarSrc(defaultAvatar);
                        };
                    } else {
                        setAvatarSrc(defaultAvatar);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoadingError(true);
                }
            }
        };

        fetchData();
    }, [profileId]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setSelectedFile(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                photo_main: file,
                photo_small: file
            });
            setSelectedFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('first_name', formData.first_name);
            formDataToSend.append('last_name', formData.last_name);
            formDataToSend.append('middle_name', formData.middle_name);
            formDataToSend.append('birth_date', formData.birth_date);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('photo_main', formData.photo_main);
            formDataToSend.append('photo_small', formData.photo_small);

            const response = await fetch(`https://api.achiever.skroy.ru/profiles/${profileId}/`, {
                method: 'PATCH',
                body: formDataToSend
            });

            if (response.ok) {
                const updatedResponse = await fetch(`https://api.achiever.skroy.ru/profiles/${profileId}/`);
                if (!updatedResponse.ok) {
                    throw new Error('Failed to fetch updated user data');
                }
                const updatedData = await updatedResponse.json();
                setUserData(updatedData);
                setEditMode(false);
                setUpdateSuccess(true);

                if (updatedData.photo_main) {
                    const img = new Image();
                    img.src = updatedData.photo_main;
                    img.onload = () => {
                        setAvatarSrc(updatedData.photo_main);
                    };
                    img.onerror = () => {
                        setAvatarSrc(defaultAvatar);
                    };
                } else {
                    setAvatarSrc(defaultAvatar);
                }
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            setLoadingError(true);
        }
    };

    return (
        <div className="user-profile">
            <div className="user-card">
                {userData && (
                    <>
                        {!editMode ? (
                            <>
                                <div className="user-avatar">
                                    {avatarSrc && (
                                        <img src={avatarSrc} alt="User Avatar" />
                                    )}
                                </div>
                                <div className="user-details">
                                    <p>ID: {userData.profile_id}</p>
                                    <p>Имя: {userData.first_name}</p>
                                    <p>Фамилия: {userData.last_name}</p>
                                    <p>Отчество: {userData.middle_name}</p>
                                    <p>Почта: {userData.email}</p>
                                    <p>Телефон: {userData.phone}</p>
                                    <p>Дата рождения: {userData.birth_date}</p>
                                    <button className='edit-button' onClick={handleEditClick}>Редактировать профиль</button>
                                </div>
                            </>
                        ) : (
                            <div className="user-form-container">
                                <span className="cancel-icon" onClick={handleCancelClick}>✖️</span>
                                <h2>Редактировать профиль</h2>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} placeholder="Имя" />
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} placeholder="Фамилия" />
                                    <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} placeholder="Отчество" />
                                    <input type="text" name="email" value={formData.email} onChange={handleInputChange} placeholder="Почта" />
                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Телефон" />
                                    <input type="date" value={formData.birth_date} onChange={(e) => setFormData({...formData, birth_date: e.target.value})} placeholder="Дата рождения" />
                                    <label className="custom-file-upload">
                                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                                        Загрузить фото
                                    </label>
                                    {selectedFile && (
                                        <div className="selected-image">
                                            <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
                                        </div>
                                    )}
                                    <button type="submit">Сохранить</button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfileView;
