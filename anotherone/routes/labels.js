const router = require('express').Router();
const db = require('../db');

router.get('/:id', (req, res) => {
    db.getDb().findOne({photoId:req.params.id}, function(err, result){
        console.log(`
        error: ${err}
        labels: ${JSON.stringify(result.labels)}
        `);
        res.json(result.labels);
    });
});

router.post('/:id', (req,res) => {
    const newLabel = req.body.label;
    db.getDb().findOneAndUpdate(
        {photoId: req.params.id},
        {
            $addToSet: {
                labels: newLabel
            }
        }, {
            returnNewDocument: true,
            upsert: true
        },
        function(err, result) {
            res.json(result);
        });
});

router.delete('/:id/:label', (req,res) => {
    const removingLabel = req.params.label;
    // db.getDb().findOneAndUpdate(
    //     {photoId: req.params.id},
    //     {
    //         $pullAll: {
    //             labels: removingLabel
    //         }
    //     },
    //     function(err, result){
    //         res.json(result);
    //     }
    // );
    let variable = JSON.parse(`{
            "labels.${removingLabel}":1
        }`);
    console.log(variable);
    db.getDb().updateOne({photoId: req.params.id},{
        $unset:variable
    }, function(err, result){
        db.getDb().updateOne({photoId: req.params.id},{
            $pull:{
                "labels":null
            }
        },function(err, result){
            res.json(result);
        });
    });
});

module.exports = router;