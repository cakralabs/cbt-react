/* eslint-disable */ 
import React, { useEffect, useState } from "react";
import logo from '../../../logo.svg';
import { Breadcrumb as BC,Button,Empty,message,Modal,Row, Select, Spin, Tag, Tooltip } from "antd";

const Dashboard = () =>{
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />          
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default Dashboard