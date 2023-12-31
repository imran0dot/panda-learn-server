const deleteMethods = require('./methods/deleteMethods');
const getMethods = require('./methods/getMethods');
const patchMethods = require('./methods/patchMethods');
const postMethods = require('./methods/postMethods');
const putMethods = require('./methods/putMethods');

module.exports = mongodb = (app) => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    require('dotenv').config()
    const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.76wfrxb.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    async function run() {
        try {
            await client.connect();
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");

            // database collections 
            const userCollections = client.db("USER").collection("users");
            const classesCollections = client.db("COURSE").collection("classes")
            const paymentCollections = client.db("PAYMENT").collection("paid");
            getMethods(app, userCollections, classesCollections, paymentCollections);
            postMethods(app, classesCollections, paymentCollections);
            putMethods(app, userCollections);
            patchMethods(app, userCollections, classesCollections);
            deleteMethods(app, userCollections);


        } finally {
            //   await client.close();
        }
    }
    run().catch(console.dir);

}