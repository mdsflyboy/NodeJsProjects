const https = require('https');
const fs = require('fs');

var options = {
    hostname: "jsonplaceholder.typicode.com",
    port: 443,
    path: "/todos/",
    method: "GET"
};

var req  = https.request(options, res => {

    var responseBody = "";

    console.log("Response have Started");
    console.log(`Server Status: ${res.statusCode}`);
    // console.log("Response Headers: %j", res.headers);

    res.setEncoding("UTF-8");
    // res.once("data", chunk => {
    //     console.log(chunk);
    // });
    
    res.on("data", chunk => {
        // console.log(`--chunk-- ${chunk.length}`);
        responseBody += chunk;
    });

    res.on('end', () => {
        fs.writeFile('data.json', responseBody, err => {
            if(err){
                throw err;
            }
            console.log('File Downloaded');
        });
    });

});

req.on('error', err => {
    console.log(`Problem with request ${err.message}`);
});

req.end(() => {});