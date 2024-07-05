import React, { useState, useEffect } from 'react';


const RankViewer = ({  }) => {
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
      // Чтение organization_id из локального хранилища
      const proId = localStorage.getItem('profile_id');
      setProfileId(proId);
    }, []);

  useEffect(() => {
    if (!profileId || profileId === 0) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.achiever.skroy.ru/ranks/?profile_id=${profileId}`);
        const data = await response.json();
        setRankData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rank data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [profileId]);

  if (loading) {
    return <div>Loading...</div>;
  }


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
  </div>
);

};


export default RankViewer;
