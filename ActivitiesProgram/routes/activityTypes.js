const router = require('express').Router();
const mysql = require('../mysql');

router.get('/', function(req, res){
    mysql.query('SELECT * FROM activityTypes', function(err, result){
        if(err){
            res.json(err);
        }
        res.json(result);
    });
});

router.post('/new', function(req, res){
    let name = req.body.name;
    mysql.query(`INSERT INTO activityTypes VALUES (NULL, '${name}')`, function(err, result){
        if(err){
            res.json(err);
        }
        res.json(result);
    });
});

router.delete('/delete/:id', function(req,res){
    let id = req.params.id;
    mysql.query(`DELETE FROM activityTypes WHERE id=${id}`, function(err, result){
        if(err){
            res.json(err);
        }
        res.json(result);
    });
});

module.exports = router;