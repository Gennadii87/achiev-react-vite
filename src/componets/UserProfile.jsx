import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import PostRequestComponent from './PostRequestComponent';

const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Man_silhouette.svg/640px-Man_silhouette.svg.png';

const UserProfile = ({ achievUuid, selectedUserId, setSelectedUserId, updateObject}) => {
    const [userData, setUserData] = useState(null);
    const [userUuid, setUserUuid] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        birth_date: '',
        phone: '',
        email: '',
        photo_main: '',
        photo_small: ''
    });
    const [userList, setUserList] = useState([]);
    const [loadingError, setLoadingError] = useState(false);
    const [organizationId, setOrganizationId] = useState(null);

    useEffect(() => {
        // Чтение organization_id из локального хранилища
        const orgId = localStorage.getItem('organization_id');
        setOrganizationId(orgId);
      }, [updateObject]);

    useEffect(() => {
        const fetchUserList = async () => {
            if (!organizationId) return; // Проверяем, есть ли organizationId
            
            try {
                const response = await fetch('https://api.achiever.skroy.ru/profiles/', {
                    headers: {
                      'ORGANIZATION-ID': organizationId // Используем значение из локального хранилища
                    }
                  });
                if (!response.ok) {
                    throw new Error('Failed to fetch user list');
                }
                const data = await response.json();
                setUserList(data.map(profile => profile.profile_id));
            } catch (error) {
                console.error('Error fetching user list:', error);
                setLoadingError(true);
            }
        };

        fetchUserList();
    }, [organizationId]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedUserId) {
                try {
                    const response = await fetch(`https://api.achiever.skroy.ru/profiles/${selectedUserId}/`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await response.json();
                    setUserData(userData);
                    setUserUuid(userData.profile_id);
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
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setLoadingError(true);
                }
            }
        };

        fetchData();
    }, [selectedUserId]);

    const handleSelectUser = (e) => {
        const userId = e.target.value;
        setSelectedUserId(userId);
        localStorage.setItem('selectedUserId', userId);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleCancelClick = () => {
        setEditMode(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.achiever.skroy.ru/profiles/${selectedUserId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData
                })
            });
            if (response.ok) {
                console.log('User data updated successfully');
                const updatedResponse = await fetch(`https://api.achiever.skroy.ru/profiles/${selectedUserId}/`);
                if (!updatedResponse.ok) {
                    throw new Error('Failed to fetch updated user data');
                }
                const updatedData = await updatedResponse.json();
                setUserData(updatedData);
                setEditMode(false);
            } else {
                console.error('Failed to update user data');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
            setLoadingError(true);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem('selectedUserId');
        if (storedUserId) {
            setSelectedUserId(storedUserId);
        }
    }, []);

    const imageExists = (url) => {
        const img = new Image();
        img.src = url;
        return img.complete && img.naturalHeight !== 0;
    };

    return (
        <div className="user-profile">
            <div className="user-card">
                <select className='select-user' value={selectedUserId || ''} onChange={handleSelectUser}>
                    {loadingError && (
                        <option value="">Ошибка при загрузке данных.</option>
                    )}
                    <option value="">Выберите ID пользователя</option>
                    {userList.map(userId => (
                        <option key={userId} value={userId}>{userId}</option>
                    ))}
                </select>
                {userData && (
                    <>
                        {!editMode ? (
                            <>
                                <div className="user-avatar">
                                    <img src={imageExists(userData.photo_main) ? userData.photo_main : defaultAvatar} alt="User Avatar" />
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
                                    <PostRequestComponent userUuid={userUuid} achievUuid={achievUuid}/>
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

export default UserProfile;
