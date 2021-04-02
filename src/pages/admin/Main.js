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
        
        window.addEventListener('storage', logoutAllTab);
        return(()=>{
            window.removeEventListener('storage',logoutAllTab)
        })
    },[])
        
    //console.log(centre)
    return(
        
        <Layout className="admin-page">
            ok
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