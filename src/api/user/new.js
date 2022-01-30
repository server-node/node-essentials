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


        //check if user already exists
        const result = await res.locals.db.Users.checkUserExistance(email).catch(() => {
            res.status(500).json({ error: 'db error' });
        })
        if (result != null) {
            return res.status(400).json({ error: 'user already exists' });
        }

        //signing up the user
        const passwordData = res.locals.db.Users.getHashedPassword(password)

        const newUser = await res.locals.db.Users.newUser(email,
            passwordData.password, passwordData.salt).catch(() => {
                res.status(500).json({ error: 'sign up error' });
            })

        res.status(200).json(res.locals.db.Users.generatetokenAndRefereshKey(newUser._id));
    });


module.exports = router;
