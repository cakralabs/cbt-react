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
                                    <div className="name">{user.display_name}<span>{isAO ? "Super Administrator": "ok"}</span></div> <DownOutlined />
                                    
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