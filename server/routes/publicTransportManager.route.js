const router = require('express').Router();
const PublicTransportManager = require('../models/publicTransportManager.model');

/**
 * Get details of all Managers from the database
 * @returns {PublicTransportManager[]} array of managers / error message
 */
router.route('/').get((req, res) => {
    PublicTransportManager.find()
        .then(managers =>
            res.status(200).send(managers)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Add a new manager to the database
 * @param {string} managerId Account number of the manager
 * @param {string} name Name of the manager
 * @param {string} address Address of the manager
 * @param {string} telephone telephone number of the manager
 * @returns success or error message
 */
router.route('/add').post((req, res) => {
    const managerId = req.body.managerId;
    const name = req.body.name;
    const address = req.body.address;
    const telephone = req.body.telephone;
    console.log(req.body);

    const newManager = new PublicTransportManager({ managerId, name, address, telephone });
    newManager.save()
        .then(() => res.send({message: 'Public Transport Manager created!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

module.exports = router;

