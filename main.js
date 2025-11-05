
  @param {object} sessionData - Object containing start/end coordinates and times.
 @returns {Promise<object>} - A Promise that resolves with the JSON response from the Apps Script.
 
function sendToGoogleSheet(sessionData) {
    
    const WEB_APP_URL = 'https://script.google.com/a/macros/raoinformationtechnology.com/s/AKfycbzA7MqwX3MvAzkDYvjHeFzO0kzrQD5W2R-EKxq6o7ACQAqilmFt9h7VPHCHT0nZA8ZD/exec';

    
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
    .then(response => {
        
        if (!response.ok) {
            throw new Error(`HTTP Error: Status ${response.status}`);
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Apps Script Response:', data);
        if (data.result === 'success') {
            console.log('Data successfully logged to Google Sheet.');
        } else {
           
            throw new Error(`Apps Script Error: ${data.message}`);
        }
        return data;
    });
    
}