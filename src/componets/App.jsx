import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import '../style/App.css';
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
import RegistrationPage from './RegistrationPage';

function App() {
    const [selectedAchievUuid, setSelectedAchievUuid] = useState(null);
    const [userUuid, setUserUuid] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [updateObject, setUpdateObject] = useState(false);
    const [updateRank, setUpdateRank] = useState(false);

    const handleSelectAchievement = (achievUuid) => {
        setSelectedAchievUuid(achievUuid);
    };

    const handleUpdateObject = () => {
        setUpdateObject(prevState => !prevState);
    };

    const handleUpdateRank = () => {
        console.log('Updating rank...');
        setUpdateRank(prevState => !prevState);
    };

    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={
                    <>
                        <div className='content'>
                            <h1>Награды пользователя</h1>
                        </div>

                        <div className='profile'>
                            <UserProfile achievUuid={selectedAchievUuid} setUserUuid={setUserUuid} selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId}/>
                            <AchievementsListUser userId={selectedUserId}/>
                            <RankViewerView selectedUserId={selectedUserId}/>
                        </div>

                        <div>
                            <h1>Список возможных наград</h1>
                        </div>

                        <div>
                            <AchievementsList onSelectAchievement={handleSelectAchievement}/>
                        </div>

                        <div>
                            <h1>Станица сотрудника</h1>
                        </div>

                        <div>
                            <LoginForm/>
                        </div>
                        
                        <div className='profile'>
                            <UserProfileView/>
                            <AchievementsListUserView/>
                        </div>

                        <h1>Мои баллы</h1>
                        <RankViewer/>

                        <div>
                            <div>
                                <h1>Связь награда-пользователь</h1>
                            </div>
                            <AchievListConnections/>
                        </div>
                        <Outlet />
                    </>
                }>

                </Route>
                <Route path="/users" 
                    element={
                        <div className='users'>
                            <div>
                                <h1>Сотрудники</h1>
                            </div>
                            <Users/>
                        </div>
                           }/>
                <Route path="/gallery" 
                    element={
                    <>
                        <div>
                            <h1>Библиотека изображений</h1>
                        </div>
                        <div className='container_gallery'>
                            <div className='img_gallery'>
                                <ImageGallery />
                                <TemplateGallery />
                            </div>
                        </div>
                        <div className='achiev_form'><AchievForm /></div>
                    </>
                } />

                <Route path="/form/:organizationId" element={<RegistrationPage />} />
                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        </React.Fragment>
    );
}

export default App;
