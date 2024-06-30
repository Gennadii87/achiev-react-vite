import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import RouteApp from './componets/RouteApp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/achiev-react-vite/'>
      <RouteApp/>
    </BrowserRouter>
  </React.StrictMode>
);
