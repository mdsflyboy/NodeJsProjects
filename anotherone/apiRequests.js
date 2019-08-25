const request = require('request');
const fs = require('fs');

const db = require('./db');

// const accessToken = 'ya29.GltvB52ukPBJxO73nNg94VyZErv6_igGzIq05z_FWoLtpLi7C3dfH-7qz2rDjHAnjdB21SSUexwOf4iMXTXaC9SIxOgrO2HYy046pejjAi6uL9Dw-cBJxgndZ4BG';
const accessToken = 'ya29.GltvB5qaSnxe-2KcjA_Og-j8SG6J0vm8YrMzqUXHCAIzkpOQagFZhj8xSD4w7xURxfPVfFx_mymTFINlZLO2LzhX8dLPiCuQj3i4w52DBJ1Tl86RerwqdFizzsNU';

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
            if(data){
                for(album of data){
                    let {id, title, mediaItemsCount} = album;
                    albums.push({id, title, mediaItemsCount});
                }
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
            console.log("result: ",objResult);
            let output = mediaItems.map((item) => {
                let inOutput = {
                    id:item.id,
                    productUrl:item.productUrl, 
                    baseUrl:item.baseUrl,
                    mediaMetadata: item.mediaMetadata
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
        console.log(photo);
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

// getPhoto(accessToken, "ALjsKEVDvgcyBMSKoEPyPFu9parvpnto0YPs5Zzf5stSs8LvFwNJBj58B22LEE5HYOMyH2zABJ5AEfLoT4KLAVzWeT6pkVKWJQ",
// getPhoto(accessToken, "APVoAXVyCOBH1rtlXo10blte76AogB6dalD0nDloPdTR5F1vi1bQq40LiXYr8E9Jx8-UnQLbf8iz",
// function(data){
    // console.log(data);
// });

module.exports = {getPhoto, getAlbums,getImagesFromAlbum};