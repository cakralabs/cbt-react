import React from "react";
import { message, Modal } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const defaultTitleDelete = "Do you want to delete these items?";
const successDelete = "Items deleted";
export const ModalDelete = (callback = () =>{},title=defaultTitleDelete,successMessage=successDelete,okText="Yes, Delete",con=null) =>{
    const modal = Modal.confirm();
    modal.update({
        title: title,
        icon: <CloseCircleOutlined />,
        okText: okText,
        cancelText: "Cancel",
        content: con,
        className: 'modal-delete',
        okButtonProps: ({danger:true}),
        onOk: async(e) => {
            try{
                var dl = await callback();
                if(dl && dl.success){
                    if(successMessage)  message.success(successMessage);
                }
                modal.destroy();
            }catch(e){
                message.error(e.message)
            }
            
        }
    })
}

export const ModalArchive = (callback = () =>{}, title = 'Do you want to archive these items?', successArchive = 'Items archived') => {
    const modal = Modal.confirm();
    modal.update({
        title: title,
        icon: <CloseCircleOutlined />,
        okText: "Yes, Archive",
        cancelText: "Cancel",
        className: 'modal-warning',
        okButtonProps: ({warning:true}),
        onOk: async(e) => {
            try{
                await callback();
                message.success(successArchive);
                modal.destroy();
            }catch(e){
                message.error(e.message)
            }
        }
    })
}