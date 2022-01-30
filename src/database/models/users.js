const mongoose = require('mongoose');
const exchangePlatformslist = require('../../data/constants/general/exchangePlatforms')
const countryCodesList = require('../../data/constants/general/countryCodes')

const Users = new mongoose.Schema({
    /// the email which will be be the email that 
    /// users can sign in with. 
    /// so it should be an index
    email: {
        type: String,
        index: true
    },

    /// the salt used to store the password
    salt: {
        type: String,
        default: ''
    },

    /// the username which can be the email that 
    /// users can sign in with. 
    /// so it should be an index
    userName: {
        type: String,
        index: true
    },

    /// it is good for us to know that what sign in method should we use 
    /// for each user to sign in
    signInMethod: {
        type: String,
        enum: ['traditional', 'google', 'apple']
    },

    /// the password of the user.
    /// the hashed password of each user will be stored in here
    password: {
        type: String,
    },

    /// all the user identity info will be saved here
    userInfo: {
        avatar: {
            type: String
        },
        firstName: {
            type: String
        },
        middleName: {
            type: String
        },
        lastName: {
            type: String
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
        birthDate: {
            type: Number,
            default: -1
        },
        /// the list of country keys are stored in here.
        /// you can add/remove a country from the Consts folder
        country: {
            type: String,
            enum: countryCodesList
        },
        residense: {
            type: String
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        zipCode: {
            type: String
        },
        address: {
            type: String
        }
    },

    /// the accounts keys and secrets and passwords are stored in this array.
    exchangeAccounts: {
        type: [{
            platform: {
                type: String,
                enum: exchangePlatformslist,
                key: {
                    type: String
                },
                secret: {
                    type: String
                }
            }
        }],
        default: []
    },

    /// notifications 
    notifications: {
        type: [],
        default: []
    },


    /// all the data about copy traders will be here.
    /// you can see the subscribers, and also the signals  
    copyTrader: {
        active: {
            type: Boolean,
            default: false
        },
        subscribers: {
            type: [{
                userId: mongoose.Schema.Types.ObjectId,
                subscriptionStartTime: Number,
                subscriptionEndTime: Number
            }],
            default: []
        },
        subscriptedTo: {
            type: [{
                userId: mongoose.Schema.Types.ObjectId,
                subscriptionStartTime: Number,
                subscriptionEndTime: Number
            }],
            default: []
        },
        signals: {
            type: [
                {
                    signalId: mongoose.Schema.Types.ObjectId
                }
            ],
            default: []
        },
    },


    /// all the data about copy traders will be here.
    /// you can see the subscribers, and also the signals  
    signalProvider: {
        active: {
            type: Boolean,
            default: false
        },
        subscribers: {
            type: [{
                userId: mongoose.Schema.Types.ObjectId,
                subscriptionStartTime: Number,
                subscriptionEndTime: Number
            }],
            default: []
        },
        subscriptedTo: {
            type: [{
                userId: mongoose.Schema.Types.ObjectId,
                subscriptionStartTime: Number,
                subscriptionEndTime: Number
            }],
            default: []
        },
        signals: {
            type: [
                {
                    signalId: mongoose.Schema.Types.ObjectId
                }
            ],
            default: []
        },
    },


});

module.exports = mongoose.model('users', Users);