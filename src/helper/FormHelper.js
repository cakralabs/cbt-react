import moment from "moment";
import heic2any from "heic2any";

export const hasClass = (obj,c) => {
    var className = " " + c + " ";

    if ((" " + obj.className + " ").replace(/[\n\t]/g, " ").indexOf(className) >= 0) {
            return true;
    }
    return false;
}

export const NumOnly = (v,dataState) =>{
    if(v!==""){
        v = parseInt(v.replace(/\./g ,''));
        v = isNaN(v) ? dataState : v ;
        return v;
    }else{
        return "";
    }
}

export const NumNormalize = (v) => parseInt(v.replace(/\./g ,'')) || null;

export const PhoneNormalize = (v) => v.replace(/[^\d+]/g ,'') || null;

export const isNumberInput = (obj) =>{
    return hasClass(obj,'number')
}

export const toMysqlDate = (date, format = 'YYYY-MM-DD') => {
    if(date.isMoment) {
        return date.format(format)
    } else {
        return moment(date).format(format)
    }
}

export const fromMysqlDate = (data,format = 'YYYY-MM-DD') => {
    if(data) return moment(data,format)
}

export const toBase64 = (file) => new Promise(async(resolve, reject) => {
    const reader = new FileReader(),type = file.name.split('.').pop().toLowerCase()
    if(type==='heic'){
        file = await convertHeic(file);
    }
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

export const validatePhoneNumberLength = ({}) => ({
    validator(rule, value) {
        if (value && value.toString().length >= 8) {
            return Promise.resolve();
        }
        return Promise.reject('The telephone must be at least 8 characters.');
    },
})

export const filterSelectOption = (v,option) => (option.title && option.title.toLowerCase().includes(v.toLowerCase()))

const convertHeic = (img) =>{
    return heic2any({blob:img})
    .then((result)=> result)
    .catch((e)=>console.log(e.message))
}

export const getFileName = (fileURL) =>{
    return fileURL.split('/').pop()
}

export const disabledDateAfterToday = (date) => {
    const today = toMysqlDate(moment())
    const tooLate = fromMysqlDate(today).diff(date, 'days');
    return tooLate < 0;
}

export const today = () => moment()