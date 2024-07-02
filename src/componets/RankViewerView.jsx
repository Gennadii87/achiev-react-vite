import React, { useState, useEffect } from 'react';
import RankSetter from './RankSetter';

const RankViewerView = ({ selectedUserId, updateAchievements }) => {
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedUserId || selectedUserId === 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.achiever.skroy.ru/ranks/?profile_id=${selectedUserId}`);
        const data = await response.json();
        setRankData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rank data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedUserId, updateAchievements]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userRankData = rankData.find(item => item.profile_id === selectedUserId);
  const rankId = userRankData ? userRankData.id : null; 
  
return (
  <div>
    <ul>
      {rankData.length === 0 ? (
        <li>
          <h1>Баллы: 0</h1>
        </li>
      ) : (
        rankData.map((item) => (
          <li key={item.id}>
            <h1>Баллы: {item && item.rank !== undefined ? item.rank : 0}</h1> 
          </li>
        ))
      )}
    </ul>
    <RankSetter rankId={rankId} updateAchievements={updateAchievements}/>
  </div>
);

};


export default RankViewerView;
