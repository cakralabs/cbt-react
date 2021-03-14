/* eslint-disable */ 
import { Layout, Menu, Spin, Select, Dropdown, Modal } from 'antd';
import React, {lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, useHistory, useParams } from 'react-router-dom';
import { DashboardLogo, AttendanceLogo, CalendarLogo, CentreLogo, ClassLogo, ParentLogo, TeacherLogo, KidsLogo, VisitorLogo, ChatLogo, SurveyLogo, EventLogo, AppraisalLogo, SettingsLogo, CustomIcon } from '../../icon/';
import { BellOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { connect } from 'react-redux';
import { hasWriteRole, logoutUser, Verifing } from '../../controller/Auth';
import axios from "axios"
import { useUserlogedin } from '../../helper/DataHelper';

const UnderConstructions = lazy(()=>import('../UnderCons'))
const { Header, Content, Sider } = Layout;
const {Item} = Menu;
const {Option} = Select;

const Dashboard = lazy(() => import('./dashboard'))

const Main =(props) => {
    const history = useHistory(),
    {mainPage, subPage } = useParams(),
    {user,dispatch,SelectedCentre,st} = props,
    {isAO} = useUserlogedin(),
    selectedKey = subPage ? subPage : mainPage,
    [loading,setLoading] = useState(false),
    centre = user.centre.sort((a,b) => b.status - a.status ),
    handleLogout = () =>{
        dispatch(logoutUser())
    },
    //console.log(user)
    logoutAllTab = (event) => {
        var ori = window.location.origin
        console.log(event)
        if (event.key == 'logout-'+ori) {
            Modal.info({
                title:"You have been logged out",
                onOk : () => {
                    window.location.reload()
                }
            })
            // ..
        }
    }
    
    useEffect(()=>{
        
        setLoading(false)
        axios.defaults.headers.common['users'] = user.id //jika API pada task https://trello.com/c/QL4xHYOc sudah fix, angka 1 diganti dg user.id
        axios.defaults.headers.common['centre'] = user.centre[SelectedCentre].id
        
        window.addEventListener('storage', logoutAllTab);
        return(()=>{
            window.removeEventListener('storage',logoutAllTab)
        })
    },[])
        
    //console.log(centre)
    return(
        
        <Layout className="admin-page">
            <Sider theme="light" className="main-sider">
                <Spin spinning={loading}>
                    <div className="sider-logo">
                        <img src="/assets/images/logo-by-the-park.svg" />
                    </div>                    
                    <Menu theme="light" mode="inline" className="sider-menu" selectedKeys={mainPage}>
                        <Item key="dashboard" icon={<CustomIcon icon={DashboardLogo} />}>
                            <Link to='/admin/dashboard'> Dashboard </Link>
                        </Item>
                        <Item key="attendance" className="unactive" icon={<CustomIcon icon={AttendanceLogo} />}>
                            <Link to='/admin/attendance'> Attendance </Link>
                        </Item>
                        <Item key="calendar" className="unactive" icon={<CustomIcon icon={CalendarLogo} />}>
                            <Link to='/admin/calendar'> Calendar </Link>
                        </Item>
                    </Menu>
                </Spin>
            </Sider>
            <Layout className="site-layout">
            <Spin spinning={loading}>
                <Header theme="light" className="site-layout-background" style={{ padding: 0 }}>
                    
                    <div className="ant-header ant-row">
                         <div className="sider-select">                            
                        </div>
                        
                        <div className="ant-header-notif" hidden>
                            
                            <BellOutlined style={{fontSize:'1.25rem'}} />
                            <b>12</b>
                        </div>
                        <div className="ant-header-user">
                            
                            <Dropdown overlay={(
                                <Menu>                                    
                                    <Item>
                                        <a href="#" onClick={handleLogout}>Logout</a>
                                    </Item>
                                </Menu>
                            )} className="ant-header-user-dropdown">
                                <a href="#" onClick={e => e.preventDefault()}>
                                    <Avatar src={user.image} icon={<UserOutlined />} shape="square" className="ava" />
                                    <div className="name">{user.display_name}<span>{isAO ? "Super Administrator": user.centre[SelectedCentre].role}</span></div> <DownOutlined />
                                    
                                </a>
                            </Dropdown>
                        </div>
                    </div>

                </Header>
                <Content>
                    
                    <Suspense fallback={<div className="page-loading" ><Spin size="large" /></div>}>
                        <Switch>
                            <Route path="/admin/dashboard" component={Dashboard} />
                            <Route component={UnderConstructions} />
                        </Switch>
                    </Suspense>
                    
                </Content>
            </Spin>
            </Layout>
        </Layout>
    )
}

function mapStateToProps(state) {
    return {
        st : state,
        user: state.auth.user,
        SelectedCentre: state.auth.centre
    };
  }
export default (connect(mapStateToProps)(Main));