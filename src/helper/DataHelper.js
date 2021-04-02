import React from "react";
import moment from "moment";
import { dateFormat, restApi } from "../config";
import axios from "axios";
import { useSelector } from "react-redux";

export const textAreatoText = (txt) =>{
    if(txt==="" || !txt){
        return "--"; 
    }
    var t = txt.replace(/\n/g, '<br />\n');
    return (
        <p dangerouslySetInnerHTML={{__html: t}}></p>
    )
}

export const View = (data) =>{
    if(data==="" || data==null || !data) return "--";
    return data;
}

export const FormatDate = (data, format = dateFormat) => {
    const date = moment(data)
    if(!data || !date.isValid()) return "--";
    return date.format(format)
}

export const DateDifferenceInYears = (data) => {
    const date = moment(data)
    if(!data || !date.isValid()) return;
    var months = moment().diff(date, 'months'),
        month = months%12,
        year = (months-month)/12

    year = year ? year+" years": ''
    month = month ? `${month} month(s) ` : ''

    return `${year} ${month}old`
}

export const GetGender = (data) => {
    if(!data && data !== 0) return "--";
    return data === 1 ? 'Female' : 'Male'
}

export const GetMartialStatus = (data, martial) => {
    if(!data && data !== 0) return "--"
    if(data.length !== 1) return data
    const martialStatusText = martial[data]
    return martialStatusText ? martialStatusText.name : "--"
}

export const DownloadFile = (url) => new Promise(async(resolve, reject) => {
    var fileName = url.split('/').pop();
    axios.get(restApi+"/file/"+fileName,{
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        resolve(true)
      }).catch( e => {
          console.log(e.message)
          reject(e);
      })
})

export const getPDFString = (url) =>  new Promise(async(resolve, reject) => {
    var fileName = url.split('/').pop();
    axios.get(restApi+"/file/"+fileName,{
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));  
        resolve(url)
      }).catch( e => {
          console.log(e.message)
          reject(e);
      })
})

export const SortByAlpabet = (a,b,index) => a[index].localeCompare(b[index]) 
export const SortByNumber = (a,b,index) => a[index] - b[index]
export const SortByDate = (a,b,index) =>  moment(a[index]).unix() - moment(b[index]).unix()

export const useUserlogedin = () => {
    const user = useSelector(s => s.auth.user)
    return {
        isAO: user.id === 1,
        id: user.id,
        role: user.id === "AO"
    }
}

