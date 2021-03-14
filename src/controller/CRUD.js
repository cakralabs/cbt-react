/* eslint-disable */ 
import { message } from "antd";
import axios from "axios";
import { restApi } from "../config";

const handleError = (e) => {
    if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        // Form Validation Fails
        if(e.response.status === 422) {
            if(e.response.data && e.response.data.errors) {
                const { errors } = e.response.data
                for (const attribute in errors) {
                    if(errors.hasOwnProperty(attribute)) message.error(errors[attribute][0], 5)
                }
            }
        } else if(e.response.status === 401){
            //message.error('Sorry, you are not authorized to access this page.',5)
            console.log(e.response)
            var url = e.response.config.url
            
            if(localStorage.getItem(url)){
                //console.log('ino')
                if(e.response.config.method.toLowerCase() !== "get"){
                    message.error("Sorry, you are not authorized to perform this action",5)
                    setTimeout(()=>{window.location.reload()},2000)
                }else{
                    message.error('Sorry, you are not authorized to access this page',5)
                }
                
            }else{
                localStorage.setItem(url,true)
                //console.log('ganok',localStorage.getItem(url))
                if(e.response.config.method.toLowerCase() === "get"){
                    window.location.reload()
                }
            }
            
        }else {
            message.error(e.message, 5);
        }
    } else if (e.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        message.error(e.message, 5);
    } else {
        // Something happened in setting up the request that triggered an Error
        message.error(e.message, 5);
    }
}

class CRUD {
    constructor(url,catName="Item") {
        this.url = restApi+url;
        this.name = catName
    }

    error = (e) =>{
        handleError(e)
    }
    get = async(id="") =>{
        let response;
        let json;
        if(id === ""){
            response = await axios.get(this.url)
            .then(res => {
                json = res.data;
            })
            .catch(error =>{
                console.log(error);
                this.error(error);
                if(error.response) json = error.response.status;
                return "failed";
            })
        }else{
            response = await axios.get(this.url+"/"+id)
            .then(res => {
                json = res.data;
                
            })
            .catch(error =>{
                //console.log(error.response.status);
                console.log(error);
                if(error.response.status !== 403) this.error(error);
                json = error;
                return 'failed';
            })
        }
        localStorage.removeItem(this.url)
        return json;
    }
    delete = async(id) => {
        await axios.delete(this.url+"/"+id).catch(error=>{
            this.error(error);
        })
    }
    add = (data,msg=this.name+' added') => {
        return new Promise((resolve, reject) => {
            axios.post(this.url, data)
                .then(res => {
                    if(msg!==null)message.success(msg);
                    localStorage.removeItem(this.url)
                    resolve(res)
                })
                .catch(error => {
                    this.error(error)
                    reject(error)
                })
        })
    }
    save = (id, data,msg="Changes have been saved", method = 'put') => {
        return new Promise((resolve, reject) => {
            axios({
              method,
              url: this.url+"/"+id,
              data
            }).then(res => {
                    if(msg) message.success(msg)
                    localStorage.removeItem(this.url+"/"+id)
                    resolve(res)
                })
                .catch(error => {
                    this.error(error)
                    reject(error)
                })
        })
    }
}
export default CRUD;

export class CRUDwithDataForm extends CRUD {
    constructor(url,catName="Item"){
        super(url,catName)
    }

    getDataForm = async(customURL = null,additionalURL = null) => {
        const url = customURL ? restApi+customURL : this.url,
            rUrl = additionalURL ? url+'/create'+additionalURL : url+'/create',
            response = await axios.get(rUrl)
            .catch(error =>{
                this.error(error);
                return "failed";
            })
        const json = await response.data;
        localStorage.removeItem(url)
        return json;
    }
}

export const RequestApi = (url, data = {}, method = 'get', msg= "") => {
    return new Promise((resolve, reject) => {
        axios({
            method,
            url: restApi+"/"+url,
            data
        }).then(res => {
            if(msg) message.success(msg)
            localStorage.removeItem(restApi+"/"+url)
            resolve(res)
        })
            .catch(error => {
                handleError(error)
                reject(error)
            })
    })
}

export const Health = new CRUD('/healths','Health Check Category');
export const Roles = new CRUD('/roles','Roles & Permissions');
export const Enrolment = new CRUD('/enrolments','Enrolment Status');
export const ClassLevel = new CRUD('/class-levels', 'Class Level');
export const Centre = new CRUDwithDataForm('/centres','Centre');
export const CentreStaff = new CRUD('/centres/staff','Centre');
export const Class = new CRUDwithDataForm('/classes',"Class");
export const Designation = new CRUD('/designations','Staff Designation');
export const DocType = new CRUD('/documents', 'Document Type');
export const IDType = new CRUD('/id-type', 'ID Type');
export const WorkPass = new CRUD('/work-pass', 'Work Pass');
export const ProgramType = new CRUD('/programs', 'Program Type');
export const EmployemtType = new CRUD('/employments','Employment Type');
export const RelationshipType = new CRUD('/relations','Relationship Type');
export const CentreLogType = new CRUD('/centre-logs', 'Centre Log Type');
export const CentreEventType = new CRUD('/centre-events', 'Centre Event Type');
export const Curriculum = new CRUD('/curriculum-domain','Curriculum Domain')
export const GeneralSettings = new CRUD('/general-setting','General Settings');
export const Staff = new CRUDwithDataForm('/staff',"Staff");
export const StaffProfile = new CRUD('/staff-profile',"Staff Profile");
export const StaffEmployment = new CRUDwithDataForm('/staff-employment','Employment');
export const StaffBankInformation = new CRUD('/staff-bank-information',"Bank Information");
export const Kids = new CRUDwithDataForm('/kids','Kids');
export const KidsParent = new CRUD('/kid-parents','Parents/Guardians');
export const KidsRemoveParent = new CRUD('/remove-parent','Parents/Guardians');
export const Parent = new CRUDwithDataForm('/parent',"Parents/Guardians");
export const ParentKids = new CRUD('/parent-kids',"Children");
export const WithdrawalType = new CRUD('/withdrawal-type','Withdrawal Type')
export const StaffLeaveType = new CRUD('/staff-leave-type','Staff Leave Type')
export const SkillsCategory = new CRUD('/skills-category','Skills Category/Domain')
export const Bank = new CRUD('/banks','Bank')
export const TerminationReason = new CRUD('/termination-reason',"Termination Reason")
