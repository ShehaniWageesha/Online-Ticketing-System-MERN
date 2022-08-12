const router = require('express').Router();
const Account = require('../models/account.model');

/**
 * Get details of all Accounts from the database
 * @returns {Account[]} array of accounts / error message
 */
router.route('/').get((req, res) => {

    Account.find()
        .then(accounts =>
                res.status(200).send(accounts)
        )
        .catch(err =>
            res.status(400).send({message: 'Error: ' + err})
        );
});

/**
 * Add a new account to the database
 * @param {string} accNo Account number of the account
 * @param {number} credit credit of the account
 * @returns success or error message
 */
router.route('/add').post((req, res) => {
    const accNo = req.body.accNo;
    const credit = Number(req.body.credit);

    console.log(req.body);

    const newAccount = new Account({ accNo, credit });
    newAccount.save()
        .then(() => res.send({message: 'Account created!'}))
        .catch(err =>
                res.status(400).send({message: 'Error: ' + err})
        );
});

router.route('/viewAcc').post((req, res) => {

    const accNo = req.body.accNo;
    console.log("hii");
    Account.find({
        accNo: accNo
    },(err, accounts) => {
        if (err){
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }

        const account = accounts[0];

        Account.findById(account._id).then(result => {
            res.status(200).json({
                success: true,
                data: result,
                message: "Searching ID is found."
            });
        })

        //console.log(account._id);

    });

});

/*router.route('/update/:id').put((req, res) => {
    Account.findById(req.params.id)
        .then(account => {
            account.accNo = req.body.accNo;
            account.credit = req.body.credit;

            account.save()
                .then(() => res.send({message:'Account Credit updated!'}))
                .catch(err =>
                    res.status(400).send({message: 'Error: ' + err})
                );
        })
        .catch(err =>
            res.status(400).json('Error: ' + err)
        );
});*/
/**
 * Update the credit amount of the passenger of relevant account number
 */
router.route('/update').put((req, res) => {

    const accNo = req.body.accNo;
    const credit = Number(req.body.credit);

    if (!accNo){
        return res.send({
            success: false,
            message: 'Account can not be blank.'
        });
    }


    console.log('here');

    Account.find({
        accNo: accNo
    },(err, updateUsers) =>{

        if(err){
            console.log('amanda');
            return res.send({
                success: false,
                message: 'Error: Server error'
            });

        }

        const updateUser = updateUsers[0];
        updateUser.accNo = accNo;
        updateUser.credit = credit;

        updateUser.save((err, user) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'User updated.'
            });
        })

    });

});


module.exports = router;

