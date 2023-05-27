import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import styles from './global.css'
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
     <App /> 
    </React.StrictMode>);