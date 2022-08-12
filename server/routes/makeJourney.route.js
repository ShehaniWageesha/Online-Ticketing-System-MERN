const router = require('express').Router();
const Journey = require('../models/makeJourney.model');

/**
 * get all details relevant to normal journeys
 */
router.route('/').get((req, res) => {

    Journey.find()
        .then(journeys =>
            res.status(200).send(journeys)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * adding journey details to the database
 */
router.route('/add').post((req, res) => {

    const id = req.body.id;
    const accNo = req.body.accNo;
    const tokenID = req.body.tokenID;
    const startPoint = req.body.startPoint;
    const desPoint = req.body.desPoint;
    const appFare = req.body.appFare;
    const distance = Number(req.body.distance);
    const jDate = Date.parse(req.body.jDate);
    const jTime = Date.parse(req.body.jTime);
    const fare = Number(req.body.fare);

    console.log(req.body);

    const newJourney = new Journey({ id, accNo, tokenID, startPoint, desPoint, appFare, distance, jDate, jTime, fare });
    console.log(req.body);
    newJourney.save()
        .then(() => res.send({message: 'Journey Added!'}))
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

router.route('/getId').get((req, res) => {

    const start = new Date();
    start.setMonth(0, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setMonth(11, 31);
    end.setHours(23, 59, 59, 999);

    Journey.find({ createdAt: { $gt: start, $lt: end } }, "id")
        .sort("-createdAt")
        .then((result) => {
            let nextNum =
                result.length === 0
                    ? 1
                    : parseInt(result.shift().id.slice(-4)) + 1;

            const formattedCount = "000".concat(nextNum).slice(-4);
            return res.status(200).json({
                success: true,
                data: `J${start.getFullYear().toString().slice(-2)}${formattedCount}`,
            });
        })
        .catch((err) =>
            res.status(500).json({
                success: false,
                message: err.message,
            })
        );

});

module.exports = router;