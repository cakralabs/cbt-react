import React, {Suspense, lazy} from "react";
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Spin } from "antd";
import './App.css';
import { connect } from "react-redux";
const Main = lazy(()=> import('./pages/admin/Main'));
const Login = lazy(() => import('./pages/Login'));
const ProtectedRoute = lazy(()=> import('./components/ProtectedRoute'))
const PublicRoute = lazy(()=> import('./components/PublicRoute'))

function App(props) {
    const { isAuthenticated, isVerifying } = props;
    return (
    
      <Router>
          <Suspense fallback={<div className="page-loading full" ><Spin size="large" /></div>}>
            <Switch>
                <PublicRoute isAuthenticated={isAuthenticated} isVerifying={isVerifying} path="/login" component={Login} />                
                <ProtectedRoute isAuthenticated={isAuthenticated} isVerifying={isVerifying} path="/admin/:mainPage?/:subPage?/:sub2Page?" component={Main} />                
                <Redirect to="/login" />
            </Switch>
          </Suspense>
      </Router>
    );
}

function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isVerifying: state.auth.isVerifying
    };
}

export default connect(mapStateToProps)(App);