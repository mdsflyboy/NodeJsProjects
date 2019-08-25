const router = require('express').Router();
const mysql = require('../mysql');

router.get('/', function(req, res){
    mysql.query("SELECT * FROM residents", function(err, result, fields){
        if(err) throw err;
        res.json(result);
    });
});

router.post('/new', function(req, res){
    let msg = req.body;
    console.log(msg);
    mysql.query(`INSERT INTO residents VALUES (NULL, '${msg.FirstName}', '${msg.LastName}', '${msg.DOB}', ${msg.RoomNumber})`, 
        function(err, result){
            if(err){
                res.json(err);
            }
            res.json(result);
        }
    );
});

router.delete('/delete/:id', function(req,res){
    mysql.query(`DELETE FROM residents WHERE residentID = ${req.params.id}`,
        function(err, result){
            if(err){
                res.json(err);
            }
            res.json(result);
        }
    );
});

module.exports = router;