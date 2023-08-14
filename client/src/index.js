import React from 'react';
import ReactDOM from "react-dom/client";
import "./index.css"
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import UserProvider from "./UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="bg-[#10143d]">
      <UserProvider>
        <App />
      </UserProvider>    
        </div>
    </Provider>
  </React.StrictMode>,
);
