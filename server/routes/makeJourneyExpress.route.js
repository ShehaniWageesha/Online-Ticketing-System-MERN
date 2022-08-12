const router = require('express').Router();
const JourneyExpress = require('../models/makeJourneyExpress.model');

/**
 * get all the expressway details
 */
router.route('/').get((req, res) => {

    JourneyExpress.find()
        .then(express =>
            res.status(200).send(express)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * add express journey details to the database when user make a journey in highway
 */
router.route('/add').post((req, res) => {

    const id = req.body.id;
    const accNo = req.body.accNo;
    const tokenID = req.body.tokenID;
    const expressWay = req.body.expressWay;
    const appFare = req.body.appFare;
    const distance = Number(req.body.distance);
    const jDate = req.body.jDate;
    const jTime = req.body.jTime;
    const fare = Number(req.body.fare);

    console.log(req.body);

    const newJourneyExpress = new JourneyExpress({ id, accNo, tokenID, expressWay, appFare, distance, jDate, jTime, fare });
    newJourneyExpress.save()
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

    JourneyExpress.find({ createdAt: { $gt: start, $lt: end } }, "id")
        .sort("-createdAt")
        .then((result) => {
            let nextNum =
                result.length === 0
                    ? 1
                    : parseInt(result.shift().id.slice(-4)) + 1;

            const formattedCount = "000".concat(nextNum).slice(-4);
            return res.status(200).json({
                success: true,
                data: `E${start.getFullYear().toString().slice(-2)}${formattedCount}`,
            });
        })
        .catch((err) =>
            res.status(500).json({
                success: false,
                message: err.message,
            })
        );

})

module.exports = router;