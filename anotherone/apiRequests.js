const request = require('request');

const accessToken = 'ya29.GltNBxj7ft7ig_D9k1KbReCcD4tc_E9gS_EZmyDrNViijHOB5Y2pv7Ttv2srpRclMfCsrnaEabFS_w69jSUVKlgmDMwiNKv1My7wYlvV_O16tAhzRzPw-YN1lr6B';

const baseUrl = 'https://photoslibrary.googleapis.com/v1'

let matt = {
    name:"Matthew",
    age:17
};

function checkForErrors(err, res, body) {
    if(err){
        console.log(err)
    }
    console.log(`Status Code: ${res.statusCode}`);
    if(res.statusCode != 200){
        console.log('There has been an error!');
        let err = JSON.parse(body).error;
        console.log(`Code: ${err.code}`);
        console.log(`Message: ${err.message}`);
        if(res.statusCode == 401){
            return "Logout";
        }
    }
}

let getAlbums = function (accessToken, callback, pageSize=50){
    let url = baseUrl+'/albums';
    const options = {
        url,
        method:'GET'
    };
    request(options, (err, res, body) => {
        let error = checkForErrors(err, res, body);
        if(error){
            callback(error, null);
        }else{
            let data = JSON.parse(body).albums;
            let albums = [];
            for(album of data){
                let {id, title, mediaItemsCount} = album;
                albums.push({id, title, mediaItemsCount});
            }
            callback(null, albums);
        }
    }).auth(null, null, true, accessToken);
};

// getAlbums(accessToken, albums => {
//     console.log(albums);
// });

let getImagesFromAlbum =  function (accessToken, albumId, callback, pageSize=25, pageToken=null) {
    let url = baseUrl+'/mediaItems:search';
    if(pageToken){
        var body = {
            pageSize,
            albumId,
            pageToken
        }
    }else{
        var body = {
            pageSize,
            albumId
        }
    }
    const options = {
        url,
        method: 'POST',
        body: JSON.stringify(body)
    };
    request(options, (err, res, body) => {
        let error = checkForErrors(err, res, body);

        let data = JSON.parse(body);
        let mediaItems = data.mediaItems;
        let output = mediaItems.map((item) => {
            return {
                id:item.id,
                productUrl:item.productUrl, 
                baseUrl:item.baseUrl
            };
        })
        let nextPageToken = data.nextPageToken;
        callback(error, output, nextPageToken);
    }).auth(null,null,true, accessToken)
};

// const albumId = 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA';
// getImagesFromAlbum(accessToken, albumId, images => {
//     console.log(images.length);
// }, 100);

module.exports = {getAlbums,getImagesFromAlbum};