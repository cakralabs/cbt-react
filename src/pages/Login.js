/* eslint-disable */ 
import { Button, ConfigProvider, Input, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { validateMessages } from "../config"
import { loginUser } from "../controller/Auth";
import logo from '../logo.svg';

const {Item} = Form;
const Login = (props) =>{
    const history = useHistory(),
    [loading,setLoading] = useState(false),
    {dispatch,isAuthenticated,isLoggingIn} = props,
    onFinish = (val) =>{
      setLoading(true)
      loginUser(val,dispatch,setLoading)
    },

    LoginAllTab = (event) =>{
        var ori = window.location.origin
        console.log(event)
        if (event.key == 'login-'+ori) {
            window.location.reload()
        }
    }
    useEffect(()=>{
        
        window.addEventListener('storage', LoginAllTab);

        return(()=>{
            window.removeEventListener('storage',LoginAllTab)
        })
    },[])

    return(       
        <h1>Testing</h1>
    )
}

function mapStateToProps(state) {
    return {
        isLoggingIn : state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
  }
export default (connect(mapStateToProps)(Login));