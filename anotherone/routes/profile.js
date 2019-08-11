const router = require('express').Router();
const api = require('../apiRequests');
const path = require('path');

router.get('/', (req, res) => {
    if(!req.user){
        res.redirect('/');
    }
    handleErr(req.user.accessToken, res);

    // const albumId = 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA';
    api.getAlbums(req.user.accessToken, (err, albums) => {
        handleErr(err, res);
        res.render('profile', {user: req.user, albums});
    });
});

router.get('/album/:id', (req, res) => {
    handleErr(req.user.accessToken, res);
    api.getImagesFromAlbum(req.user.accessToken, req.params.id, (err, images, nextPageToken) => {
        handleErr(err, res);
        res.render('profileAlbum', {user: req.user, images, albumId: req.params.id, nextPage: nextPageToken});
    }, require('../config/constants').imagesPerPage);
});

function handleErr(accessToken, res){
    if(!accessToken){
        res.redirect('/auth/logout');
    }
}

function handleErr(err, res){
    if(err && err === "Logout"){
        res.redirect('/auth/logout');
    }
}

module.exports = router;