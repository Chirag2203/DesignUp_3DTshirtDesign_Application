import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Auth0Provider} from '@auth0/auth0-react'
// import { BrowserRouter as Router } from 'react-router-dom';

// import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config();

//redirect url are set for port 5173 if port 3000 change from auth0 settings
const domain = 'dev-j5aihneume4tc7yz.us.auth0.com';
const clientid = 'ne4F713FRDqPNEs2yiazStTrBV5I8iYW';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain={domain}
    clientId={clientid}
    redirectUri={window.location.origin}
    >

    <App />
    </Auth0Provider>
  </React.StrictMode>,
)
