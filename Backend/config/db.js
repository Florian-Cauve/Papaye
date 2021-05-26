const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://" + process.env.DB_USER_PASS +"@papayedatabase.cfjrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log('MongoDB is Connected...');
    } catch (err) {
        console.log("Failed to connect to MongodB")
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;