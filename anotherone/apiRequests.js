const request = require('request');
const fs = require('fs');

const accessToken = 'ya29.GlthB1MDi-bCzoNCO_BQ75vwUsoPiCb_igE02SVZoiK0l3R57aOwtEA6y97V0_BrSPTIy9Gm9vaitrPZl8BdERUDKcM5crp1OMebFQReWmtLo9bqB3v7UPpzzgdH';

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
        fs.writeFileSync('mediaItems.json',JSON.stringify(mediaItems, null, 2));
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

let addEnrichment = function(albumId, imageId, text){
    let url = `${baseUrl}/albums/${albumId}:addEnrichment`;
    let body = {
        newEnrichmentItem: {
            textEnrichment:{
                text
            }
        },
        albumPosition: {
            "position": "AFTER_MEDIA_ITEM",
            "relativeMediaItemId": imageId
        }
    };
    request({
        url,
        method: 'POST',
        body: JSON.stringify(body)
    }, (err, res, body) => {
        let error = checkForErrors(err,res,body);

        console.log(body);
    }).auth(null,null,true,accessToken);
};

addEnrichment("ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA", 
"ALjsKEUKAWNr6qP_GcOdZthJI1_X5yzBYBJuocFenXJebgDbfHa1YByGro_SWP_9tl6AB0aItUag", "test");

module.exports = {getAlbums,getImagesFromAlbum};