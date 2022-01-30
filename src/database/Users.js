

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class Users {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.Obj = require('./models/users');
    }


    checkUserExistance(email) {
        return new Promise((resolve, reject) => {

            this.Obj.findOne(
                {
                    email
                },
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });

        });
    }



    getUserWithId(_id) {
        return new Promise((resolve, reject) => {

            this.Obj.findOne(
                {
                    _id
                },
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });

        });
    }


    // eslint-disable-next-line class-methods-use-this
    newUser(email, password, salt) {
        return new Promise((resolve, reject) => {
            const obj1 = new this.Obj()
            obj1.email = email;
            obj1.password = password;
            obj1.salt = salt;
            obj1.save().then((result) => resolve(result)).catch(() => reject())

        });
    }

    // // For create only, has no use in game-core
    // create(data) {
    //     return new Promise((resolve, reject) => {
    //         // var saveObj = new (data);

    //         this.obj.insertMany(
    //             data,
    //             (err, res) => {
    //                 if (err) {
    //                     return reject(err);
    //                 }
    //                 return resolve(res);
    //             });
    //     });
    // }

    getHashedPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');

        // Hashing user's salt and password with 1000 iterations, 

        const hash = crypto.pbkdf2Sync(password, salt,
            1000, 64, 'sha512').toString('hex');

        return {
            salt,
            password: hash
        }
    }

    validatePassword(password, userName = null, email = null) {


        return new Promise((resolve, reject) => {
            if (userName == null && email == null) return reject('must send an index value')

            // var saveObj = new (data);
            let searchValue;
            if (userName == null) {
                searchValue = {
                    email
                }
            }
            else {
                searchValue = {
                    userName
                }
            }
            this.Obj.findOne(
                searchValue,
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    if (!res) {
                        return reject('user not found');
                    }

                    // return resolve(res);

                    const hash = crypto.pbkdf2Sync(password,
                        res.salt, 1000, 64, 'sha512').toString('hex');
                    if (hash === res.password) { return resolve(res) }
                    return reject('password error')
                });
        });

        // var hash = crypto.pbkdf2Sync(password,
        //     this.salt, 1000, 64, `sha512`).toString(`hex`);
        // return this.hash === hash;.

    }

    generatetokenAndRefereshKey(userId) {

        const payload = { userId }


        const returnValues = {
            token: jwt.sign(payload, process.env.TOKEN_SECRET,
                {
                    expiresIn: '10h',
                }),
            secres: jwt.sign(payload, process.env.REFERESH_TOKEN_SECRET)
        }

        return returnValues;

    }


    tokenVerify(token, callback) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {

            callback(err, decoded)

        });
    }


}
module.exports = (mongoose) => new Users(mongoose);