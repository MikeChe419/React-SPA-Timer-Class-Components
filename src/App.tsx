import React from "react"
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";
import {Routes, Route, useLocation} from 'react-router-dom'

const App = () => {
    return (
        <Layout>
            <Header></Header>
        </Layout>
       
    )
}

export default App
