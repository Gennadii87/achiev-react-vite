import React, { useState } from 'react';
import '../style/App.css';
import Header from './Header';
import UserProfile from './UserProfile';
import AchievementsList from './AchievementsList';
import AchievListConnections from './AchievListConnections';
import ImageGallery from './ImageGallery';
import TemplateGallery from './TemplateGallery';
import AchievForm from './AchievForm';
import Users from './Users';
import AchievementsListUser from './AchievementsListUser';
import UserProfileView from './UserProfileView';
import AchievementsListUserView from './AchievementsListUserView';
import RankViewerView from './RankViewerView';
import RankViewer from './RankViewer';
import LoginForm from './LoginForm';

function App() {
    const [selectedAchievUuid, setSelectedAchievUuid] = useState(null);
    const [userUuid, setUserUuid] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [updateAchievements, setUpdateAchievements] = useState(false);
    const [updateObject, setUpdateObject] = useState(false);
    

    const handleSelectAchievement = (achievUuid) => {
        setSelectedAchievUuid(achievUuid);
    };

    const handleUpdateAchievements = () => {
        setUpdateAchievements(prevState => !prevState);
    };

    const handleUpdateObject = () => {
        setUpdateObject(prevState => !prevState);
    };

    return (
        <React.Fragment>
            <Header/>
            <main>
                <div className='content'>
                    <h1>Награды пользователя</h1>
                </div>
                <div className='profile'>
                    <UserProfile achievUuid={selectedAchievUuid} setUserUuid={setUserUuid} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} updateAchievements={handleUpdateAchievements} updateObject={handleUpdateObject}/>
                    <AchievementsListUser userId={selectedUserId} updateAchievements={handleUpdateAchievements}/>
                    <RankViewerView selectedUserId={selectedUserId}  updateAchievements={handleUpdateAchievements}/>
                </div>
                <div>
                    <h1>Список возможных наград</h1>
                </div>
                <div>
                    <AchievementsList onSelectAchievement={handleSelectAchievement} updateAchievements={handleUpdateAchievements} updateObject={handleUpdateObject}/>
                </div>
                
                <div><h1>Библиотека изображений</h1></div>
                <div className='img_gallery'>
                    <ImageGallery />
                    <TemplateGallery/>
                </div>
                <div className='achiev_form'>
                    <AchievForm updateAchievements={handleUpdateAchievements}/>
                </div>
                <div className='users'>
                    <div><h1>Сотрудники</h1></div>
                    <Users updateAchievements={handleUpdateAchievements}/>
                </div>
                <div><h1>Станица сотрудника</h1></div>
                <div>
                    <LoginForm updateObject={handleUpdateObject}/>
                </div>
                <div className='profile'>
                    <UserProfileView updateObject={handleUpdateObject}/>
                    <AchievementsListUserView updateObject={handleUpdateObject} updateAchievements={handleUpdateAchievements}/>
                </div>
                <h1>Мои баллы</h1>
                <RankViewer updateObject={handleUpdateObject} updateAchievements={handleUpdateAchievements}/>
                <div>
                    <div><h1>Связь награда-пользователь</h1></div>
                    <AchievListConnections updateObject={handleUpdateObject} updateAchievements={handleUpdateAchievements}/>
                </div>
            </main>
        </React.Fragment>
    );
}

export default App;
