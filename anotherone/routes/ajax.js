const router = require('express').Router();
const requests = require('../apiRequests');

router.get('/photos/:album/:page', (req, res) => {
    let accessToken = req.user.accessToken;
    let albumId = req.params.album;
    let page = req.params.page;

    if(page === ''){
        page = null;
    }

    console.log(page);
    // res.send(JSON.stringify({
    //     accessToken,
    //     albumId,
    //     page
    // }, null, 2));

    requests.getImagesFromAlbum(accessToken, albumId, (err, images, nextPageToken) => {
        // console.log('images: ',images);
        res.send({images, nextPageToken});
    },require('../config/constants').imagesPerPage, page);
});

router.post('/photos/setLabel', (req, res) => {
    res.send(req.body);
    // res.send('Hi');
});


module.exports=router;