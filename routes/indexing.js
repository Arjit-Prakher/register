const getToken = require('./tokenGenerator');
const base_url = "https://0917669a-e8cf-4c9d-a783-99b208116af3-bluemix.cloudantnosqldb.appdomain.cloud";

let indexing = null;

async function checkIndexing() {
    const token = await getToken();
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const raw = JSON.stringify({
        "index": {
            "fields": [
                {
                    "name": "asc"
                }
            ]
        }
    });
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw
    };
    try {
        const response = await fetch(`${base_url}/users/_index`, requestOptions);
        const result = await response.json();

        if(!result.result === "created") {
            indexing = result.result;
        }
        // return indexing;

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
checkIndexing();

// module.exports = checkIndexing;