import { combineReducers } from "redux";
import auth from "./auth";
import JWT from 'jsonwebtoken';
export default combineReducers({ auth });

const key = 'byCallToken!!';

export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        }
        var decoded = JWT.verify(serializedState, key); 
        
        
       //console.log(decoded);
       return decoded;
    }catch(err){
        console.log("== ERROR GET STATE ==");
        console.log('undifined state ='+err);
        return undefined
    }
}

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        const token = JWT.sign(state,key,{
            expiresIn: 60 * 60 * 24 // expires in 24 hours
        })
        
        localStorage.setItem('state', token);
    }catch(err){
        
    }
}