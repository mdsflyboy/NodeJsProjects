const request = require('request');
const fs = require('fs');

const db = require('./db');

const accessToken = 'ya29.GlthB9gTZEMAF_MzRUBn1mRaVZt9kEWttnwCoEi476OupSpLfyD7g4pz0CgFGcyMLgG1YL-K0iDdho3Qq9KUillqFa-IKfVNMS7lEFNkg0D6YycmTp2XPT9vZESp';

const baseUrl = 'https://photoslibrary.googleapis.com/v1'

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
        db.getDb().find({
            albumId
        }).toArray(function(err, result){
            let objResult = result.reduce(function(objResult, item){
                objResult[item.photoId] = item;
                return objResult;
            }, {});
            console.log("resutl: ",objResult);
            let output = mediaItems.map((item) => {
                let inOutput = {
                    id:item.id,
                    productUrl:item.productUrl, 
                    baseUrl:item.baseUrl
                };
                if(objResult[item.id]){
                    inOutput.labels = objResult[item.id].labels;
                    // console.log('inOutput: ', inOutput);
                }
                return inOutput;
            });
            let nextPageToken = data.nextPageToken;
            callback(error, output, nextPageToken);
        });
        
    }).auth(null,null,true, accessToken)
};

// const albumId = 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA';
// getImagesFromAlbum(accessToken, albumId, images => {
//     console.log(images.length);
// }, 100);

let getPhoto = function(accessToken, photoId, callback){
    url=`${baseUrl}/mediaItems/${photoId}`;
    request(url, (err, res, body)=>{
        let error = checkForErrors(err, res, body);
        let photo = JSON.parse(body);
        photo = {id:photo.id, baseUrl:photo.baseUrl, productUrl:photo.productUrl};
        db.getDb().findOne({
            photoId: photo.id
        }, function(error, result){
            if(result && result.labels){
                photo.labels = result.labels;
                callback(error, photo);
            }else{
                callback(error, photo);
            }
        })
    }).auth(null,null,true,accessToken);
};

// getPhoto(accessToken, "ALjsKEVpN4rMLpJeOOKVmWatWa1dC3LRJDO2S65-42pmBtFID7vsr6vE_f9KDIK-tiB4OrJZ5vlo",
// function(data){
//     console.log(data);
// });

module.exports = {getPhoto, getAlbums,getImagesFromAlbum};