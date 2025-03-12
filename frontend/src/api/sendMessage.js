async function sendMessage (message){
    try{
        const response = await fetch(`http://127.0.0.1:8000/respond_to_message?message=${message}`);

    if (!response){
        throw Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json();
    return data["raw"];
    }
    catch(error){
        console.error('Error sending message:', error);
    }
    
}
export default sendMessage;