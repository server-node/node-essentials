
const ModelClass = require('./models/template');

class SignalBacktestData {
    constructor(mongoose) {
        this.mongoose = mongoose;
        this.obj = require('./models/template');
    }


    resetCurrentTimeAndCandles() {
        return new Promise((resolve, reject) => {
            // var saveObj = new (data);

            // @ts-ignore
            this.obj.updateMany({
                $set: {
                    signalLastCandleTime: '-1',
                    state: 'Ordered',
                    logs: [],
                }
            },
                (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });
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

}
module.exports = (mongoose) => new SignalBacktestData(mongoose);