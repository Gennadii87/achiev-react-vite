import React, { useState, useEffect } from 'react';
import RankSetter from './RankSetter';


const RankViewerView = ({ selectedUserId }) => {
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

        console.log(`Запрос...получения Rank ${JSON.stringify(data.map((item) => ({
          profile_id: item.profile_id,
          rank: item.rank
        })))}`);

        setRankData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rank data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedUserId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const userRankData = rankData.find(item => item.profile_id === selectedUserId);
  const rankId = userRankData ? userRankData.id : null; 
  
return (
  <div>
    <dvi>
      {rankData.length === 0 ? (
        <div>
          <h1>Баллы: 0</h1>
        </div>
      ) : (
        rankData.map((item) => (
          <div key={item.id}>
            <h1>Баллы: {item && item.rank !== undefined ? item.rank : 0}</h1> 
          </div>
        ))
      )}
    </dvi>
    <RankSetter rankId={rankId}/>
  </div>
);

};


export default RankViewerView;
