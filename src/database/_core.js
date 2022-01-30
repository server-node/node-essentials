require('dotenv').config()


class Database {
    constructor() {
        this.mongoose = require('mongoose');
        // Connect To MongoDB
        this.mongoose.connect(
            process.env.MONGO_DB_ADDRESS, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        }
        ).then(async () => {
            console.log('MongoDB Connected!');
            // Load Sub DB Classes
            //this.EtherNftMarketplaceTransactions = require('./template')(this.mongoose);
            this.Users = require('./Users')(this.mongoose);

        });
    }


}
module.exports = Database;