// import React from 'react';
// import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
// import App from './App';
// import RegistrationPage from './RegistrationPage';
// import Header from './Header'

// function RouteApp() {
//   return (
//     <React.Fragment>
//       <Header/>
//         <Routes>
//           <Route path="/" element={<App/>} />
//           <Route path="/form/:organizationId" element={<RegistrationPage />} />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//     </React.Fragment>
//   );
// }

// export default RouteApp;

import React from 'react';
import App from './App';
import Header from './Header';

function RouteApp() {
  return (
    <React.Fragment>
      <Header />
       <App/>
    </React.Fragment>
  );
}

export default RouteApp;
