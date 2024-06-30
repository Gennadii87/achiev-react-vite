import React, { useState, useEffect } from 'react';
import './Users.css';

const defaultAvatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Man_silhouette.svg/640px-Man_silhouette.svg.png';

const Users = ({ updateAchievements }) => {
    const [usersData, setUsersData] = useState([]);
    const [loadingError, setLoadingError] = useState(false);
    const [formData, setFormData] = useState({
        first_name: 'Тест Имя',
        last_name: 'Тест Фамилия',
        middle_name: 'Тест Отчество',
        birth_date: '1987-05-15',
        email: 'user@example.com',
        phone: '1234567890',
        photo_main: null,
        photo_small: null,
    });
    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://reg.achiever.skroy.ru/profiles/', {
                    headers: {
                      'ORGANIZATION-ID': '642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389'
                    }
                  });
                if (!response.ok) {
                    throw new Error('Failed to fetch users data');
                }
                const data = await response.json();
                setUsersData(data || []);
            } catch (error) {
                console.error('Error fetching users data:', error);
                setLoadingError(true);
            }
        };

        fetchData();
    }, [updateAchievements]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'other_info') {
                const otherInfoJSON = JSON.stringify(formData.other_info);
                formDataToSend.append('other_info', otherInfoJSON);
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }
        // Log the form data
        console.log('Form data to be sent:', Object.fromEntries(formDataToSend.entries()));

        try {
            const response = await fetch('https://reg.achiever.skroy.ru/profiles/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ORGANIZATION-ID': '642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389'
                  },
                body: formDataToSend
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            updateAchievements();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`https://reg.achiever.skroy.ru/profiles/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'ORGANIZATION-ID': '642dc1e1-162d-4cb5-a3d1-7f4fcbcb5389'
                  },
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            updateAchievements();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Set the file directly in formData
            setFormData({
                ...formData,
                photo_main: file,
                photo_small: file
            });
        }
    };
    const imageExists = (url) => {
        const img = new Image();
        img.src = url;
        return img.complete && img.naturalHeight !== 0;
    };
    return (
        <div>
            {/* <div className="user-form-add">
                <div className="user-form-container-add">
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} placeholder="Имя" />
                        <input type="text" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} placeholder="Фамилия" />
                        <input type="text" value={formData.middle_name} onChange={(e) => setFormData({...formData, middle_name: e.target.value})} placeholder="Отчество" />
                        <input type="date" value={formData.birth_date} onChange={(e) => setFormData({...formData, birth_date: e.target.value})} placeholder="Дата рождения" />
                        <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" />
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Телефон" />
                        <div>
                            <input type="file" onChange={handleFileChange} />
                            {formData.photo_main && (
                                <div>
                                    <p>Выбранное изображение:</p>
                                    <img src={URL.createObjectURL(formData.photo_main)} alt="Selected Image" />
                                </div>
                            )}
                        </div>
                        <button type="submit">Создать пользователя</button>
                    </form>
                </div>
            </div> */}
            {loadingError ? (
                <div className="error-card">
                    <h1>Произошла ошибка при загрузке данных пользователей.</h1>
                </div>
            ) : (
                <div className="users-list">
                    {usersData && usersData.map((userData) => (
                        <div className="users-profile" key={userData.profile_id}>
                            <div className="users-card">
                                <div className="users-avatar">
                                <img src={imageExists(userData.photo_main) ? userData.photo_main : defaultAvatar} alt="User Avatar" />
                                </div>
                                <div className="users-details">
                                    <p>ID: {userData.profile_id}</p>
                                    <p>Имя: {userData.first_name}</p>
                                    <p>Фамилия: {userData.last_name}</p>
                                    <p>Отчество: {userData.middle_name}</p>
                                    <p>День рождения: {userData.birth_date}</p>
                                    <p>Почта: {userData.email}</p>
                                    <p>Телефон: {userData.phone}</p>
                                    <p>Фото большое: {userData.photo_main}</p>
                                    <p>Фото маленькое: {userData.photo_small}</p>
                                    <button className='delete-btn' onClick={() => handleDeleteUser(userData.profile_id)}>Удалить</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
