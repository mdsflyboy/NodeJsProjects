const router = require('express').Router();
const api = require('../apiRequests');

router.get('/', (req, res) => {
    if(!req.user){
        res.redirect('/');
    }

    const albumId = 'ALjsKEWsRaHpWnAdinLf5ZwP0I-HZK7ur1TRoqViDZsPTaM5sAKQ8jrkMcX9LWTv1ZOjPx7XkKWlXdcS21C6OUK8hv09RtjcwA';
    api.getImagesFromAlbum(req.user.accessToken, albumId, images => {
        res.render('profile', {user: req.user, images});
    }, 24);
});

module.exports = router;