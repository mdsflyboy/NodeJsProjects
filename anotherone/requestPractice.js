const request = require('request');
const rp = require('request-promise');
const fs = require('fs');

// url = 'https://jsonplaceholder.typicode.com/todos/1';
const url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
// const url = 'https://photoslibrary.googleapis.com/v1/albums';
const accessToken = 'ya29.GltNB5ZnawQp1rYYeTFeg52qFIdOBoOFLT91gcX_Hj6DhW3OvTFaJa9Ihs8enUrSqjEKzzSxA-z0N6nzDITfHabjo3w1Vi8JX7Z-V2iTMlrlWO7HTU9_6DJ7ubG9';

const Body = {
    pageSize: '100',
    albumId: 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA'
    , pageToken: 'Cq4BCkR0eXBlLmdvb2dsZWFwaXMuY29tL2dvb2dsZS5waG90b3MubGlicmFyeS52MS5TZWFyY2hNZWRpYUl0ZW1zUmVxdWVzdBJmCmJBTGpzS0VXc1JhSHBXbkFkaW5MZjVad1AwSS1IWks3dXIxVFJvcVZpRFpzUFRhTTVzQUtROGpya01jWDlMV1R2MVpPalB4N1hrS1dsWGRjUzIxQzZPVUs4aHYwOVJ0amN3QRBkEvcBQUhfdVE0MzFGWTN3TEcwVkl4cEVJZW9vdVpGRmYtWTR6WW94MnNZVF8wQWE5c1JmeFBXM09zTk1UMHlvQmprT3JuNFNYS1J2TTFreUJJZU1qRzZnbHJjNkpiN3o1SHMxT1diQXExazhDZVV5bjgyby1jTWVDd3FENm1LWHR1ZUg0S1FOU3lPVi1TOHg0Y0c1RW1YYWlwSjRnU1I1dnRvb3hrbHdmT3hEbVRUNmh5bWhibGtIc0lXQ2JEakF5eGYzbDFEakRoSkFnSzBLckhQNjNYU2piaFVJbk5LVFV4dlB2ZUx6a05jSmVRVlVkQ0QwNm9zdkdIbxobZkR4cWktRXNiOFY0N2h0bXBKY3JTTjk1OURF'
}

const options = {
    url,
    method: 'POST',
    body: JSON.stringify(Body)
};

request(options, (err, res, body) => {
    console.log(err);
    console.log('statusCode: ', res && res.statusCode);
    // console.log('body: ', body);
    fs.writeFile('data.json', body, err => {
        if(err){
            throw err;
        }
        console.log('Done!')
    });
    let data = JSON.parse(body);
    // for(item of data){
    //     let {id, title, mediaItemsCount} = item;
    //     albums.push({id, title, mediaItemsCount});
    // }
    console.log(data.nextPageToken);
}).auth(null, null, true, accessToken);

// async function init(){
//     let mediaItems = [];
//     do{
//         options.body = JSON.stringify(Body);
//         await rp(options, (err, res, body) => {
//             // console.log(err);
//             console.log('statusCode: ', res && res.statusCode);
//             let data = JSON.parse(body);
//             Body.nextPageToken = data.nextPageToken;
//             mediaItems.push(data.mediaItems);
//             console.log('Got data')
//         }).auth(null, null, true, accessToken);
//     }while(Body.nextPageToken)
//     return mediaItems;
// }

// function main(){
//     var prom = init(); 
//     prom.then(mediaItems => {
//         fs.writeFile('data.json', JSON.stringify(mediaItems), (err) => {
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log('Done');
//             }
//         });
//     });
// }

// main();