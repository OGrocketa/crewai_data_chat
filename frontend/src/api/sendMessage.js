async function sendMessage (message,files_urls){
    try{
        const response = await fetch(`http://127.0.0.1:8000/respond_to_message`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                files_urls:files_urls,
            })
        });

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