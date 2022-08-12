const router = require('express').Router();
const Credit = require('../models/credits.model');

/**
 * get details of all credits in the database
 */
router.route('/').get((req, res) => {

    Credit.find()
        .then(credits =>
            res.status(200).send(credits)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * adding credit details, when passenger added some credit amount
 */
router.route('/add').post((req, res) => {

    const tokenType = req.body.tokenType;
    const accNo = req.body.accNo;
    const credits = Number(req.body.credits);


    console.log(req.body);

    const newCredits = new Credit({ tokenType, accNo, credits });
    newCredits.save()
        .then(() => res.send({message: 'Credit Added!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

module.exports = router;