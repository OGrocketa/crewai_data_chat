import dbFilesUploadedFlag from "../../firebase/updateData/filesUploaded";
const UploadFiles = async (files,chat_id) =>{
    const formData = new FormData();
    files.forEach((file)=>{
        formData.append('files', file);
    });
    try{
        const response = await fetch(`http://127.0.0.1:8000/upload_file?chat_id=${chat_id}`,{
            method: 'POST',
            body: formData,
        });
        if (!response.ok){
            console.error(response.status);
        }
        const data = await response.json();
        await  dbFilesUploadedFlag(chat_id);
        return data;
    }catch (error){
        console.error('Error uploading files:', error);
    };
};

export default UploadFiles;