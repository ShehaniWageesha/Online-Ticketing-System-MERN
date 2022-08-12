const router = require('express').Router();
const Journey = require('../models/makeJourney.model');

router.route('/').get((req, res) => {

    Journey.find()
        .then(journeys =>
            res.status(200).send(journeys)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

module.exports = router;