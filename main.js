/** 
  *@param {object} sessionData - Object containing start/end coordinates and times.
* @returns {Promise<object>} - A Promise that resolves with the JSON response from the Apps Script.
 */

function sendToGoogleSheet(sessionData) {
    
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyst_oHoEhK-_YLv9GhhABQNGI3TxNprc0ndVh0tMGwiD-MQcjUNKPTF_ZQ-9ehZ1rO/exec';

    
    return fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
          
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
            startPoint: `${sessionData.startLat}, ${sessionData.startLon}`,
            endPoint: `${sessionData.endLat}, ${sessionData.endLon}`,
            
            startTime: sessionData.startTime,
            endTime: sessionData.endTime
            })
    })
    .then(r => r.json())
    .then(d => {
        console.log("Response", d);
        return d;
    })
    .catch(err => console.error("Fetch error:", err));
}
    


