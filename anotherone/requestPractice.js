const request = require('request');
const fs = require('fs');

// url = 'https://jsonplaceholder.typicode.com/todos/1';
// const url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
const url = 'https://photoslibrary.googleapis.com/v1/albums';
const accessToken = 'ya29.GltNBxj7ft7ig_D9k1KbReCcD4tc_E9gS_EZmyDrNViijHOB5Y2pv7Ttv2srpRclMfCsrnaEabFS_w69jSUVKlgmDMwiNKv1My7wYlvV_O16tAhzRzPw-YN1lr6B';

const body = {
    pageSize: '25',
    albumId: 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA'
}

const options = {
    url,
    method: 'GET',
    // body: JSON.stringify(body)
};

let albums = [];

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
    let data = JSON.parse(body).albums;
    for(album of data){
        let {id, title, mediaItemsCount} = album;
        albums.push({id, title, mediaItemsCount});
    }
    console.log(albums);
}).auth(null, null, true, accessToken);