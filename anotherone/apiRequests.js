const request = require('request');

let getImagesFromAlbum =  function (accessToken, albumId, callback, pageSize=25) {
    let url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
    const body = {
        pageSize,
        albumId
    }
    const options = {
        url,
        method: 'POST',
        body: JSON.stringify(body)
    };
    request(options, (err, res, body) => {
        if(err){
            console.log(err);
        }
        console.log(`Status Code: ${res.statusCode}`);
        if(res.statusCode != 200){
            console.log('There has been an error!');
            let err = JSON.parse(body).error;
            console.log(`Code: ${err.code}`);
            console.log(`Message: ${err.message}`);
            // callback(null); 
        }

        let data = JSON.parse(body).mediaItems;
        let images = [];
        for(image of data){
            images.push(image.baseUrl);
        }
        callback(images);
    }).auth(null,null,true, accessToken)
};

// const accessToken = 'ya29.GltNB7KC_h5ga3fwWgHwhU6397DXD_TCCBiGsesUeYSkvx-5FwydVPITdbCp9xXCRzVNwsvm4bEjxUhK37xlAq2k9Ynhy1UHXjOpUSlqvqpymVMx4jrSeLKynZzx';
// const albumId = 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA';
// getImagesFromAlbum(accessToken, albumId, images => {
//     console.log(images.length);
// }, 100);


module.exports = {getImagesFromAlbum};