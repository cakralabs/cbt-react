import heic2any from "heic2any";

const convertHeic = (img) =>{
    return heic2any({blob:img})
    .then((result)=> result)
    .catch((e)=>console.log(e.message))
}
export const getBase64 = async(img, callback) => {
    const type = img.name.split('.').pop().toLowerCase(),
        reader = new FileReader();;
    if(type==='heic'){
        img = await convertHeic(img);
    }
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    
    
}