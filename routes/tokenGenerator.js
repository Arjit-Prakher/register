const dotenv = require('dotenv');
dotenv.config();

let apiToken = null;
let tokenExpiry = null;

const API_KEY = process.env.API_KEY;

async function generateNewToken() {
    try {
        const formData = new URLSearchParams({
            grant_type: "urn:ibm:params:oauth:grant-type:apikey",
            apikey: API_KEY
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData
        };

        const response = await fetch('https://iam.cloud.ibm.com/identity/token#apikey', requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function getToken() {
    if (Date.now() >= tokenExpiry * 1000) {
        console.log("Token was expired, requesting new...");
        const newToken = await generateNewToken();
        apiToken = newToken?.access_token;
        tokenExpiry = newToken?.expiration;
    } else {
        console.log("Token is fresh");
    }
    return apiToken;
}
module.exports = getToken;