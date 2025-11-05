/** 
  *@param {object} sessionData - Object containing start/end coordinates and times.
* @returns {Promise<object>} - A Promise that resolves with the JSON response from the Apps Script.
 */

function sendToGoogleSheet(sessionData) {
    
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyLZ0bmDNDo351y6jpFsqAeA4mqkREbIRCLB2hLTgWk_ID23J9lQathe-Z4jwyVpFUC/exec';

    
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
    