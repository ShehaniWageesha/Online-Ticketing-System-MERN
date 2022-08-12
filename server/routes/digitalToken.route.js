const router = require('express').Router();
const DigitalToken = require('../models/digitalToken.model');

/**
 * Get details of all tokens from the database
 * @returns {DigitalToken[]} array of tokens / error message
 */
router.route('/').get((req, res) => {

    DigitalToken.find()
        .then(tokens =>
            res.status(200).send(tokens)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Add a new token to the database
 * @param {string} tokenID token ID of the token
 * @param {string} tokenType token type of the token
 * @param {string} accNo the account no of the account which the token belongs to
 * @returns success or error message
 */
router.route('/add').post((req, res) => {
    const tokenID = req.body.tokenID;
    const tokenType = req.body.tokenType;
    const accNo = req.body.accNo;

    console.log(req.body);

    const newToken = new DigitalToken({ tokenID, tokenType, accNo });
    newToken.save()
        .then(() => res.send({message: 'Token added!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

module.exports = router;

