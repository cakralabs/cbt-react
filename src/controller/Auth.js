import { message } from "antd";
import axios from "axios";
import { restApi } from "../config";
import { Class } from "./CRUD";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REMOVE_ALERT = "REMOVE_ALERT";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";


export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
const ori = window.location.origin

export const PostAction = (url,data) =>{
    return new Promise((resolve, reject) => {
        var URL = restApi+url;        
        axios.post(URL, data)
            .then(res => {
                //if(msg!==null) message.success(msg);
                resolve(res)
            })
            .catch(e => {
                var status = e.response.status,
                er =  status=== 404 || status === 401 ? e.response.data.message : e.response.data.errors.email
                message.error(er, 5);
                reject(e)
            })
    })
}


const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = (user) => {
  console.log('receive login')
  localStorage.setItem('login-'+ori, 'login' + Math.random());
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  localStorage.setItem('logout-'+ori, 'logout' + Math.random());
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

export const removeAlert = () => {
  return {
    type: REMOVE_ALERT
  }
}

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};


export const UpdateProfile = (photo,Name) => {
  
  return{
    type: UPDATE_PROFILE,
    photo,
    Name
  }
}

export const loginUser = async(data,dispatch,setLoading) => {
  
    dispatch(requestLogin());
    try{      
      var req = await PostAction('/',data);
      if(req && req.status === 200){
        //console.log('hancik')
        var D = req.data.data;
        if(D.id === 1){
          axios.defaults.headers.common['users'] = 1          
          var c = await Class.getDataForm()
          if(c && c.success){
             D.centre = 1
             //dispatch(receiveLogin(D))
             D.centre.unshift({id:0,name:'Headquarter'})
          }
        }
        D.username = data.username
        D.password = data.raw_password
        dispatch(receiveLogin(D))
        
        
      }
    }catch(e){
        console.log(e.message)
        dispatch(loginError())
    }

    setLoading(false)
    
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  try{
    dispatch(receiveLogout());
    
  }catch(e){
      console.log(e.message)
      dispatch(logoutError());
  } 
};

export const Verifing = async(st,dispatch) => {
  var stateData = st.auth;  
  if(stateData.isAuthenticated){
    var data = {username:stateData.user.username,password:stateData.user.raw_password}
    try{
      var req = await PostAction('/',data);
      if(req && req.status === 200){
        //console.log('hancik')
        var D = req.data.data
        if(D.id === 1){
          axios.defaults.headers.common['users'] = 1          
          var c = await Class.getDataForm()
          if(c && c.success){
             D.centre = c.data.centre
             //dispatch(receiveLogin(D))
             D.centre.unshift({id:0,name:'Headquarter'})
          }
        }
        D.username = data.username
        D.password = data.raw_password
        dispatch(receiveLogin(D))
      }
    }catch(e){
        console.log(e.message)
        dispatch(loginError())
    }
  }
  
  dispatch(verifySuccess()); 

}

export const verifyAuth = (st) => dispatch => {
  dispatch(verifyRequest());
  //console.log('======= sore state when verify ============');
  //console.log(st);
  Verifing(st,dispatch)
};