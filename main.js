@param {object} sessionData 

function sendToGoogleSheet(sessionData) {
    
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzo-0DlvihF3MYJoTZsPxXs22IOGlpe2zSAUflnZqxrBV_VQTF5X0RpZBXxb1YEvi0V/exec';

    fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        
        body: JSON.stringify({
            startPoint: `${sessionData.startLat}, ${sessionData.startLon}`,
            endPoint: `${sessionData.endLat}, ${sessionData.endLon}`,
            startTime: sessionData.startTime.toLocaleString(), // Format time nicely
            endTime: sessionData.endTime.toLocaleString()
        })
    })
    .then(response => {
        return response.json(); 
    })
    .then(data => {
        console.log('Success sending data:', data);
        // Add a check to confirm the 'result' is 'success'
        if (data.result === 'success') {
             console.log('Data successfully logged to Google Sheet.');
        } else {
             console.error('Apps Script reported an error:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error sending data to Google Sheet:', error);
    });
}