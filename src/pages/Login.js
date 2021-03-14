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
        <div>
            <header className="masthead">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-md-12">
                            <center><img src={ logo } width="100"/></center>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container-fluid">
                <div className="main-content">
                    <div className="container-fluid sm-width">
                        <div className="row no-gutters">
                            <div className="col-md-12">
                                <div className="content">
                                    <h1>Selamat datang,</h1>
                                    <p>Silahkan login dengan username dan password yang telah anda miliki.</p>
                                    <ConfigProvider form={{validateMessages}}>
                                        <Form layout="vertical" onFinish={onFinish}>
                                            <Item label="Email Address" validateTrigger="onBlur" name="email" rules={[{required: true,type:'email'}]}>
                                                <Input autoComplete="off" />
                                            </Item>
                                            <Item label="Password" name="password" rules={[{required: true}]}>
                                                <Input.Password autoComplete="off" />
                                            </Item>
                                            <div className="flex justify-between align-items-center mt-24">
                                                <Button type="primary" htmlType="submit" loading={loading}>Log in</Button>
                                            </div>
                                        </Form>
                                    </ConfigProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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