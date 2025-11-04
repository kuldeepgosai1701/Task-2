/*@param {object} sessionData 
@returns {Promise<object>}

function sendToGoogleSheet(sessionData) {
    
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzo-0DlvihF3MYJoTZsPxXs22IOGlpe2zSAUflnZqxrBV_VQTF5X0RpZBXxb1YEvi0V/exec';


    return fetch(WEB_APP_URL, { 
          method: 'POST',
           headers: {
          'Content-Type': 'application/json' 
  },

    fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'applicationn/json'
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
*/

/**
 * Sends a single red dot (vibration) event to the Google Sheet Web App.
 * @param {object} sessionData - Object containing start/end coordinates and times.
 * @returns {Promise<object>} - A Promise that resolves with the JSON response from the Apps Script.
 */
function sendToGoogleSheet(sessionData) {
    // Ensure the URL is correctly deployed and accessible to 'Anyone'
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzo-0DlvihF3MYJoTZsPxXs22IOGlpe2zSAUflnZqxrBV_VQTF5X0RpZBXxb1YEvi0V/exec';

    // 🌟 CORRECTED: Single, syntactically correct fetch call that returns a Promise chain
    return fetch(WEB_APP_URL, {
        method: 'POST',
        headers: {
            // ✅ Typo Fixed: 'application/json'
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
            startPoint: `${sessionData.startLat}, ${sessionData.startLon}`,
            endPoint: `${sessionData.endLat}, ${sessionData.endLon}`,
            // ✅ CORRECTED: Pass ISO string directly (do not call .toLocaleString() on a string)
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
            // Throw an error if the Apps Script returns an error message
            throw new Error(`Apps Script Error: ${data.message}`);
        }
        return data;
    });
    
}