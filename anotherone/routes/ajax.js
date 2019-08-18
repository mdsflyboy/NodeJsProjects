const router = require('express').Router();
const requests = require('../apiRequests');
const db = require('../db');

router.get('/photos/:album', (req, res) => {
    let accessToken = req.user.accessToken;
    let albumId = req.params.album;

    // res.send(JSON.stringify({
    //     accessToken,
    //     albumId,
    //     page
    // }, null, 2));

    requests.getImagesFromAlbum(accessToken, albumId, (err, images, nextPageToken) => {
        // console.log('images: ',images);
        res.send({images, nextPageToken});
    },require('../config/constants').imagesPerPage);
})

router.get('/photos/:album/:page', (req, res) => {
    let accessToken = req.user.accessToken;
    let albumId = req.params.album;
    let page = req.params.page;

    if(page === ''){
        page = null;
    }

    console.log('Page: ',page);
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

router.get('/fullPhoto/:album', (req,res) =>{
    let albumId = req.params.album;

    requests.getImagesFromAlbum(req.user.accessToken, albumId, function(err, images, nextPageToken){
        res.json({images, nextPageToken});
    }, require('../config/constants').imagesPerPage);
})

router.get('/fullPhoto/:album/:page', (req,res) =>{
    let albumId = req.params.album;
    let page = req.params.page;

    requests.getImagesFromAlbum(req.user.accessToken, albumId, function(err, images, nextPageToken){
        res.json({images, nextPageToken});
    }, require('../config/constants').imagesPerPage, page);
});

router.get('/photos/:album/withLabel/:label', (req, res) => {
    db.getDb().find({
        albumId: req.params.album,
        labels: req.params.label
    }).toArray(function(err, result){
        if(err){
            console.log(err);
            res.send('No label found');
        }
        let output = [];
        let cnt = 0;
        result.forEach(function(image, index, array){
            requests.getPhoto(req.user.accessToken, image.photoId, function(err, photo){
                output.push(photo);
                cnt++;
                if(cnt === array.length){
                    res.json(output);
                }
            });
        });
    });
});

router.get('/photoIdsWithLabel/:albumId/:label', function(req, res){
    db.getDb().find({
        albumId: req.params.albumId,
        labels: req.params.label
    }).toArray(function(err, result){
        if(result){
            console.log(result);
            let output = {};
            let cnt = 0;
            result.forEach(function(item, index, array){
                output[item.photoId] = item.photoId;
                cnt++;
                if(cnt == array.length){
                    console.log(output);
                    res.json(output);
                }
            });
        }
    })
})

router.get('/album/:album/getLabels', function(req, res){
    db.getDb().find({albumId: req.params.album}).toArray(function(err, images){
        let output = {};
        let cnt = 0;
        // console.log(images);
        // images.forEach(function(image, index, array){
        //     if(!output[label]){
        //         output.push(label);
        //     }
        //     cnt++;
        //     if(cnt === array.length){
        //         res.json(output);
        //     }
        // })
        for(image of images){
            console.log(image);
            if(image.labels){
                for(label of image.labels){
                    if(!output[label]){
                        output[label] = label;
                    }
                }
            }
        }
        // console.log(output);
        res.json(output);
    })
})

router.use('/labels', require('./labels'));

module.exports=router;