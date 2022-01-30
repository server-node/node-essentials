const express = require('express');
const { body, validationResult } = require('express-validator');


const router = express.Router();


router.post('/',
    body('email').exists().withMessage('email is required!').isEmail().withMessage('invalid email'),
    body('password').exists().withMessage('password is required').isLength({ min: 5 }).withMessage('password length must be at least 5'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0] });
        }

        const { email, password } = req.body

        //check the password and login
        const loginResult = await res.locals.db.Users.validatePassword(password, null, email).catch((error) => {
            res.status(401).json({ error });
        })
        if (!loginResult) { return; }

        res.status(200).json(res.locals.db.Users.generatetokenAndRefereshKey(loginResult._id));

    });


module.exports = router;
